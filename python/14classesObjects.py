#classes and objects
print("=== myclass example")
class MyClass:
  x = 5
  
p1 = MyClass()
print(p1.x)  


print("===== __init__ function example")
class Person:
  def __init__(self, name, age):
    self.name = name
    self.age = age

p1 = Person("John", 36)

print(p1.name)
print(p1.age)

print("===str func example")
class Person:
  def __init__(self, name, age):
    self.name = name
    self.age = age

  def __str__(self):
    return f"{self.name}({self.age})"

p1 = Person("John", 36)

print(p1)

print("=== object methods")
class Person:
  def __init__(self, name, age):
    self.name = name
    self.age = age

  def myfunc(self):
    print("Hello my name is " + self.name)

p1 = Person("John", 36)
p1.myfunc()

print("=== not using self")
class Person:
  def __init__(mysillyobject, name, age):
    mysillyobject.name = name
    mysillyobject.age = age

  def myfunc(abc):
    print("Hello my name is " + abc.name)

p1 = Person("John", 36)
p1.myfunc()

p1.age = 40
print("age updated to: ",p1.age)

class Person:
  pass
  
print("=== parent class")
class Person:
  def __init__(self, fname, lname):
    self.firstname = fname
    self.lastname = lname

  def printname(self):
    print(self.firstname, self.lastname)

#Use the Person class to create an object, and then execute the printname method:

x = Person("John", "Doe")
x.printname()

print("=== child class")
class Student(Person):
  def __init__(self,fname,lname,year):
    #Person.__init__(self,fname,lname)
    super().__init__(fname,lname)
    self.graduationyear = year
  def printstudent(self):
    print("Welcome",self.firstname,self.lastname,"class of ",self.graduationyear)
    
x = Student("Mike", "Olsen", 2020)
x.printstudent()