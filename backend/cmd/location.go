package main

import (
	"net/http"

	"github.com/DivyanshuShekhar55/backend/internal/pg"
	"github.com/jackc/pgx/v5"
)

type DbImpl struct {
	conn *pgx.Conn
}

func NewDbImpl(conn *pgx.Conn) *DbImpl{
	return &DbImpl{conn: conn}
}

type point struct {
	X float64
	Y float64
}

type Location struct {
	geoType   string
	geoPoints []point
}

func (app *Application) InsertLocation(w http.ResponseWriter, r *http.Request) {

}

func (db *DbImpl) GetAllPolygons(w http.ResponseWriter, r *http.Request){
	 pg.GetAllPolygons()
}
