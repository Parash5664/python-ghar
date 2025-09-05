import gradio as gr
import requests
import json
import random
import os

# Hugging Face API configuration
HF_API_URL = "https://api-inference.huggingface.co/models"
STARCODER_MODEL = "bigcode/starcoder2-3b"
DEEPSEEK_MODEL = "deepseek-ai/deepseek-coder-1.3b-base"
MISTRAL_MODEL = "mistralai/Mistral-7B-Instruct-v0.2"

# Hugging Face token from environment variable only
HF_TOKEN = os.getenv("HF_TOKEN")

# Simple code templates without functions for absolute beginners
# These templates work in both command-line and web environments
BEGINNER_TEMPLATES = {
    "check input num is odd or even": """
# Check if a number is odd or even
# This is the simplest way to check if a number is odd or even

# You can change this number to test different values
num = 7

# Use the % symbol to find the remainder when dividing by 2
# If the remainder is 0, the number is even
# If the remainder is 1, the number is odd
if num % 2 == 0:
    print(num, "is even")
else:
    print(num, "is odd")

# Try changing the number above to see different results!
""",
    
    "calculate the sum of numbers in a list": """
# Add up all numbers in a list
# This is how to add all numbers together

# A list of numbers
numbers = [1, 2, 3, 4, 5]

# Start with zero
total = 0

# Go through each number
for num in numbers:
    # Add this number to our total
    total = total + num

# Show the result
print("The sum is:", total)
""",
    
    "find the largest element in an array": """
# Find the biggest number in a list
# This shows how to find the largest number

# A list of numbers
numbers = [3, 7, 2, 9, 1, 5]

# Start by saying the first number is the biggest
biggest = numbers[0]

# Look at each number in the list
for num in numbers:
    # If this number is bigger than our current biggest
    if num > biggest:
        # Then this is our new biggest number
        biggest = num

# Show the result
print("The biggest number is:", biggest)
""",
    
    "check if a string is a palindrome": """
# Check if a word reads the same forwards and backwards
# Like "mom" or "dad"

# The word to check
word = "racecar"

# Make it lowercase so we don't get confused by capital letters
word = word.lower()

# Remove spaces
word = word.replace(" ", "")

# Make a backwards version
backwards = ""
for letter in word:
    # Add each letter to the front
    backwards = letter + backwards

# Check if they are the same
if word == backwards:
    print(word, "is a palindrome!")
else:
    print(word, "is not a palindrome.")
""",
    
    "implement a simple calculator": """
# Simple calculator
# This does basic math

# You can change these numbers to test different values
first_num = 10
second_num = 5

# You can change this to +, -, *, or /
operation = "+"

# Do the math
if operation == "+":
    result = first_num + second_num
    print(first_num, "+", second_num, "=", result)

elif operation == "-":
    result = first_num - second_num
    print(first_num, "-", second_num, "=", result)

elif operation == "*":
    result = first_num * second_num
    print(first_num, "*", second_num, "=", result)

elif operation == "/":
    # Check if we're dividing by zero
    if second_num != 0:
        result = first_num / second_num
        print(first_num, "/", second_num, "=", result)
    else:
        print("Error: Can't divide by zero!")

else:
    print("I don't know that operation!")
""",
    
    "sort a list of numbers": """
# Put numbers in order from smallest to biggest
# This arranges numbers from low to high

# A list of numbers in random order
numbers = [64, 34, 25, 12, 22, 11, 90]

# Show the original list
print("Original list:", numbers)

# Keep doing this until all numbers are in order
for i in range(len(numbers)):
    # Look at each pair of numbers
    for j in range(0, len(numbers) - 1):
        # If the first number is bigger than the second
        if numbers[j] > numbers[j + 1]:
            # Swap them around
            temp = numbers[j]
            numbers[j] = numbers[j + 1]
            numbers[j + 1] = temp

# Show the sorted list
print("Sorted list:", numbers)
""",
    
    "count vowels in a string": """
# Count how many vowels (a, e, i, o, u) are in a word
# This counts the special letters

# The text to check
text = "Hello World! How are you?"

# The vowels we're looking for
vowels = "aeiouAEIOU"

# Start counting at zero
count = 0

# Look at each letter in the text
for letter in text:
    # If this letter is a vowel
    if letter in vowels:
        # Add one to our count
        count = count + 1

# Show the result
print("Text:", text)
print("Number of vowels:", count)
"""
}

