#pip allows download of pachages
# example, install a package called camelcase
# from cmd prompt

# > pip install camelcase

#no you can import and use it!

import camelcase

c = camelcase.CamelCase()

txt = "hello world"

print("camel example: ",c.hump(txt))

# to uninstall package
# from command prompt
# > pip uninstall camelcase

#to list all packages
# > pip list