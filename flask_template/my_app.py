#using my own flask app

from flask import Flask, render_template

app = Flask(__name__)
app.secret_key = "shhhthisisasecret"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/register")
def register():
    return render_template("register.html")

if __name__ == "__main__":
    app.run(debug = True)