#!/usr/bin/env python3
"""
Launcher script for Python Ghar Gradio App
"""

import os
import subprocess
import sys
import webbrowser
import time
import socket

def get_ip_address():
    """Get the local IP address"""
    try:
        # Connect to a remote server to determine local IP
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect(("8.8.8.8", 80))
            ip = s.getsockname()[0]
        return ip
    except Exception:
        # Fallback to localhost
        return "localhost"

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
        # Get IP address
        ip = get_ip_address()
        port = 7860
        
        print("🚀 Launching Gradio app...")
        print("📝 Please make sure you have set your Hugging Face token:")
        print("   export HF_TOKEN=your_token_here")
        print("")
        print(f"🌐 Access the app at:")
        print(f"   Local: http://localhost:{port}")
        print(f"   Network: http://{ip}:{port}")
        print("")
        print("💡 To access from other devices on your network, use the Network URL above")
        print("")
        
        # Open browser to localhost after a short delay
        def open_browser():
            time.sleep(3)
            webbrowser.open(f"http://localhost:{port}")
            print("📂 Browser opened to local address")
        
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