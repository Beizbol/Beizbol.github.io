from blacksheep import Application, get

app = Application()


@get("/lab/backends/py/")
def home():
    return "Hello, Python!"


# uvicorn main:app --port 4202