# Simple explanations for absolute beginners
BEGINNER_EXPLANATIONS = {
    "check input num is odd or even": """
This program checks if a number is odd or even:

1. We pick a number to test (you can change it!)
2. We use the % symbol to find the remainder when dividing by 2
3. If the remainder is 0, the number is even (like 4, 6, 8)
4. If the remainder is 1, the number is odd (like 3, 5, 7)
5. We print whether the number is odd or even

Think of it like sharing cookies:
- If you can split them evenly between 2 people, it's even
- If there's one left over, it's odd
""",
    
    "calculate the sum of numbers in a list": """
This program adds up all numbers in a list:

1. We start with a list of numbers
2. We start our total at zero
3. We go through each number one by one
4. We add each number to our running total
5. We print the final total

It's like counting money in your pocket - you start with $0 and add each coin or bill.
""",
    
    "find the largest element in an array": """
This program finds the biggest number in a list:

1. We start with a list of numbers
2. We assume the first number is the biggest
3. We look at each number in the list
4. If we find a bigger number, we update our "biggest" number
5. We print the biggest number we found

It's like finding the tallest person in a group - you compare each person to the tallest one you've seen so far.
""",
    
    "check if a string is a palindrome": """
This program checks if a word reads the same forwards and backwards:

1. We start with a word to test
2. We make it lowercase so 'A' and 'a' are treated the same
3. We remove any spaces
4. We create a backwards version by reversing the letters
5. We check if the original word is the same as the backwards version
6. We print whether it's a palindrome or not

Examples: "mom", "dad", "racecar" are palindromes.
""",
    
    "implement a simple calculator": """
This program works like a simple calculator:

1. We start with two numbers and an operation (+, -, *, /)
2. We check which operation to do using if statements
3. For each operation, we do the math and show the result
4. For division, we check if we're trying to divide by zero (not allowed!)
5. We print the answer

It's just like using a calculator, but we wrote the instructions ourselves!
""",
    
    "sort a list of numbers": """
This program puts numbers in order from smallest to biggest:

1. We start with a list of numbers in random order
2. We use a method that compares pairs of numbers
3. We go through the list multiple times
4. Each time, we compare adjacent numbers
5. If they're in the wrong order, we swap them
6. We keep doing this until all numbers are in the right order
7. We print the sorted list

Think of it like sorting cards in your hand - you compare two cards and swap them if they're in the wrong order.
""",
    
    "count vowels in a string": """
This program counts how many vowels are in a word or sentence:

1. We start with some text to check
2. We define what letters count as vowels (a, e, i, o, u)
3. We start our count at zero
4. We look at each letter in the text one by one
5. If a letter is a vowel, we add one to our count
6. We print how many vowels we found

It's like counting specific items in a collection - you go through each item and keep a tally.
"""
}

def call_huggingface_api(model, input_text):
    """Call Hugging Face Inference API"""
    headers = {
        "Authorization": f"Bearer {HF_TOKEN}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "inputs": input_text,
        "parameters": {
            "max_new_tokens": 500,
            "return_full_text": False
        }
    }
    
    try:
        response = requests.post(
            f"{HF_API_URL}/{model}",
            headers=headers,
            json=payload,
            timeout=30  # Add timeout to prevent hanging
        )
        
        if response.status_code == 403:
            # Handle permission error specifically
            error_msg = response.json().get("error", "Permission denied")
            raise Exception(f"API permission error: {error_msg}")
        elif response.status_code == 429:
            # Handle rate limiting
            raise Exception("Rate limit exceeded. Please try again later.")
        elif response.status_code != 200:
            raise Exception(f"API request failed with status {response.status_code}: {response.text}")
        
        result = response.json()
        return result[0]["generated_text"]
    except requests.exceptions.Timeout:
        raise Exception("API request timed out. Please try again.")
    except requests.exceptions.RequestException as e:
        raise Exception(f"Network error: {str(e)}")
    except json.JSONDecodeError:
        raise Exception(f"Invalid API response: {response.text}")
    except KeyError:
        raise Exception(f"Unexpected API response format: {response.text}")

