import React, { useState } from 'react';

const Practice = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [hfToken, setHfToken] = useState('');

  // Function to call Hugging Face API
  const callHuggingFaceAPI = async (model, input) => {
    if (!hfToken) {
      throw new Error('Please enter your Hugging Face API token');
    }

    const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${hfToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: input,
        parameters: {
          max_new_tokens: 500,
          return_full_text: false
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data[0].generated_text;
  };

  // Generate code using AI
  const generateCode = async () => {
    if (!prompt.trim()) {
      alert('Please enter a prompt');
      return;
    }

    if (!hfToken) {
      alert('Please enter your Hugging Face API token');
      return;
    }

    setIsGenerating(true);
    setGeneratedCode('');
    setExplanation('');
    setOutput('');

    try {
      // Try StarCoder2-3B first
      let code;
      try {
        code = await callHuggingFaceAPI(
          'bigcode/starcoder2-3b',
          `# Python solution for: ${prompt}\n# Code:`
        );
      } catch (error) {
        console.log('StarCoder2 failed, trying DeepSeek-Coder as backup');
        // Fallback to DeepSeek-Coder
        code = await callHuggingFaceAPI(
          'deepseek-ai/deepseek-coder-1.3b-base',
          `# Python solution for: ${prompt}\n# Code:`
        );
      }

      // Clean the code
      const cleanedCode = code.replace(/```python/g, '').replace(/```/g, '').trim();
      setGeneratedCode(cleanedCode);

      // Get explanation using Mistral
      const explanationPrompt = `Explain the following Python code in simple terms for a high school student:\n\n${cleanedCode}\n\nExplanation:`;
      const explanationText = await callHuggingFaceAPI(
        'mistralai/Mistral-7B-Instruct-v0.2',
        explanationPrompt
      );

      setExplanation(explanationText);
    } catch (error) {
      console.error('Error generating code:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  // Run code using Pyodide
  const runCode = async () => {
    if (!generatedCode) {
      alert('Please generate code first');
      return;
    }

    setIsRunning(true);
    setOutput('Loading Python runtime...\n');

    try {
      // Dynamically import Pyodide
      const { loadPyodide } = await import('pyodide/pyodide.mjs');
      
      setOutput('Initializing Python environment...\n');
      
      const pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/"
      });
      
      setOutput('Running your code...\n');
      
      // Capture Python stdout
      let outputBuffer = '';
      pyodide.setStdout({ write: (buffer) => {
        outputBuffer += buffer;
        return buffer.length;
      }});

      // Run the code
      await pyodide.runPythonAsync(generatedCode);
      
      setOutput(outputBuffer || 'Code executed successfully!\nNo output was produced.');
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-2">AI Practice Assistant</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Describe what you want to code, and our AI will help you</p>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Hugging Face API Token</h2>
        <div className="mb-4">
          <input
            type="password"
            value={hfToken}
            onChange={(e) => setHfToken(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="Enter your Hugging Face API token"
          />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Get your token from{' '}
          <a 
            href="https://huggingface.co/settings/tokens" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sky-500 hover:text-sky-600"
          >
            Hugging Face settings
          </a>
        </p>
        
        <h2 className="text-xl font-bold mb-4">Describe Your Coding Task</h2>
        <div className="mb-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="e.g., Create a function that calculates the factorial of a number"
          />
        </div>
        <button
          onClick={generateCode}
          disabled={isGenerating}
          className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg transition flex items-center"
        >
          {isGenerating ? (
            <>
              <span className="mr-2">🔄</span> Generating...
            </>
          ) : (
            <>
              <span className="mr-2">⚡</span> Generate Code with AI
            </>
          )}
        </button>
      </div>
      
      {generatedCode && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold">Generated Code</h2>
              <button
                onClick={runCode}
                disabled={isRunning}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition flex items-center"
              >
                {isRunning ? (
                  <>
                    <span className="mr-2">🔄</span> Running...
                  </>
                ) : (
                  <>
                    <span className="mr-2">▶️</span> Run Code
                  </>
                )}
              </button>
            </div>
            <div className="p-4">
              <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto">
                <code>{generatedCode}</code>
              </pre>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold">AI Explanation</h2>
            </div>
            <div className="p-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <p className="whitespace-pre-wrap">{explanation}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {output && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold">Execution Output</h2>
          </div>
          <div className="p-4">
            <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto">
              <code>{output}</code>
            </pre>
          </div>
        </div>
      )}
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">Practice Problems</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            'Calculate the sum of numbers in a list',
            'Find the largest element in an array',
            'Check if a string is a palindrome',
            'Implement a simple calculator',
            'Sort a list of numbers',
            'Count vowels in a string'
          ].map((problem, index) => (
            <div 
              key={index} 
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
              onClick={() => setPrompt(problem)}
            >
              <h3 className="font-medium">{problem}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Practice;