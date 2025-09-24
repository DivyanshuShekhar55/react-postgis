package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/DivyanshuShekhar55/backend/internal/pg"
	"github.com/jackc/pgx/v5/pgxpool"
)

type DbImpl struct {
	pool *pgxpool.Pool
}

func NewDbImpl(pool *pgxpool.Pool) *DbImpl {
	return &DbImpl{pool: pool}
}

// type point struct {
// 	X float64
// 	Y float64
// }

// type Location struct {
// 	geoType   string
// 	geoPoints []point
// }

func (db *DbImpl) InsertPolygon(w http.ResponseWriter, r *http.Request) {
	var req pg.InsertBody
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "error unmarshalling req", http.StatusBadRequest)
		fmt.Printf("error unmarshaliing insert location req %s", err)
		return
	}

	err := pg.Insert(r.Context(), db.pool, req)
	if err != nil {
		http.Error(w, "error inserting data", http.StatusInternalServerError)
		fmt.Printf("error : %s", err.Error())
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("ok"))

}

func (db *DbImpl) GetAllPolygons(w http.ResponseWriter, r *http.Request) {
	res, err := pg.GetAllPolygons(r.Context(), db.pool)
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
