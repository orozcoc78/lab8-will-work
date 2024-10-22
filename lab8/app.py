from flask import Flask, render_template
import os


app = Flask(__name__)

# Serve the frontend HTML
@app.route('/')
def index():
    return render_template('index.html')

# API to add a new task
@app.route('/<string:values>')
def add_task(values):
    temp = values.split("&")
    print(temp)
    if len(temp)>=2:
        name = temp[1].split("=")[1]
        data = temp[2].split("=")[1]+"\n"

        f = open(name+".txt", "w")
        f.write(data)
        f.write("\n")
        f.close()

    return index()

if __name__ == '__main__':
    app.run(debug=True)
 