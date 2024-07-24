user_input = input()

new_str = ""
for i in user_input:
    if i.isalpha():
        new_str+=i.lower()

if(new_str ==new_str[::-1]):
    print("It is a Palindrome")
else:
    print("It is not a Palindrome")
