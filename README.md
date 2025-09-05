---
title: Python Ghar - AI Code Tutor
emoji: 🐍
colorFrom: blue
colorTo: purple
sdk: docker
pinned: false
license: mit
---

# Python Ghar - AI Code Tutor

An educational platform designed to help users learn Python programming interactively with AI assistance.

## Features

- AI-powered code generation using StarCoder2 and DeepSeek models
- Natural language explanations with Mistral-7B
- Interactive code execution environment
- Learning modules for Python concepts
- Practice problems with guided solutions

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Parash5664/python-ghar.git
   cd python-ghar
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the Gradio app:
   ```bash
   python gradio_app.py
   ```

4. Open your browser to http://localhost:7863

## Hugging Face API Tokens

To use the AI features, you'll need Hugging Face API tokens:

1. Sign up at [huggingface.co](https://huggingface.co/join)
2. Get your API token from [Settings → Access Tokens](https://huggingface.co/settings/tokens)
3. Set the token as an environment variable:
   ```bash
   export HF_TOKEN=your_token_here
   ```

The app uses these models:
- **StarCoder2-3B**: Primary code generation
- **DeepSeek-Coder-1.3B**: Backup code generation
- **Mistral-7B-Instruct-v0.2**: Code explanations

## Project Structure

- `gradio_app.py`: Main Gradio application
- `requirements.txt`: Python dependencies
- `src/`: React frontend (deployed to GitHub Pages)
- `public/`: Static assets for the frontend

## Deployment

- **Frontend**: Deployed to [GitHub Pages](https://parash5664.github.io/python-ghar/)
- **Gradio App**: Can be deployed to Hugging Face Spaces

## License

This project is licensed under the MIT License.