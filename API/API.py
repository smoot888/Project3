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
Historical = Path("../data/historical2.sqlite")
engine_Historical = create_engine(f"sqlite:///{Historical}")

#Create Flask API
app = Flask(__name__)


@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/historical<br/>"
    )

@app.route("/api/v1.0/historical")
def historical():
    session = Session(engine_Historical)
    results = session.execute(text('SELECT * FROM historical')).fetchall()
    headers = session.execute(text('PRAGMA table_info(historical)')).fetchall()
    json_data = []
    for index,row in enumerate(results):
        row_dict = {}
        for i in range(len(headers)):
            row_dict[headers[i][1]] = results[index][i]
        json_data.append(row_dict)
        session.close()
    
    return json_data

if __name__ == '__main__':
    app.run(debug=True)