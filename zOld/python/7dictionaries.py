#dictionaries
thisdict = {
  "brand": "Ford",
  "model": "Mustang",
  "year": 1964,
  "year": 2020
}
print(thisdict)
print("brand: ",thisdict["brand"])
print(len(thisdict))
print(type(thisdict))

# access data
x = thisdict["model"]
print(x)
y = thisdict.get("model")
print(y)

k = thisdict.keys()
print("keys: ",k)
vals = thisdict.values()
print("values: ",vals)

#update the keys list
car = {
"brand": "Ford",
"model": "Mustang",
"year": 1964
}

xUpdKeys = car.keys()
xUpdVals = car.values()

print(xUpdKeys) #before the change
print(xUpdVals)

car["color"] = "white"
car["year"] = 2020

print(xUpdKeys) #after the change
print(xUpdVals)

#get items
gItems = car.items()
car["year"] = 1999
print(gItems)

#check if key is present
if "model" in thisdict:
  print("Yes, 'model' is one of the keys in the thisdict dictionary")
  
thisdict.update({"year": 2009})
thisdict.update({"color": "red"})
print(thisdict)

#remove an items
thisdict.pop("color")
print(thisdict)

#loop dict
for xLoopVal in thisdict.values():
  print(xLoopVal)
  
for xLoopKey, yLoopVal in thisdict.items():
  print(xLoopKey, yLoopVal)
  
#copy dict
myDict = thisdict.copy()
print(myDict)
myD2 = dict(thisdict)
print(myD2)

#nested dictionaries
myfamily = {
  "child1" : {
    "name" : "Emil",
    "year" : 2004
  },
  "child2" : {
    "name" : "Tobias",
    "year" : 2007
  },
  "child3" : {
    "name" : "Linus",
    "year" : 2011
  }
}

print(myfamily["child2"]["name"])