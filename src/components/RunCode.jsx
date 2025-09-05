import React, { useState, useEffect } from 'react';

const RunCode = () => {
  const [code, setCode] = useState('# Welcome to AI Code Tutor!\n# Write your Python code here\n\nprint("Hello, World!")');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [pyodide, setPyodide] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load Pyodide
  useEffect(() => {
    const loadPyodide = async () => {
      try {
        // Dynamically import Pyodide
        const { loadPyodide } = await import('pyodide/pyodide.mjs');
        
        setOutput('Loading Python runtime...\n');
        
        const pyodideInstance = await loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/"
        });
        
        setPyodide(pyodideInstance);
        setIsLoading(false);
        setOutput('Python runtime loaded successfully!\nYou can now run Python code.');
      } catch (error) {
        console.error('Failed to load Pyodide:', error);
        setOutput(`Failed to load Python runtime: ${error.message}`);
        setIsLoading(false);
      }
    };

    loadPyodide();
  }, []);

  const runCode = async () => {
    if (!code.trim()) {
      alert('Please enter some code to run');
      return;
    }

    if (!pyodide) {
      setOutput('Python runtime is not loaded yet. Please wait.');
      return;
    }

    setIsRunning(true);
    setOutput('Running code...\n');

    try {
      // Capture Python stdout
      let outputBuffer = '';
      pyodide.setStdout({ write: (buffer) => {
        outputBuffer += buffer;
        return buffer.length;
      }});

      // Run the code
      await pyodide.runPythonAsync(code);
      
      setOutput(outputBuffer || 'Code executed successfully!\nNo output was produced.');
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const clearOutput = () => {
    setOutput('');
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <h1 className="text-3xl font-bold mb-2">Code Runner</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Write and execute Python code directly in your browser</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        <div className="flex flex-col">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow flex-1 flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold">Python Code Editor</h2>
              <div>
                <button
                  onClick={runCode}
                  disabled={isRunning || isLoading}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition mr-2 flex items-center"
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
                <button
                  onClick={clearOutput}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm transition"
                >
                  Clear Output
                </button>
              </div>
            </div>
            <div className="flex-1 p-4">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500 mb-4"></div>
                    <p>Loading Python runtime...</p>
                    <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
                  </div>
                </div>
              ) : (
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-full p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Enter your Python code here..."
                />
              )}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col">
          <div className="bg-gray-800 rounded-xl shadow flex-1 flex flex-col">
            <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Output</h2>
            </div>
            <div className="flex-1 p-4">
              <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">
                {output || 'Output will appear here after running code.'}
              </pre>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">How to Use</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li>Write your Python code in the editor on the left</li>
          <li>Click "Run Code" to execute your program</li>
          <li>View the output in the console on the right</li>
          <li>All code runs locally in your browser - no server needed!</li>
        </ul>
      </div>
    </div>
  );
};

export default RunCode;