def generate_code_with_templates(prompt):
    """Generate simple code using local templates as fallback"""
    prompt_lower = prompt.lower().strip()
    
    # Check for exact matches in our templates
    for key, code in BEGINNER_TEMPLATES.items():
        if key in prompt_lower:
            return code.strip()
    
    # Special handling for odd/even check requests
    if "odd" in prompt_lower and "even" in prompt_lower:
        return BEGINNER_TEMPLATES["check input num is odd or even"].strip()
    
    # If no exact match, find the most similar template
    best_match = None
    best_similarity = 0
    
    for key in BEGINNER_TEMPLATES.keys():
        # Simple similarity check based on common words
        key_words = set(key.split())
        prompt_words = set(prompt_lower.split())
        similarity = len(key_words.intersection(prompt_words)) / len(key_words.union(prompt_words))
        
        if similarity > best_similarity:
            best_similarity = similarity
            best_match = key
    
    # If we found a somewhat similar template, use it
    if best_similarity > 0.3 and best_match:
        return BEGINNER_TEMPLATES[best_match].strip()
    
    # Default fallback - generate a simple template
    return f"""
# {prompt}
# This is a simple program to do what you asked

# Add your code here
print("This program does: {prompt}")
"""

def generate_code(prompt, use_backup=False, use_local=False):
    """Generate Python code using AI models or local templates"""
    # If explicitly using local templates
    if use_local:
        return generate_code_with_templates(prompt)
    
    try:
        if use_backup:
            # Use DeepSeek as backup
            model = DEEPSEEK_MODEL
        else:
            # Use StarCoder as primary
            model = STARCODER_MODEL
            
        code_prompt = f"# Simple Python code for beginners: {prompt}\n# Code without functions, very simple, works in web environments (no input() functions):"
        generated_code = call_huggingface_api(model, code_prompt)
        
        # Clean the code
        cleaned_code = generated_code.replace("```python", "").replace("```", "").strip()
        
        # Remove any input() functions since they don't work in web environment
        lines = cleaned_code.split('\n')
        filtered_lines = []
        for line in lines:
            # Skip lines with input() function
            if 'input(' not in line:
                filtered_lines.append(line)
            else:
                # Replace input lines with simple variable assignments
                if 'first_num' in line or 'first' in line.lower():
                    filtered_lines.append('# You can change this number to test different values')
                    filtered_lines.append('first_num = 10')
                elif 'second_num' in line or 'second' in line.lower():
                    filtered_lines.append('second_num = 5')
                elif 'num' in line or 'number' in line.lower():
                    filtered_lines.append('# You can change this number to test different values')
                    filtered_lines.append('num = 7')
                elif 'operation' in line:
                    filtered_lines.append('# You can change this to +, -, *, or /')
                    filtered_lines.append('operation = "+"')
                elif 'word' in line or 'text' in line.lower() or 'string' in line.lower():
                    filtered_lines.append('# You can change this word to test different values')
                    filtered_lines.append('word = "racecar"')
                else:
                    # For other input lines, just add a comment
                    filtered_lines.append('# ' + line.strip())
        
        return '\n'.join(filtered_lines)
    except Exception as e:
        # If we haven't tried the backup model yet, try it
        if not use_backup and not use_local:
            try:
                return generate_code(prompt, use_backup=True, use_local=False)
            except:
                # If backup also fails, use local templates
                return generate_code(prompt, use_backup=False, use_local=True)
        else:
            # If we've already tried everything, use local templates
            return generate_code_with_templates(prompt)

