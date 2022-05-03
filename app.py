from flask import Flask,render_template,request,jsonify
import pandas as pd
import csv
from flask_cors import CORS
import json



app = Flask(__name__)
CORS(app)
@app.route('/calculate',methods=['POST'])
def predict():
    answers = request.get_json()
    print(answers)
    return "hello worlds"
if __name__=='__main__':
    app.run(port=8000,debug=True)