package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

type dbconfig struct {
	pool *pgxpool.Pool
	// maybe define some max conections (active/idle)
	// but abhi ke liye itna hi kaafi hai
	dbImpl dbImpl
}

type config struct {
	addr string
	db   dbconfig
	env  string
}

type Application struct {
	conf config
	mux  *http.ServeMux
}

type dbImpl interface {
	GetAllPolygons(w http.ResponseWriter, r *http.Request)
	InsertPolygon(w http.ResponseWriter, r *http.Request)
}

func main() {
	fmt.Println("Starting backend server...")
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
		return
	}
	pg_conn_str := os.Getenv("PG_CONN")
	env := os.Getenv("ENV")

	if pg_conn_str == "" {
		fmt.Print("couldnt find conn string")
		return
	}

	ctx := context.Background()

	// db, err := pgx.Connect(ctx, pg_conn_str)
	// if err != nil {
	// 	panic(err)
	// }

	// defer db.Close(ctx)

	pool, err := pgxpool.New(ctx, pg_conn_str)
	if err!= nil {
		log.Fatalf("couldn't connect to db err : %s", err)
	}
	defer pool.Close()

	pg := dbconfig{
		pool:   pool,
		dbImpl: NewDbImpl(pool),
	}

	conf := config{
		addr: ":6969",
		db:   pg,
		env:  env,
	}

	mux := http.NewServeMux()

	app := &Application{
		conf: conf,
		mux:  mux,
	}

	app.mux.HandleFunc("GET /", healthCheck)
	app.mux.HandleFunc("GET /location", app.conf.db.dbImpl.GetAllPolygons)
	app.mux.HandleFunc("POST /location", app.conf.db.dbImpl.InsertPolygon)

	// wrap kardo mux ko with cors
	handler := withCORS(mux)

	srv := http.Server{
		Addr:         app.conf.addr,
		Handler:      handler,
		IdleTimeout:  time.Second * 30,
		WriteTimeout: time.Second * 60,
		ReadTimeout:  time.Second * 30,
	}

	err = srv.ListenAndServe()
	if err != nil {
		fmt.Printf("error starting server %v", err)
		panic(err)
	}

	defer srv.Close()

}