def explain_code_with_templates(code):
    """Generate simple explanation using local templates"""
    # Try to match the code with our explanations
    for key, explanation in BEGINNER_EXPLANATIONS.items():
        if key.replace(" ", "_") in code.lower() or key in code.lower():
            return explanation.strip()
    
    # Special handling for odd/even
    if "odd" in code.lower() and "even" in code.lower():
        return BEGINNER_EXPLANATIONS["check input num is odd or even"].strip()
    
    # Generic explanation
    return "This program shows how to solve the problem step by step. Read through the comments to see exactly what each part does! It uses simple steps that are easy to understand."

def explain_code(code):
    """Explain the generated code using Mistral or local templates"""
    if not code:
        return "No code to explain"
    
    try:
        explanation_prompt = f"Explain the following Python code in very simple terms for a complete beginner. Use analogies and avoid technical jargon:\n\n{code}\n\nSimple explanation:"
        explanation = call_huggingface_api(MISTRAL_MODEL, explanation_prompt)
        return explanation
    except Exception as e:
        # Fallback to local template explanation
        return explain_code_with_templates(code)

def run_code(code):
    """Run Python code using Piston API"""
    if not code:
        return "No code to run"
    
    try:
        # Using Piston API for code execution
        piston_url = "https://emkc.org/api/v2/piston/execute"
        
        payload = {
            "language": "python",
            "version": "3.10.0",
            "files": [
                {
                    "content": code
                }
            ]
        }
        
        response = requests.post(piston_url, json=payload, timeout=30)
        
        if response.status_code != 200:
            return f"Execution error: {response.text}"
        
        result = response.json()
        
        if "run" in result and "stdout" in result["run"]:
            output = result["run"]["stdout"]
            if output:
                return output
            elif "stderr" in result["run"] and result["run"]["stderr"]:
                return f"Error: {result['run']['stderr']}"
            else:
                return "Code executed successfully (no output)"
        else:
            return "Execution completed"
            
    except Exception as e:
        return f"Error running code: {str(e)}"

def interactive_calculator(first_num, second_num, operation):
    """Interactive calculator that works with Gradio inputs"""
    # Generate code with the user's values
    code = f"""
# Interactive Calculator
# This calculator uses your input values

first_num = {first_num}
second_num = {second_num}
operation = "{operation}"

print("Calculator Result:")
print("==================")

# Do the math
if operation == "+":
    result = first_num + second_num
    print(first_num, "+", second_num, "=", result)

elif operation == "-":
    result = first_num - second_num
    print(first_num, "-", second_num, "=", result)

elif operation == "*":
    result = first_num * second_num
    print(first_num, "*", second_num, "=", result)

elif operation == "/":
    # Check if we're dividing by zero
    if second_num != 0:
        result = first_num / second_num
        print(first_num, "/", second_num, "=", result)
    else:
        print("Error: Can't divide by zero!")

else:
    print("I don't know that operation!")
"""
    
    return run_code(code)

def interactive_odd_even(num):
    """Interactive odd/even checker that works with Gradio inputs"""
    # Generate code with the user's value
    code = f"""
# Interactive Odd/Even Checker
# This checks if your number is odd or even

num = {num}

print("Odd/Even Checker Result:")
print("========================")

# Use the % symbol to find the remainder when dividing by 2
# If the remainder is 0, the number is even
# If the remainder is 1, the number is odd
if num % 2 == 0:
    print(num, "is even")
else:
    print(num, "is odd")
"""
    
    return run_code(code)

