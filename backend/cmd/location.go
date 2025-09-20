package main

import (
	"encoding/json"
	"net/http"

	"github.com/DivyanshuShekhar55/backend/internal/pg"
	"github.com/jackc/pgx/v5"
)

type DbImpl struct {
	conn *pgx.Conn
}

func NewDbImpl(conn *pgx.Conn) *DbImpl {
	return &DbImpl{conn: conn}
}

// type point struct {
// 	X float64
// 	Y float64
// }

// type Location struct {
// 	geoType   string
// 	geoPoints []point
// }

func (app *Application) InsertLocation(w http.ResponseWriter, r *http.Request) {

}

func (db *DbImpl) GetAllPolygons(w http.ResponseWriter, r *http.Request) {
	res, err := pg.GetAllPolygons(r.Context(), db.conn)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(&res); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

}
