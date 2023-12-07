thislist = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
#print(thislist[2:5])
#print(thislist[-1])
#thislist.sort(reverse = True)
thislist.reverse()
print(thislist)
for x in thislist:
    print(x)
if "watermelon" in thislist:
    print("watermelon in list")
else:
    print("watermelon not in list. adding it")
    listlen = len(thislist)
    thislist.insert(listlen,"watermelon")
    print(thislist)
print("del first item")
del thislist[0]
print(thislist)
print("while")
i=0
while i < len(thislist):
    print(thislist[i])
    i=i+1
    
newlist = []
for x in thislist:
    if "a" in x:
        newlist.append(x)
print(newlist)
