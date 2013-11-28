#using my own flask app

from flask import Flask, render_template

app = Flask(__name__)
app.secret_key = "shhhthisisasecret"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/profile")
def profile():
    username = session.get('username')
    if username:
        user_id = model_session.query(model.User).filter_by(username=username).first().user_id
    else:
        user_id = 0

    user_path = 'static/pictures/%d' % user_id
    if not os.path.exists(user_path):
        os.mkdir(user_path)

    model_session.commit()

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