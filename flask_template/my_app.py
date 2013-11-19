#using my own flask app

from flask import Flask, render_template

app = Flask(__name__)
app.secret_key = "shhhthisisasecret"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/profile")
def profile():
    return render_template("profile.html")

@app.route("/camera")
def camera():
    return render_template("camera.html")

@app.route("/customize")
def customize():
    pass

@app.route("/register")
def register():
    return render_template("register.html")

if __name__ == "__main__":
    app.run(debug = True)