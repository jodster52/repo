#try except
try:
  print(x)
except NameError:
  print("Variable x is not defined")
except:
  print("Something else went wrong")
  
  
print("=== else example")
try:
  print("Hello")
except:
  print("Something went wrong")
else:
  print("Nothing went wrong")
  
# finally
print("====finally example")
try:
  print(x)
except:
  print("Something went wrong")
finally:
  print("The 'try except' is finished")
  
  
# try to open file  
print("== try to open a file")
try:
  f = open("demofile.txt")
  try:
    f.write("Lorum Ipsum")
  except:
    print("Something went wrong when writing to the file")
  finally:
    f.close()
except:
  print("Something went wrong when opening the file")
  
# Exception
print("=== Exception example")
x = -1

#if x < 0:
#  raise Exception("Sorry, no numbers below zero")
  
  
  
#type error
print("=== typeError")
hi = "hello"

if not type(hi) is int:
  raise TypeError("Only integers are allowed")