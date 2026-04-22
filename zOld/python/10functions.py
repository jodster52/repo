#functions
def my_function():
  print("Hello from a function")
  
my_function()

print("=== name")
def my_function(fname):
  print(fname + " Lastname")

my_function("Emil")
my_function("Tobias")
my_function("Linus")

print("=== 2 arguments")
def my_function(fname,lname):
  print(fname+ "   "+lname)
  
my_function("Jodi","Chalupa")

print("=== * if you dont know how many arguments will be passed")
def my_function(*kids):
  print("The youngest child is " + kids[2])

my_function("Emil", "Tobias", "Linus")

print("=== key values ")
def my_function(child3, child2, child1):
  print("The youngest child is " + child3)

my_function(child1 = "Emil", child2 = "Tobias", child3 = "Linus")

print("=== ** used before parameter name in function.  function will receive a dictionary and can access")
def my_function(**kid):
  print("His last name is " + kid["lname"])

my_function(fname = "Tobias", lname = "Refsnes")

print("=== default parameter value")
def my_function(country = "Norway"):
  print("I am from " + country)

my_function("Sweden")
my_function("India")
my_function()
my_function("Brazil")

print("=== pass a list as an argument")
def my_function(food):
  for x in food:
    print(x)

fruits = ["apple", "banana", "cherry"]

my_function(fruits)

print("===return value ")
def my_function(x):
  return 5 * x

print(my_function(3))
print(my_function(5))
print(my_function(9))

def myfunction():
  pass
  
print("== recursion example")
def tri_recursion(k):
  if(k > 0):
    result = k + tri_recursion(k - 1)
    print(result)
  else:
    result = 0
  return result

print("\n\nRecursion Example Results")
tri_recursion(6)

print("=== second recursion example")
def factorial(x):
    """This is a recursive function
    to find the factorial of an integer"""

    if x == 1:
        return 1
    else:
        return (x * factorial(x-1))


num = 3
print("The factorial of", num, "is", factorial(num))