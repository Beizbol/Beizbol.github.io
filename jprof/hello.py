from flask import Flask

app = Flask(__name__)


@app.route("/lab/backends/flask")
def hello():
    return "Hello, Flask!"


# flask
if __name__ == "__main__":
    app.run(debug=True, port=4205)
