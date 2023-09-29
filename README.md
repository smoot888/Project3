# Project3
Air Pollution in the United States

SQL code for each table
CREATE TABLE IF NOT EXISTS public."AirQuality_City_2022"
(
    "City" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    "State" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    "Population" integer,
    "CBSA Code" integer,
    "CO" numeric,
    "Pb" numeric,
    "NO2 (AM)" numeric,
    "NO2 (1hr)" numeric,
    "O3" numeric,
    "PM10" numeric,
    "PM2.5 (WAM)" numeric,
    "PM2.5 (24hr)" numeric,
    "SO2" numeric,
    CONSTRAINT "AirQuality_City_2022_pkey" PRIMARY KEY ("City", "State")
)
