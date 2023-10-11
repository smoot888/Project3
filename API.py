#Import dependencies
from pathlib import Path
from sqlalchemy import create_engine, text, func
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
import numpy as np
from flask import Flask, jsonify
#Setup dabases
# Create a reference to the file.
City = Path("data/city.sqlite")
County = Path("data/county.sqlite")
Historical = Path("data/historical.sqlite")
engine_City = create_engine(f"sqlite:///{City}")
engine_County = create_engine(f"sqlite:///{County}")
engine_Historical = create_engine(f"sqlite:///{Historical}")
#Base = automap_base()
#Base.prepare(autoload_with=engine)
#city_ORM = Base.classes.keys()
#Create Flask API
app = Flask(__name__)


@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/city<br/>"
        f"/api/v1.0/county<br/>"
        f"/api/v1.0/historical<br/>"
    )
@app.route("/api/v1.0/city")
def city():
    session = Session(engine_City)
    results = session.execute(text('SELECT * FROM city')).fetchall()
    json_data = {}
    for index,row in enumerate(results):
        row_dict = {}
        for i in range(0,13):
            row_dict[i] = results[index][i]
        json_data[index] = row_dict
        session.close()
    
    return dict(json_data)

@app.route("/api/v1.0/historical")
def historical():
    session = Session(engine_Historical)
    results = session.execute(text('SELECT * FROM historical')).fetchall()
    json_data = {}
    for index,row in enumerate(results):
        row_dict = {}
        for i in range(0,40):
            row_dict[i] = results[index][i]
        json_data[index] = row_dict
        session.close()
    
    return dict(json_data)

@app.route("/api/v1.0/county")
def county():
    session = Session(engine_County)
    results = session.execute(text('SELECT * FROM county')).fetchall()
    json_data = {}
    for index,row in enumerate(results):
        row_dict = {}
        for i in range(0,13):
            row_dict[i] = results[index][i]
        json_data[index] = row_dict
        session.close()
    
    return dict(json_data)


if __name__ == '__main__':
    app.run(debug=True)