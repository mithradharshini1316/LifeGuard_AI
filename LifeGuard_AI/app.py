from flask import Flask, render_template, request, jsonify
from gemini_ai import ask_gemini
import sqlite3

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/login")
def login():
    return render_template("login.html")


@app.route("/register")
def register():
    return render_template("register.html")


@app.route("/chatbot")
def chatbot():
    return render_template("chatbot.html")


@app.route("/medicine")
def medicine():
    return render_template("medicine.html")


@app.route("/water")
def water():
    return render_template("water.html")


@app.route("/meditation")
def meditation():
    return render_template("meditation.html")


@app.route("/emergency")
def emergency():
    return render_template("emergency.html")


@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")



# Family Dashboard
@app.route("/family")
def family():
    return render_template("family.html")





# Save SOS Alert
@app.route("/save_sos", methods=["POST"])
def save_sos():

    data = request.json

    message = data["message"]
    location = data["location"]


    conn = sqlite3.connect("database.db")

    cursor = conn.cursor()


    cursor.execute("""
    INSERT INTO emergency(message, location, status)
    VALUES(?,?,?)
    """,
    (
        message,
        location,
        "ACTIVE"
    ))


    conn.commit()
    conn.close()


    return jsonify({
        "result":"SOS Saved Successfully"
    })







# Get SOS Alert
@app.route("/get_sos")
def get_sos():

    conn = sqlite3.connect("database.db")

    cursor = conn.cursor()


    cursor.execute("""
    SELECT * FROM emergency
    ORDER BY id DESC
    LIMIT 1
    """)


    data = cursor.fetchone()


    conn.close()



    if data:

        return jsonify({

            "message": data[1],
            "location": data[2],
            "status": data[3],
            "time": data[4]

        })


    return jsonify({

        "message":"No emergency alert"

    })








# Add Family Member (NEW)

@app.route("/add_family", methods=["POST"])
def add_family():

    data = request.json


    name = data["name"]

    phone = data["phone"]



    conn = sqlite3.connect("database.db")

    cursor = conn.cursor()



    cursor.execute("""
    INSERT INTO family(name, phone)
    VALUES(?,?)
    """,
    (
        name,
        phone
    ))



    conn.commit()

    conn.close()



    return jsonify({

        "message":"Family member added"

    })









# Get Family Members (NEW)

@app.route("/get_family")
def get_family():


    conn = sqlite3.connect("database.db")

    cursor = conn.cursor()



    cursor.execute("""
    SELECT * FROM family
    """)



    members = cursor.fetchall()



    conn.close()



    family_list = []



    for member in members:

        family_list.append({

            "id": member[0],
            "name": member[1],
            "phone": member[2]

        })



    return jsonify(family_list)









# Gemini Chat API

@app.route("/chat", methods=["POST"])
def chat():

    user_message = request.json["message"]


    try:

        reply = ask_gemini(user_message)


        return jsonify({

            "reply": reply

        })


    except Exception as e:


        print("GEMINI ERROR:", e)


        return jsonify({

            "reply": str(e)

        })








if __name__ == "__main__":

    app.run(debug=True)