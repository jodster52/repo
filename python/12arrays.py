#arrays

cars = ["Ford", "Volvo", "BMW"]
print(cars.sort())
x = len(cars)
print(x)

print("=== add to array")
cars.append("Honda")
print(cars)

print("=== pop to remove 2nd value ")
cars.pop(1)
print(cars)

print("== use remove to delete from array")
cars.remove("Honda")
print(cars)