from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import boto3
import json

app = Flask(__name__)
CORS(app)

# AWS S3 Configuration
S3_BUCKET = "paynet-pohan"
S3_FILE = "crime_district_filtered.csv"

# Load Malaysia GeoJSON
with open("malaysia.geojson", "r") as f:
    geojson_data = json.load(f)

# Function to load dataset from AWS S3
def load_data():
    s3_client = boto3.client(
        "s3"
    )       
    obj = s3_client.get_object(Bucket=S3_BUCKET, Key=S3_FILE)
    df = pd.read_csv(obj["Body"])
    
    # Ensure date is datetime format
    df["date"] = pd.to_datetime(df["date"])
    df["year"] = df["date"].dt.year
    return df

# API 1: Get Crime Heatmap Data
@app.route("/crime-heatmap", methods=["GET"])
def crime_heatmap():
    df = load_data()

    # Get filters
    year = request.args.get("year")
    crime_type = request.args.get("type")

    # Apply filters
    if year:
        df = df[df["year"] == int(year)]
    if crime_type:
        df = df[df["type"] == crime_type]

    # Aggregate crime count per state
    crime_summary = df.groupby("state")["crimes"].sum().reset_index()

    # Merge crime data into GeoJSON
    for feature in geojson_data["features"]:
        state_name = feature["properties"]["name"]
        
        # Find crime data for this state
        crime_entry = crime_summary[crime_summary["state"] == state_name]
        
        # If state exists in crime data, update GeoJSON
        if not crime_entry.empty:
            feature["properties"]["crimes"] = int(crime_entry["crimes"].values[0])
        else:
            feature["properties"]["crimes"] = 0  # No data for this state

    return jsonify(geojson_data)

# API 2: Get Crime Trends Over Time
@app.route("/crime-trends", methods=["GET"])
def crime_trends():
    df = load_data()
    trends = df.groupby("date")["crimes"].sum().reset_index()
    return jsonify(trends.to_dict(orient="records"))

# API 3: Most Affected States
@app.route("/most-states", methods=["GET"])
def crime_states():
    df = load_data()
    trends = df.groupby("date")["crimes"].sum().reset_index()
    return jsonify(trends.to_dict(orient="records"))

# API 4: Crime Breakdown by Type
@app.route("/crime-distribution", methods=["GET"])
def crime_types():
    df = load_data()
    trends = df.groupby("date")["crimes"].sum().reset_index()
    return jsonify(trends.to_dict(orient="records"))

# API 5: Crime rate % change (YoY)
@app.route("/crime-rate-change", methods=["GET"])
def crime_rate_change():
    df = load_data()
    trends = df.groupby("date")["crimes"].sum().reset_index()
    return jsonify(trends.to_dict(orient="records"))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)