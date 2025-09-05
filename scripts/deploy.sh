#!/bin/bash

# Deployment script for Python Ghar to GitHub Pages

echo "Building Python Ghar application..."
npm run build

if [ $? -eq 0 ]; then
    echo "Build successful!"
    echo "Deploying to GitHub Pages..."
    npm run deploy
else
    echo "Build failed! Please check the errors above."
    exit 1
fi