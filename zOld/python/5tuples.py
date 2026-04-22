# tuples
thistuple=("apple", "banana", "cherry", "orange", "kiwi", "melon", "mango")
print(thistuple)
print("length: ",len(thistuple))
print("type: ",type(thistuple))
print("thistuple minus 1: ",thistuple[-1])
print("thistuple range 2:5 is ",thistuple[2:5])
for i in range(len(thistuple)):
    print(thistuple[i])

#convert tuple to list to update it and convert it back to a tuple
x = ("apple", "banana", "cherry", "orange", "kiwi", "melon", "mango")
y = list(x)
y[1] = "kiwi"
y.append("watermelon")
y.remove("cherry")
x = tuple(y)
print(x)
m = y.count("kiwi")
print("count of kiwi in list: ",m)
d = y.index("watermelon")
print("index location of watermelon in list: ",d)

#unpack the tuple
fruits = ("apple", "banana", "cherry")

(green, yellow, red) = fruits

print(green)
print(yellow)
print(red)

#use asterisk
fruits2 = ("apple", "mango", "papaya", "pineapple", "cherry")

(green2, *tropic, red2) = fruits2

print(green2)
print(tropic)
print(red2)

fruits3 = ("apple", "banana", "cherry")
mytuple = fruits3 * 2

print(mytuple)