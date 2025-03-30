# SQL Query Simulator

## Overview

SQL Query Simulator is an intuitive web-based tool designed to help users simulate SQL queries and visualize their results. It provides an interactive platform for learning and testing SQL queries without requiring a database setup. By leveraging AI-based models, the tool enhances query handling and result interpretation, making it an excellent resource for both beginners and advanced users.

## Tech Stack

- **Frontend Framework**: React.js (v19.0.0) for building a dynamic and responsive user interface.
- **Build Tool**: Vite for lightning-fast development and optimized production builds.

## Key Dependencies

- `@huggingface/inference`: AI-powered inference models for advanced query processing.
- `@xenova/transformers`: Transformer models for natural language and text processing.
- `axios`: Simplified HTTP client for seamless API communication.
- `csv-parser`: Efficient parsing of CSV data for analysis.
- `jspdf` & `jspdf-autotable`: Generating professional PDF reports from query results.
- `onnxruntime-node`: Running ONNX models for AI-driven SQL execution.
- `openai`: AI assistance for intelligent query interpretation.
- `xlsx`: Handling Excel files for data import/export.

## Performance Insights

The application has been optimized for speed and efficiency:

- **Initial Load Time**: Approximately 1.2 seconds (measured using Chrome DevTools).
- **Lighthouse Performance Score**: 90+ for a smooth user experience.

## Performance Optimizations

- **Code Splitting**: Dynamic imports to minimize the initial bundle size.
- **Vite Features**: Leveraged fast module bundling and Hot Module Replacement (HMR) for rapid development.
- **Lazy Loading**: Deferred loading of heavy dependencies like `onnxruntime-node` to improve load times.
- **Asset Optimization**: Enabled tree-shaking and gzip compression to reduce file sizes.
- **State Management**: Utilized React hooks effectively to minimize unnecessary re-renders.

## Getting Started

Follow these steps to set up and run the project:

### Installation

Install the required dependencies:

```sh
npm install
```

### Run Development Server

Start the development server:

```sh
npm run dev
```

### Build for Production

Create an optimized production build:

```sh
npm run build
```

### Preview Production Build

Preview the production build locally:

```sh
npm run preview
```

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests to improve the project.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
