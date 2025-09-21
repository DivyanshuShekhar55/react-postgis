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

func Insert() error {
	return nil
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