def simulate_input_functions(code, inputs):
    """Simulate input() functions by replacing them with predefined values"""
    import re
    
    # Create a copy of the input list to avoid modifying the original
    input_values = list(inputs) if inputs else []
    
    # Split code into lines for processing
    lines = code.split('\n')
    new_lines = []
    input_counter = 0
    
    for line in lines:
        # Check if this line contains an input() function
        if 'input(' in line and '=' in line:
            # Extract the variable name
            var_name = line.split('=')[0].strip()
            
            # Check if this is a numeric input (int or float)
            is_int = 'int(' in line.split('=')[1]
            is_float = 'float(' in line.split('=')[1]
            
            # Get the next input value or use a default
            if input_counter < len(input_values):
                input_value = input_values[input_counter]
                input_counter += 1
                
                # Format the value appropriately
                if is_int:
                    try:
                        input_value = str(int(input_value))
                    except:
                        input_value = '18'  # default integer
                elif is_float:
                    try:
                        input_value = str(float(input_value))
                    except:
                        input_value = '3.14'  # default float
                else:
                    # String input - wrap in quotes
                    if not (input_value.startswith('"') and input_value.endswith('"')) and not (input_value.startswith("\'") and input_value.endswith("\'")):
                        input_value = f'"{input_value}"'
            else:
                # Provide a default value based on the prompt
                if 'name' in line.lower():
                    input_value = '"Student"'
                elif 'age' in line.lower() or 'number' in line.lower() or is_int:
                    input_value = '18'
                elif is_float:
                    input_value = '3.14'
                else:
                    input_value = '"input"'
            
            # Replace the input() call with a direct assignment
            new_line = f"{var_name} = {input_value}  # Simulated input"
            new_lines.append(new_line)
        else:
            new_lines.append(line)
    
    return '\n'.join(new_lines)

def ai_code_tutor(prompt):
    """Main function that generates code, explains it, and runs it"""
    if not prompt.strip():
        return "Please enter a coding prompt", "", ""
    
    # Generate code (with fallback to local templates if API fails)
    generated_code = generate_code(prompt)
    
    # Explain code (with fallback to local templates if API fails)
    explanation = explain_code(generated_code)
    
    # Run code
    output = run_code(generated_code)
    
    return generated_code, explanation, output

def set_prompt(problem):
    """Set the prompt text"""
    return problem

def execute_user_code(user_code, user_inputs=None):
    """Execute user code with input simulation"""
    try:
        # Simulate input() functions by preprocessing the code
        if user_inputs is None:
            user_inputs = []
        
        # If the code contains input() functions, we need to simulate them
        if 'input(' in user_code:
            # Create a version of the code that simulates inputs
            simulated_code = simulate_input_functions(user_code, user_inputs)
        else:
            simulated_code = user_code
        
        # Using Piston API for code execution
        piston_url = "https://emkc.org/api/v2/piston/execute"
        
        payload = {
            "language": "python",
            "version": "3.10.0",
            "files": [
                {
                    "content": simulated_code
                }
            ]
        }
        
        response = requests.post(piston_url, json=payload, timeout=30)
        
        if response.status_code != 200:
            return f"Execution error: {response.text}"
        
        result = response.json()
        
        if "run" in result and "stdout" in result["run"]:
            output = result["run"]["stdout"]
            if output:
                return output
            elif "stderr" in result["run"] and result["run"]["stderr"]:
                return f"Error: {result['run']['stderr']}"
            else:
                return "Code executed successfully (no output)"
        else:
            return "Execution completed"
            
    except Exception as e:
        return f"Error running code: {str(e)}"

