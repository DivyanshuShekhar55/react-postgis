package pg

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/jackc/pgx/v5"
	geom "github.com/twpayne/go-geom"
)

type PolygonRow struct {
	id   int64
	name string
	geom *geom.Polygon
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
			return nil, fmt.Errorf("couldn't get errors %s", err)
		}

		// fir bas unmarshal karke geostr ko json mein convert kardo
		var geojsonitem GeoJSONPolygon
		if err = json.Unmarshal([]byte(geo_json_str), &geojsonitem); err != nil {
			return nil, fmt.Errorf("polygon unmarshal error %s", err)
		}

		// abhi flatten all coordinates inside the geojson item
		poly := geom.NewPolygon(geom.XY)
		for _, ring := range geojsonitem.Coordinates {
			flat := make([]float64, 0, len(ring)*2)
			for _, pt := range ring {
				flat = append(flat, pt[0], pt[1])
			}
			linear_ring := geom.NewLinearRingFlat(geom.XY, flat)
			poly.Push(linear_ring)
		}

		res = append(res, PolygonRow{
			id:   id,
			name: name,
			geom: poly,
		})

	}

	return res, rows.Err()

}
