# Python Ghar - AI Code Tutor

An interactive learning platform for Python programming with AI-powered assistance.

## Features

- Interactive Python code editor with real-time execution
- AI-powered code explanations and tutoring
- Practice exercises and coding challenges
- User authentication and progress tracking

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Python Execution**: Pyodide (in-browser Python runtime)
- **AI Integration**: Hugging Face Transformers

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/python-ghar.git
   ```

2. Navigate to the project directory:
   ```bash
   cd python-ghar
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

To create a production build:
```bash
npm run build
```

The build files will be generated in the `dist/` directory.

### Deployment to GitHub Pages

1. Update the `base` property in `vite.config.js` to match your repository name:
   ```js
   export default defineConfig({
     base: '/your-repo-name/',
     // ... other config
   })
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

## Project Structure

```
src/
├── components/     # React components
├── assets/         # Static assets
├── App.jsx         # Main app component
└── main.jsx        # Entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.