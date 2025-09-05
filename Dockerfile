FROM python:3.9-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY gradio_app.py .

# Expose the port Gradio will use
EXPOSE 7860

# Set environment variable for Hugging Face token
# This will be set in the Hugging Face Spaces settings
ENV HF_TOKEN=""

# Run the application
CMD ["python", "gradio_app.py"]