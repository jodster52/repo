#lambda functions
print("==add 10 to 5")
x = lambda a : a + 10
print(x(5))

print("==multiply 5*6")
x = lambda a, b : a * b
print(x(5, 6))

print("=== return result")
x = lambda a, b, c : a + b + c
print(x(5, 6, 2))

print("==== inside a function")
def myfunc(n):
  return lambda a : a * n
  
mydoubler = myfunc(2)

print(mydoubler(11))

mytripler = myfunc(3)

print(mytripler(11))