package pg

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/jackc/pgx/v5"
)

type PolygonRow struct {
	Id   int64          `json:"id"`
	Name string         `json:"name"`
	Geom GeoJSONPolygon `json:"geom"`
}

type GeoJSONPolygon struct {
	Type        string        `json:"type"`
	Coordinates [][][]float64 `json:"coordinates"`
}

type InsertBody struct {
	Name       string      `json:"name"`
	PolyPoints [][]float64 `json:"poly_points"`
}

func GetAllPolygons(ctx context.Context, conn *pgx.Conn) (res []PolygonRow, err error) {
	query := `SELECT id, name, ST_AsGeoJson(geom) FROM polygons`
	rows, err := conn.Query(ctx, query)

	if err != nil {
		fmt.Printf("error while fetching polygons %s", err)
		return nil, fmt.Errorf("error fetcing polygons from db %s", err)
	}

	defer rows.Close()

	for rows.Next() {
		var id int64
		var name string
		var geo_json_str string

		// see if all fields are proper
		if err := rows.Scan(&id, &name, &geo_json_str); err != nil {
			return nil, fmt.Errorf("couldn't get row %s", err)
		}

		// fir bas unmarshal karke geostr ko json mein convert kardo
		var geojsonitem GeoJSONPolygon
		if err = json.Unmarshal([]byte(geo_json_str), &geojsonitem); err != nil {
			return nil, fmt.Errorf("polygon unmarshal error %s", err)
		}

		res = append(res, PolygonRow{
			Id:   id,
			Name: name,
			Geom: geojsonitem,
		})

	}

	return res, rows.Err()

}

func Insert(ctx context.Context, conn *pgx.Conn, body InsertBody) error {
	query := `INSERT INTO polygons (name, geom) VALUES ($1, ST_GeomFromGeoJSON($2))`

	geo_json_struct := GeoJSONPolygon{
		Type:        "Polygon",

		// abhi ke liye we take [][] matrix of coords and convert to [][][]
		// baad mein agar multipolygons input lene ho toh change here
		Coordinates: [][][]float64{body.PolyPoints},
	}

	geo_json_byte, err := json.Marshal(geo_json_struct)
	if err != nil {
		return fmt.Errorf("error marsahlling to json %s", err)
	}

	geo_json_str := string(geo_json_byte)

	_, err = conn.Exec(ctx, query, body.Name, geo_json_str)
	if err != nil {
		return fmt.Errorf("error inserting data %s", err)
	}

	return nil

}
