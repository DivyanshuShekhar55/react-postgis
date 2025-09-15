package main

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5"
)

func main() {
	pg_conn_str := os.Getenv("PG_CONN")
	if pg_conn_str == "" {
		fmt.Print("couldnt find conn string")
		return
	}

	ctx := context.Background()

	conn, err := pgx.Connect(ctx, pg_conn_str)
	if err != nil {
		fmt.Printf("couldn't connect to pg %s", err)
		return
	}

	defer conn.Close(ctx)
}
