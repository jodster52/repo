#RegEx
import re

txt = "The rain in Spain"
x = re.search("^The.*Spain$", txt)
print(x)

fa = re.findall("ai",txt)
print("findall: ",fa)

fp = re.findall("Portugal",txt)
print("find Portugal",fp)

ws = re.search("\s",txt)
print("first white space char is located at position: ",ws.start())

spEx = re.split("\s",txt)
print("split example: ",spEx)

mspEx = re.split("\s",txt,1)
print("maxSplit example at 1: ",mspEx)


print("=== sub example")
subEx = re.sub("\s","9",txt)
print(subEx)

sub2 = re.sub("\s","9",txt,2)
print("replace first 2 occurances of whitespace char with 9: ",sub2)

# match object
matObj = re.search("ai",txt)
print("match for ai: ",matObj)

#return tuple containing the start and end position of a match
capS = re.search(r"\bS\w+",txt)
print("capS as span: ",capS.span())
print("capS as string: ",capS.string)
print("capS as group: ",capS.group())