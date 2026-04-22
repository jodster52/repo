# import random module
import random
# import numbers 
import numbers
# print multiline instruction
print('Simple addition game:\n')

while True:

    first_int = random.randint(0, 80)
    second_int = random.randint(0, 80)
    actualSolution = int(first_int)+int(second_int)
    
    print(str('Solve: '+str(first_int) + ' + ' + str(second_int)))
    promptEquation = input("Enter your answer: ")
    try:
        userSolution = int(promptEquation)
        
        if userSolution == actualSolution:
            print("Correct!\n")
        else:
            print("Wrong!  The correct answer is: ",actualSolution,"\n")
    except ValueError:
        print("You did not enter a number!  The correct answer is: ",actualSolution,"\n")
        break
# we print thanks for playing
print("thanks for playing.  Good Bye")
