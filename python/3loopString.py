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