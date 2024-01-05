import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="jodst",
  password="DBPlay&me$47",
  database="mydatabase"
)

#print(mydb)

mycursor = mydb.cursor()

# create a database
##mycursor.execute("CREATE DATABASE mydatabase")

## show all dbs
'''mycursor.execute("SHOW DATABASES")
for x in mycursor:
  print("dbs: ",x)'''
 
###  create a table 
#mycursor.execute("CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))")

### alter table and add id column as a primary key
#mycursor.execute("ALTER TABLE customers ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY")

## show tables
'''mycursor.execute("SHOW TABLES")
for t in mycursor:
  print("tables: ",t)'''


#### add record to table  
#sql = "INSERT INTO customers (name, address) VALUES (%s, %s)"
#val = ("John", "Highway 21")

#mycursor.execute(sql, val)

#mydb.commit()

#print(mycursor.rowcount, "record inserted.")


## add multiple values to a table
'''sql = "INSERT INTO customers (name, address) VALUES (%s, %s)"
val = [
  ('Peter', 'Lowstreet 4'),
  ('Amy', 'Apple st 652'),
  ('Hannah', 'Mountain 21'),
  ('Michael', 'Valley 345'),
  ('Sandy', 'Ocean blvd 2'),
  ('Betty', 'Green Grass 1'),
  ('Richard', 'Sky st 331'),
  ('Susan', 'One way 98'),
  ('Vicky', 'Yellow Garden 2'),
  ('Ben', 'Park Lane 38'),
  ('William', 'Central st 954'),
  ('Chuck', 'Main Road 989'),
  ('Viola', 'Sideway 1633')
]

mycursor.executemany(sql, val)

mydb.commit()

print(mycursor.rowcount, "records inserted.")
'''


# add row and get id number
"""sql = "INSERT INTO customers (name, address) VALUES (%s, %s)"
val = ("Michelle", "Blue Village")
mycursor.execute(sql, val)

mydb.commit()

print("1 record inserted, ID:", mycursor.lastrowid)
"""

### get all values from table and store in 'myresult'
"""mycursor.execute("SELECT * FROM customers")

myresult = mycursor.fetchall()

for x in myresult:
  print(x)
  
## get only 1 row
mycursor.execute("SELECT * FROM customers")
myresultOne = mycursor.fetchone()
print("oneresult: ",myresultOne)
"""

# where example
"""
sql = "SELECT * FROM customers WHERE address LIKE '%way%'"

mycursor.execute(sql)

myresult = mycursor.fetchall()

for x in myresult:
  print(x)
"""


## prevent SQL injection
'''
sql = "SELECT * FROM customers WHERE address = %s"
adr = ("Yellow Garden 2", )

mycursor.execute(sql, adr)

myresult = mycursor.fetchall()

for x in myresult:
  print(x)
  '''
  
### delete example
'''
sql = "DELETE FROM customers WHERE address = %s"
adr = ("Yellow Garden 2", )

mycursor.execute(sql, adr)

mydb.commit()

print(mycursor.rowcount, "record(s) deleted")
'''


### update record
'''sql = "UPDATE customers SET address = %s WHERE address = %s"
val = ("Valley 345", "Canyon 123")
mycursor.execute(sql,val)
mydb.commit()
print(mycursor.rowcount, "record(s) affected")'''


#select and limit rows returned with an offset
'''mycursor.execute("SELECT * FROM customers LIMIT 5 OFFSET 2")
myresult = mycursor.fetchall()
for x in myresult:
  print(x)'''


### drop table example
'''sql = "DROP TABLE IF EXISTS customers"

mycursor.execute(sql)
'''


### create user and product tables
#mycursor.execute("CREATE TABLE users(userid INT AUTO_INCREMENT, name VARCHAR(255), fav VARCHAR(255), PRIMARY KEY (userid))")
##mycursor.execute("CREATE TABLE products (prodid INT AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY(prodid))")



## join 2 tables
'''users that have a fav product'''
'''
sql = "SELECT \
  users.name AS user, \
  products.name AS favorite \
  FROM users \
  INNER JOIN products ON users.fav = products.prodid"
'''

'''Left join - all users even if they dont have a fav '''
sql = "SELECT \
  users.name AS user, \
  products.name AS favorite \
  FROM users \
  LEFT JOIN products ON users.fav = products.prodid"
  
'''Right join - all products and users that enjoy a fav'''
sql = "SELECT \
  users.name AS user, \
  products.name AS favorite \
  FROM users \
  RIGHT JOIN products ON users.fav = products.prodid"

mycursor.execute(sql)

myresult = mycursor.fetchall()

for x in myresult:
  print(x)