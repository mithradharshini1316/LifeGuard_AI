import sqlite3


conn = sqlite3.connect("database.db")

cursor = conn.cursor()



# User table

cursor.execute("""
CREATE TABLE IF NOT EXISTS users(

id INTEGER PRIMARY KEY AUTOINCREMENT,

name TEXT,

email TEXT UNIQUE,

password TEXT

)
""")





# Family table

cursor.execute("""
CREATE TABLE IF NOT EXISTS family(

id INTEGER PRIMARY KEY AUTOINCREMENT,

name TEXT,

phone TEXT

)
""")






# Emergency table

cursor.execute("""
CREATE TABLE IF NOT EXISTS emergency(

id INTEGER PRIMARY KEY AUTOINCREMENT,

message TEXT,

location TEXT,

status TEXT,

time TIMESTAMP DEFAULT CURRENT_TIMESTAMP

)
""")





conn.commit()

conn.close()


print("✅ LifeGuard AI Database Created Successfully")