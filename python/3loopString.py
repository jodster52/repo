for x in "bananas":
    print(x)
    
a = "This is only a test"
print(a)
print(len(a))
if "only" in a:
    print("Yes, 'only' is present")
if "real" not in a:
    print("No, 'real' is not present")
    
b = "Hello World"
print(b.upper())

#format
age = 33
txt = "My dog is {}"
print(txt.format(age))
quant = 3
itemno = 3782
price = 3.45
myorder = "I want {} pieces of item {} for ${} dollars."
print(myorder.format(quant,itemno,price))

#if
a = 200
b = 33

if b > a:
    print("b is greater than a")
else:
    print("b is not greater than a")
    
print(bool("Hello"))
print(bool(21))

print("===loop break")
fruits = ["apple", "banana", "cherry"]
for x in fruits:
  print(x)
  if x == "banana":
    break
  print(x)
  
print("--continue")
fruits = ["apple", "banana", "cherry"]
for x in fruits:
  if x == "banana":
    continue
  print(x)
  
print("====range")
for x in range(6):
  print(x)
  
for x in range(2, 6):
  print(x)

print("===== increment loop")
for x in range(3, 30, 3):
  print(x)
  
print("====else in loop")
for x in range(6):
  print(x)
else:
  print("Finally finished!")

print("=== break")
for x in range(6):
  if x == 3: break
  print(x)
else:
  print("Finally finished!")
  
print("==== nested loop")
adj = ["red", "big", "tasty"]
fruits = ["apple", "banana", "cherry"]

for x in adj:
  for y in fruits:
    print(x, y)
    
print("=== pass example")
for x in [0, 1, 2]:
  pass