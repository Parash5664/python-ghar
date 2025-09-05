// src/App.jsx

import React from 'react';
import './App.css'; // Ensure you have an App.css for custom styles

const App = () => {
  return (
    <div className="app-container">
      <header>
        <img src="/logo.png" alt="Logo" className="logo" /> {/* Add your logo */}
        <h1>Python-Ghar (Home of Python Learning)</h1>
        <p>Note: All code is designed to be as simple as possible for absolute beginners.</p>
      </header>

      <nav>
        <ul>
          <li><a href="#code-generator">Ai-Code Generator</a></li>
          <li><a href="#learning-resources">Learning Resources</a></li>
          <li><a href="#code-playground" className="active">Code Playground</a></li>
        </ul>
      </nav>

      <main>
        <section id="code-playground">
          <h2>Code Playground (Jupyter Notebook Style)</h2>
          <p>Practice Python coding with interactive input support!</p>
          <p>Type your Python code below and click "Run Code" to execute it. You can use input() functions to get user input.</p>

          <div className="code-playground">
            <div className="code-editor">
              <textarea defaultValue={`
# Jupyter Notebook Style Python Practice
# Example with input() functions:
name = input('Enter your name: ')
print(f"Hello, {name}!")

# Example with numeric input:
num = int(input("Enter a number: "))
print(f"Square of {num} is {num**2}")
              `}></textarea>
              <button>Run Code</button>
            </div>

            <div className="output">
              <pre></pre>
            </div>

            <div className="simulate-inputs">
              <h3>Simulate Inputs (optional)</h3>
              <p>Enter values to simulate user inputs (one per line):</p>
              <textarea placeholder="Input Values (one per line)"></textarea>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;