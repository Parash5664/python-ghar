#!/usr/bin/env python3
"""
Launcher script for Python Ghar Gradio App
"""

import os
import subprocess
import sys
import webbrowser
import time

def check_python():
    """Check if Python is installed"""
    try:
        subprocess.run([sys.executable, "--version"], check=True, capture_output=True)
        return True
    except subprocess.CalledProcessError:
        return False

def install_requirements():
    """Install required packages"""
    try:
        subprocess.run([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"], check=True)
        print("✅ Requirements installed successfully")
        return True
    except subprocess.CalledProcessError:
        print("❌ Failed to install requirements")
        return False

def launch_gradio():
    """Launch the Gradio app"""
    try:
        print("🚀 Launching Gradio app...")
        print("📝 Please make sure you have set your Hugging Face token:")
        print("   export HF_TOKEN=your_token_here")
        print("")
        
        # Open browser after a short delay
        def open_browser():
            time.sleep(3)
            webbrowser.open("http://localhost:7863")
            print("🌐 Opening browser at http://localhost:7863")
        
        # Start browser opener in background
        import threading
        browser_thread = threading.Thread(target=open_browser)
        browser_thread.daemon = True
        browser_thread.start()
        
        # Launch the app
        subprocess.run([sys.executable, "gradio_app.py"], check=True)
        
    except subprocess.CalledProcessError:
        print("❌ Failed to launch Gradio app")
        return False
    except KeyboardInterrupt:
        print("\n👋 Shutting down...")
        return True

def main():
    print("🐍 Python Ghar - Gradio App Launcher")
    print("=" * 40)
    
    # Check Python
    if not check_python():
        print("❌ Python not found. Please install Python 3.7+")
        return
    
    # Check if requirements.txt exists
    if not os.path.exists("requirements.txt"):
        print("❌ requirements.txt not found")
        return
    
    # Install requirements
    print("📦 Installing requirements...")
    if not install_requirements():
        return
    
    # Launch app
    launch_gradio()

if __name__ == "__main__":
    main()