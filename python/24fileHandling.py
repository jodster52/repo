f = open("C:\\gitHubRepo\\repo\\python\\demofile.txt", "r")
print(f.read())
f.close()

f = open("C:\\gitHubRepo\\repo\\python\\demofile.txt", "r")
print("read part of file 5: ",f.read(5))
f.close()

f = open("demofile.txt", "r")
print(f.readline())
f.close()


print("===loop example")
f = open("demofile.txt", "r")
for x in f:
  print(x)
f.close()


print("==== write")
f = open("demofile2.txt", "a")
f.write("Now the file has more content!")
f.close()

#open and read the file after the appending:
f = open("demofile2.txt", "r")
print(f.read())

print("== overwrite")
f = open("demofile3.txt", "w")
f.write("Woops! I have deleted the content!")
f.close()

#open and read the file after the overwriting:
f = open("demofile3.txt", "r")
print(f.read())

# create and delete files
f = open("myfile.txt","x")
f.close()

import os
if os.path.exists("myfile.txt"):
  os.remove("myfile.txt")
else:
  print("The file does not exist")
  
# mkdir rm dir?
#import os
os.mkdir("C:\\gitHubRepo\\repo\\python\\myfolder")
os.rmdir("C:\\gitHubRepo\\repo\\python\\myfolder")