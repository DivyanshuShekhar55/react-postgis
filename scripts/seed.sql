CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE IF NOT EXISTS polygons (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  geom GEOMETRY(POLYGON, 4326)
);

-- London City Center (approximate, for demo)
INSERT INTO polygons (name, geom) VALUES
('London Center', ST_GeomFromText('POLYGON((
  -0.1411 51.5136,
  -0.1278 51.5074,
  -0.1090 51.5152,
  -0.1205 51.5230,
  -0.1411 51.5136
))', 4326));

-- London "West End" area (approximate)
INSERT INTO polygons (name, geom) VALUES
('West End', ST_GeomFromText('POLYGON((
  -0.1477 51.5116,
  -0.1309 51.5116,
  -0.1309 51.5211,
  -0.1477 51.5211,
  -0.1477 51.5116
))', 4326));
