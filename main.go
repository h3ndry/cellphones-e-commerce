package main

import (
	"database/sql"
        "os"
	_ "fmt"
	"log"
	"net/http"
	"text/template"

	_ "github.com/go-sql-driver/mysql"
)

type Employee struct {
	Id		int
	Name	string
	City	string
}

type Customer struct {
	Id		int
	Name	string
	Surname string
	Email	string
	Gender string
}


type Order struct {
  OrderId		int
  CustId		int
	Name	string
	Description string
	Quantity	int
	Price int
}

func dbConn() ( db *sql.DB ) {
	dbDriver := "mysql"
	// dbUser := "hendry"
	// dbPass := "hendry888"
	// dbNama := "e_commerce_db"

        db_access := os.Getenv("CLEARDB_DATABASE_URL")

	// db, err := sql.Open(dbDriver, dbUser+":"+dbPass+"@/"+dbNama)
	db, err := sql.Open(dbDriver, db_access)
	if err != nil {
		panic (err.Error)
	}
	return db
}

var tmpl = template.Must(template.ParseGlob("form/*"))

func Index(w http.ResponseWriter, r *http.Request) {
	db := dbConn()
	selDB, err := db.Query("SELECT * FROM customers order BY cust_id DESC")
	if err != nil {
		panic(err.Error())
	}
	cus := Customer{}
	res := []Customer{}

	for selDB.Next() {
		var cust_id int
		var gendr, name, surname, email string
		err = selDB.Scan(&cust_id, &name, &surname, &email, &gendr)
		if err != nil {
			panic(err.Error())
		}
		cus.Id = cust_id
		cus.Name = name
		cus.Surname = surname
		cus.Email = email
		cus.Gender = gendr
		res = append(res, cus)
	}

	tmpl.ExecuteTemplate(w, "Index", res)
	defer db.Close()
}

func Orders(w http.ResponseWriter, r *http.Request) {
	db := dbConn()
	selDB, err := db.Query("SELECT * FROM orders order BY order_id DESC")
	if err != nil {
		panic(err.Error())
	}
	
	order := Order{}
	res := []Order{}

	for selDB.Next() {
		var price, quantity, order_id, cust_id int
		var description, name string
		err = selDB.Scan(&order_id, &name, &description, &quantity, &price, &cust_id)
		if err != nil {
			panic(err.Error())
		}
		order.CustId = cust_id
		order.OrderId = order_id
		order.Name = name
		order.Description = description
		order.Quantity = quantity
		order.Price = price
		res = append(res, order)
	}

	tmpl.ExecuteTemplate(w, "Orders", res)

	defer db.Close()
}



func Show(w http.ResponseWriter, r *http.Request) {
	db := dbConn()
	nId := r.URL.Query().Get("id")
	selDB, err := db.Query("select * from customers where cust_id=?", nId)
	if err != nil {
		panic(err.Error())
	}
	cus := Customer{}
		for selDB.Next() {
			var cust_id int
			var gendr, name, surname, email string
			err = selDB.Scan(&cust_id, &name, &surname, &email, &gendr)
			if err != nil {
				panic(err.Error())
			}
			cus.Id = cust_id
			cus.Name = name
			cus.Surname = surname
			cus.Email = email
			cus.Gender = gendr
		}

	tmpl.ExecuteTemplate(w, "Show", cus)
	defer db.Close()
}


func New(w http.ResponseWriter, r *http.Request) {
    tmpl.ExecuteTemplate(w, "New", nil)
}

func Edit(w http.ResponseWriter, r *http.Request) {
    db := dbConn()
    nId := r.URL.Query().Get("id")
		selDB, err := db.Query("SELECT * FROM customers WHERE cust_id=?", nId)
    if err != nil {
        panic(err.Error())
    }
		
    cus := Customer{}
		for selDB.Next() {
			var cust_id int
			var gendr, name, surname, email string
			err = selDB.Scan(&cust_id, &name, &surname, &email, &gendr)
			if err != nil {
				panic(err.Error())
			}
			cus.Id = cust_id
			cus.Name = name
			cus.Surname = surname
			cus.Email = email
			cus.Gender = gendr
		}

    tmpl.ExecuteTemplate(w, "Edit", cus)
    defer db.Close()
}

func Insert(w http.ResponseWriter, r *http.Request) {
    db := dbConn()
    if r.Method == "POST" {
        name := r.FormValue("name")
        surname := r.FormValue("surname")
        gender := r.FormValue("gender")
        email := r.FormValue("email")
        insForm, err := db.Prepare("INSERT INTO customers(Name, Surname, Email, Gender) VALUES(?,?,?,?)")
        if err != nil {
            panic(err.Error())
        }
        insForm.Exec(name, surname, email, gender)
        log.Println("INSERT: Name: " + name + " | City: " + surname)
    }
    defer db.Close()
    http.Redirect(w, r, "/", 301)
}

func Update(w http.ResponseWriter, r *http.Request) {
    db := dbConn()
    if r.Method == "POST" {
        name := r.FormValue("name")
        surname := r.FormValue("surname")
        gender := r.FormValue("gender")
        email := r.FormValue("email")
				id := r.FormValue("uid")
				insForm, err := db.Prepare("UPDATE customers SET name=?, surname=?, email=?, gender=? WHERE cust_id=?")
        if err != nil {
            panic(err.Error())
        }
        insForm.Exec(name, surname, email, gender, id)
        log.Println("UPDATE: Name: " + name + " | City: " + surname)
    }
    defer db.Close()
    http.Redirect(w, r, "/", 301)
}

func Delete(w http.ResponseWriter, r *http.Request) {
    db := dbConn()
    emp := r.URL.Query().Get("id")
    delForm, err := db.Prepare("DELETE FROM customers WHERE cust_id=?")
    if err != nil {
        panic(err.Error())
    }
    delForm.Exec(emp)
    log.Println("DELETE")
    defer db.Close()
    http.Redirect(w, r, "/", 301)
}

func main() {
    log.Println("Server started on: http://localhost:8080")
    http.HandleFunc("/", Index)
    http.HandleFunc("/orders", Orders)
    http.HandleFunc("/show", Show)
    http.HandleFunc("/new", New)
    http.HandleFunc("/edit", Edit)
    http.HandleFunc("/insert", Insert)
    http.HandleFunc("/update", Update)
    http.HandleFunc("/delete", Delete)
    
    // http.ListenAndServe(":8080", nil)
    port := os.Getenv("PORT")
    http.ListenAndServe(":"+port, nil)

		
}

