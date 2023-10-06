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
City = Path("C:/Users/smoot/anaconda3/Bootcamp/Project3/data/city.sqlite")
County = Path("C:/Users/smoot/anaconda3/Bootcamp/Project3/data/county.sqlite")
Historical = Path("C:/Users/smoot/anaconda3/Bootcamp/Project3/data/historical.sqlite")
engine = create_engine(f"sqlite:///{City}")
Base = automap_base()
Base.prepare(autoload_with=engine)
city_ORM = Base.classes.keys()
#Create Flask API
app = Flask(__name__)


@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/city<br/>"
        f"/api/v1.0/county"
        f"/api/v1.0/historical"
    )
@app.route("/api/v1.0/city")
def city():
    session = Session(engine)
    results = session.execute(text('SELECT * FROM city')).fetchall()
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