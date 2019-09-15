#!/usr/bin/env python
# -*- coding: utf-8 -*-
import requests
from flask import Flask, render_template, request, url_for, redirect

app = Flask(__name__, static_folder='static', template_folder='templates')

@app.route('/')
def home():
    """Displays the homepage."""
    
    return render_template('index.html')

@app.route('/query', methods=['POST'])
def query():

    data = request.get_json()
    query = data['query']

    return redirect(url_for('map', query=query))

@app.route('/map', methods=['GET'])
def map():

    query = request.args['query']
    url = 'https://ramiroaznar.carto.com/api/v2/sql?q={}&format=geojson'.format(query)

    session = requests.Session()
    r = session.get(url)
    features = r.json()

    return render_template('map.html', features=features)

if __name__ == '__main__':
    app.run(debug=True)