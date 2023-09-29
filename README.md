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

CREATE TABLE IF NOT EXISTS public."AirQuality_County_2022"
(
    "State" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    "County" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    "County Code" integer,
    "Population" integer,
    "CO" numeric,
    "Pb" numeric,
    "NO2 (AM)" numeric,
    "NO2 (1hr)" numeric,
    "O3" numeric,
    "PM10" numeric,
    "PM2.5 (WAM)" numeric,
    "PM2.5 (24hr)" numeric,
    "SO2" numeric,
    CONSTRAINT "AirQuality_County_2022_pkey" PRIMARY KEY ("State", "County")
);

CREATE TABLE IF NOT EXISTS public."HistoricalPollution"
(
    "Primary Key" integer NOT NULL,
    "CBSA" integer,
    "City" character varying(100) COLLATE pg_catalog."default",
    "State" character varying(100) COLLATE pg_catalog."default",
    "Pollutant" character varying(100) COLLATE pg_catalog."default",
    "Trend Stat" character varying(100) COLLATE pg_catalog."default",
    "Number of Sites" integer,
    "1990" numeric,
    "1991" numeric,
    "1992" numeric,
    "1993" numeric,
    "1994" numeric,
    "1995" numeric,
    "1996" numeric,
    "1997" numeric,
    "1998" numeric,
    "1999" numeric,
    "2000" numeric,
    "2001" numeric,
    "2002" numeric,
    "2003" numeric,
    "2004" numeric,
    "2005" numeric,
    "2006" numeric,
    "2007" numeric,
    "2008" numeric,
    "2009" numeric,
    "2010" numeric,
    "2011" numeric,
    "2012" numeric,
    "2013" numeric,
    "2014" numeric,
    "2015" numeric,
    "2016" numeric,
    "2017" numeric,
    "2018" numeric,
    "2019" numeric,
    "2020" numeric,
    "2021" numeric,
    "2022" numeric,
    CONSTRAINT "HistoricalPollution_pkey" PRIMARY KEY ("Primary Key")
);
