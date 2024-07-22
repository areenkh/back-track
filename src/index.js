import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import App from './components/App';
import './styles/styles.css';

const container = document.getElementById('root'); // Get the container element
const root = createRoot(container); // Create a root

root.render(<App />);