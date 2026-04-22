#while
print("====while")
i = 1
while i < 6:
  print(i)
  i += 1

print("====break at 3")
i = 1
while i < 6:
  print(i)
  if i == 3:
    break
  i += 1  

print("====Continue at 3===")  
i = 0
while i < 6:
  i += 1
  if i == 3:
    continue
  print(i)
  
print("====else in while")
i = 1
while i < 6:
  print(i)
  i += 1
else:
  print("i is no longer less than 6")