# Create Gradio interface
with gr.Blocks(theme=gr.themes.Soft(), title="Ai-Code Generator") as demo:
    gr.Markdown("""
    # 🏠 Python-Ghar (Home of Python Learning) 
    
    **Note:** All code is designed to be as simple as possible for absolute beginners.
    """)
    
    with gr.Tabs():
        with gr.TabItem("Ai-Code Generator"):
            with gr.Row():
                with gr.Column():
                    prompt = gr.Textbox(
                        label="What do you want to learn?",
                        placeholder="e.g., Check if a number is odd or even",
                        lines=3
                    )
                    generate_btn = gr.Button("Generate Simple Code")
                    
                    gr.Markdown("""
                    ### Easy Practice Problems
                    Click any problem to get started:
                    """)
                    
                    problems = [
                        "Check if a number is odd or even",
                        "Calculate the sum of numbers in a list",
                        "Find the largest element in an array",
                        "Check if a string is a palindrome",
                        "Implement a simple calculator",
                        "Sort a list of numbers",
                        "Count vowels in a string"
                    ]
                    
                    with gr.Row():
                        for i, problem in enumerate(problems):
                            def make_click_handler(p):
                                return lambda: p
                            
                            btn = gr.Button(problem, size="sm")
                            btn.click(
                                fn=make_click_handler(problem),
                                outputs=prompt
                            )
                
                with gr.Column():
                    code_output = gr.Code(
                        label="Simple Python Code (No Functions!)",
                        language="python",
                        interactive=True
                    )
                    explanation_output = gr.Textbox(
                        label="Easy Explanation",
                        lines=10,
                        interactive=False
                    )
                    run_btn = gr.Button("Run Code")
                    output = gr.Textbox(
                        label="What the Code Prints",
                        lines=5,
                        interactive=False
                    )
        
        with gr.TabItem("Learning Resources"):
            gr.Markdown("""
            # 🐍 Python Learning Resources
            
            ## Course Content
            """)
            
            gr.Markdown("""
            ### 1. Introduction to Python
            #### What is Python?
            Python is a simple and powerful programming language that's easy to learn and use.
            
            #### First program
            """)
            
            hello_code = '''print("Hello, World!")'''
            gr.Code(hello_code, language="python")
            
            gr.Markdown("""
            ### 2. Variables & Data Types
            #### Numbers, Strings, Booleans
            """)
            
            variables_code = '''name = "Krishala"
age = 17
is_student = True

print("My name is", name)
print("I am", age, "years old")
print("Student status:", is_student)'''
            gr.Code(variables_code, language="python")
            
            gr.Markdown("""
            ### 3. Input & Output
            #### Getting user input
            """)
            
            input_code = '''name = "Krishala"  # In web environment, we use direct assignment
print("Welcome,", name)'''
            gr.Code(input_code, language="python")
            
            gr.Markdown("""
            ### 4. Operators
            #### Arithmetic, Comparison, and Logical Operators
            """)
            
            operators_code = '''a = 10
b = 3
print("Sum:", a + b)
print("Power:", a ** b)
print("Is a greater than b?", a > b)'''
            gr.Code(operators_code, language="python")
            
            gr.Markdown("""
            ### 5. Conditional Statements
            #### if, elif, else
            """)
            
            conditional_code = '''marks = 85

if marks >= 90:
    print("Grade: A")
elif marks >= 75:
    print("Grade: B")
else:
    print("Grade: C")'''
            gr.Code(conditional_code, language="python")
            
            gr.Markdown("""
            ### 6. Loops
            #### for loop and while loop
            """)
            
            loops_code = '''# for loop
for i in range(1, 6):
    print("Number:", i)

print()  # Empty line

# while loop
count = 1
while count <= 5:
    print("Count:", count)
    count += 1'''
            gr.Code(loops_code, language="python")
            
            gr.Markdown("""
            ### 7. Functions
            #### Defining and using functions
            """)
            
            functions_code = '''def greet(name):
    print("Hello,", name)

greet("Krishala")'''
            gr.Code(functions_code, language="python")
            
            gr.Markdown("""
            ### 8. Lists
            #### Creating lists and accessing items
            """)
            
            lists_code = '''fruits = ["apple", "banana", "cherry"]
print(fruits[0])
fruits.append("orange")
print(fruits)'''
            gr.Code(lists_code, language="python")
            
            gr.Markdown("""
            ### 9. Tuples & Sets
            #### Tuple (immutable) and Set (unique items)
            """)
            
            tuples_sets_code = '''# Tuple
numbers = (1, 2, 3)
print(numbers)

# Set
colors = {"red", "green", "blue"}
colors.add("yellow")
print(colors)'''
            gr.Code(tuples_sets_code, language="python")
            
            gr.Markdown("""
            ### 10. Dictionaries
            #### Key-value pairs
            """)
            
            dictionaries_code = '''student = {"name": "Krishala", "age": 17, "grade": "A"}
print(student["name"])'''
            gr.Code(dictionaries_code, language="python")
            
            gr.Markdown("""
            ### 11. Loops with Lists & Dictionaries
            """)
            
            loops_advanced_code = '''# Loop with list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print("I like", fruit)

print()  # Empty line

# Loop with dictionary
student = {"name": "Krishala", "age": 17}
for key, value in student.items():
    print(key, ":", value)'''
            gr.Code(loops_advanced_code, language="python")
            
            gr.Markdown("""
            ### 12. Basic Problem Solving
            
            #### Factorial Program
            """)
            
            factorial_code = '''num = 5  # You can change this number
fact = 1
for i in range(1, num + 1):
    fact *= i
print("Factorial of", num, "is", fact)'''
            gr.Code(factorial_code, language="python")
            
            gr.Markdown("""
            #### Fibonacci Series
            """)
            
            fibonacci_code = '''n = 7  # You can change this number
a, b = 0, 1
print("Fibonacci Series:")
for i in range(n):
    print(a, end=" ")
    a, b = b, a + b'''
            gr.Code(fibonacci_code, language="python")
            
            gr.Markdown("""
            #### Palindrome Checker
            """)
            
            palindrome_code = '''word = "racecar"  # You can change this word
if word == word[::-1]:
    print(word, "is a palindrome")
else:
    print(word, "is not a palindrome")'''
            gr.Code(palindrome_code, language="python")
            
            gr.Markdown("""
            ### 13. Data Science Intro (Optional for Class 12)
            #### Using NumPy, Pandas, Matplotlib
            
            Note: These libraries require installation and may not work in this simple environment.
            In a full Python installation, you would use:
            
            ```python
            # NumPy array
            import numpy as np
            arr = np.array([1, 2, 3, 4, 5])
            print(arr.mean())
            
            # Pandas DataFrame
            import pandas as pd
            data = {"Name": ["Asha", "Bikash"], "Marks": [85, 92]}
            df = pd.DataFrame(data)
            print(df)
            
            # Matplotlib
            import matplotlib.pyplot as plt
            x = [1, 2, 3, 4, 5]
            y = [2, 4, 6, 8, 10]
            plt.plot(x, y)
            plt.xlabel("X Axis")
            plt.ylabel("Y Axis")
            plt.title("Simple Graph")
            plt.show()
            ```
            """)
            
            gr.Markdown("""
            ## Simple Python Programs for Beginners
            
            Here are some simple Python programs that demonstrate basic programming concepts.
            You can copy these examples to the "Code Playground" tab to run and modify them.
            """)
            
            # Simple programs for beginners
            beginner_programs = [
                ("Hello World", '''# Print a simple message
print("Hello, World!")
print("Welcome to Python programming!")'''),
                
                ("Variables and Data Types", '''# Working with different data types
name = "Alice"
age = 15
height = 5.5
is_student = True

print("Name:", name)
print("Age:", age)
print("Height:", height, "feet")
print("Is student:", is_student)'''),
                
                ("Basic Calculator", '''# Simple calculator with predefined values
num1 = 10
num2 = 5

print("Number 1:", num1)
print("Number 2:", num2)
print("Addition:", num1 + num2)
print("Subtraction:", num1 - num2)
print("Multiplication:", num1 * num2)
print("Division:", num1 / num2)'''),
                
                ("Odd or Even Checker", '''# Check if a number is odd or even
number = 7

if number % 2 == 0:
    print(number, "is even")
else:
    print(number, "is odd")'''),
                
                ("Simple Loop", '''# Print numbers from 1 to 5
print("Counting from 1 to 5:")
for i in range(1, 6):
    print(i)
    
print("Done counting!")'''),
                
                ("List Example", '''# Working with lists
fruits = ["apple", "banana", "orange", "grape"]

print("My favorite fruits:")
for fruit in fruits:
    print("-", fruit)

print("I like", len(fruits), "fruits!")'''),
                
                ("Simple Function", '''# Define and use a simple function
def greet_person(name):
    return "Hello, " + name + "!"

# Use the function
message = greet_person("Bob")
print(message)
print(greet_person("Alice"))''')
            ]
            
            # Display each program with a copy button
            for title, code in beginner_programs:
                gr.Markdown(f"### {title}")
                gr.Code(code, language="python")
                gr.Markdown("---")
            
            gr.Markdown("""
            ### 💡 How to Use These Examples
            1. Browse through the examples above to learn different Python concepts
            2. Copy any example to the "Code Playground" tab to run it
            3. Modify the code to experiment with different values
            4. Try combining concepts from different examples
            
            Remember: All these examples use simple code without complex functions to make them easy to understand!
            """)
        
        with gr.TabItem("Code Playground"):
            gr.Markdown("""
            # 🧪 Code Playground (Jupyter Notebook Style)
            Practice Python coding with interactive input support!
            
            Type your Python code below and click "Run Code" to execute it.
            You can use input() functions to get user input.
            """)
            
            with gr.Row():
                with gr.Column():
                    user_code = gr.Code(
                        label="Your Python Code",
                        language="python",
                        value='''# Jupyter Notebook Style Python Practice
# Example with input() functions:
name = input("Enter your name: ")
print(f"Hello, {name}!")

# Example with numeric input:
num = int(input("Enter a number: "))
print(f"Square of {num} is {num**2}")''',
                        lines=15
                    )
                    
                    gr.Markdown("### Simulate Inputs (optional)")
                    gr.Markdown("Enter values to simulate user inputs (one per line):")
                    user_inputs = gr.Textbox(
                        label="Input Values (one per line)",
                        lines=3,
                        placeholder="Enter\n18\nStudent"
                    )
                    
                    run_user_code_btn = gr.Button("▶️ Run Code")
                    clear_btn = gr.Button("🗑️ Clear Output")
                
                with gr.Column():
                    user_output = gr.Textbox(
                        label="Output",
                        lines=20,
                        interactive=False
                    )
            
            gr.Markdown("""
            ### 📝 Examples to Try
            
            **1. Simple Input Example:**
            ```python
            name = input("What is your name? ")
            print(f"Nice to meet you, {name}!")
            ```
            
            **2. Number Processing:**
            ```python
            num1 = int(input("Enter first number: "))
            num2 = int(input("Enter second number: "))
            print(f"{num1} + {num2} = {num1 + num2}")
            ```
            
            **3. Decision Making:**
            ```python
            age = int(input("How old are you? "))
            if age >= 18:
                print("You are an adult!")
            else:
                print("You are still a minor.")
            ```
            
            **Tip:** When using input() functions, you can simulate user inputs in the "Input Values" box above.
            Each line represents one input value in order.
            """)
    
    # Event handlers
    generate_btn.click(
        fn=ai_code_tutor,
        inputs=prompt,
        outputs=[code_output, explanation_output, output]
    )
    
    run_btn.click(
        fn=run_code,
        inputs=code_output,
        outputs=output
    )
    
    # User code execution handler with input simulation
    def run_user_code_wrapper(code, inputs):
        # Convert the multiline input text to a list
        input_list = [line.strip() for line in inputs.split('\n') if line.strip()] if inputs else []
        return execute_user_code(code, input_list)
    
    # Clear output handler
    def clear_output():
        return ""
    
    run_user_code_btn.click(
        fn=run_user_code_wrapper,
        inputs=[user_code, user_inputs],
        outputs=user_output
    )
    
    clear_btn.click(
        fn=clear_output,
        inputs=[],
        outputs=user_output
    )

if __name__ == "__main__":
    demo.launch(server_name="localhost", server_port=7863)