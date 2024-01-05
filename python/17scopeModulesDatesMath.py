#scope
print("===scope with global")
x = 300

def myfunc():
  global x
  x = 200

myfunc()

print(x)

#import module
print("===import module")
import mymodule
mymodule.greeting("Jodi")

# variable in module
print("==== variable in mymodule and renaming module")
import mymodule as mx
a = mx.person1["age"]
print("age: ",a)

#use built in module
print("=== use built in python module platform")
import platform

xSys = platform.system()
print("System: ",xSys)

xDir = dir(platform)
#print("xDir: ",xDir)

#use bits of a module
print("== import parts from a module")
from mymodule import person1

print (person1["age"])

#dates, strftime
print("=== dates")
import datetime

x = datetime.datetime.now()
print(x)
print("year ",x.year)
print("day of week ",x.strftime("%A"))
print("full month name:  ",x.strftime("%B"))


#min max
print("=== math min and max of 5,10,25")
x = min(5, 10, 25)
y = max(5, 10, 25)

print(x)
print(y)

print("=== absolute value")
x = abs(-7.25)

print(x)

print("===power of y")
x = pow(4, 2)

print(x)

#import math
print("=== import math and get square root")
import math

x = math.sqrt(64)

print(x)

print("=== ceiling and floor of 1.4")
x = math.ceil(1.4)
y = math.floor(1.4)

print(x) # returns 2
print(y) # returns 1

print("=== pi")
x = math.pi

print(x)