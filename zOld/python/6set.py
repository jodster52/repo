#6 sets
thisset = {"apple", "banana", "cherry"}
thisset.add("orange")
print(thisset)
print("type: ",type(thisset))
for x in thisset:
    print(x)
# check for banana
print("is banana in this set: ","banana" in thisset)
mylist = ["kiwi","mango"]
thisset.update(mylist)
thisset.discard("orange")
print("added a list to set: ",thisset)

#.pop() will randomly remove a value in set
# del thisset will delete the set or tuple
# .clear() will leave the set but empty all values

set1 = {"a", "b" , "c"}
set2 = {1, 2, 3}

set3 = set1.union(set2)
print("set3: ",set3)

set4 = {"a", "b" , "c"}
set5 = {1, 2, 3}

set4.update(set5)
print("set4: ",set4)

# intersection_update keeps only duplicates
xKeepOnlyDups = {"apple", "banana", "cherry"}
yKeepOnlyDups = {"google", "microsoft", "apple"}

xKeepOnlyDups.intersection_update(yKeepOnlyDups)

print(xKeepOnlyDups)

#intersection example
xKeepOnlyDups2 = {"apple", "banana", "cherry"}
yKeepOnlyDups2 = {"google", "microsoft", "apple"}

zNewListWithDupsFrom2Sets = xKeepOnlyDups2.intersection(yKeepOnlyDups2)

print("zNewListWithDupsFrom2Sets: ",zNewListWithDupsFrom2Sets)

# symmetric_difference_update - keep all but not duplicates
xKeepAllButDups = {"apple", "banana", "cherry"}
yKeepAllButDups = {"google", "microsoft", "apple"}

xKeepAllButDups.symmetric_difference_update(yKeepAllButDups)

print("xKeepAllButDups: ",xKeepAllButDups)

#True and 1 are considered the same
xKeepAllButDups2 = {"apple", "banana", "cherry", True}
yKeepAllButDups2 = {"google", 1, "apple", 2}

zKeepAllButDups = xKeepAllButDups2.symmetric_difference(yKeepAllButDups2)

print(zKeepAllButDups)