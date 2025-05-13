
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set favicon dynamically
const favicon = document.createElement('link');
favicon.rel = 'icon';
favicon.href = '/logo.png';
document.head.appendChild(favicon);

// Set page title
document.title = 'Rabbit Hole Analytics';

createRoot(document.getElementById("root")!).render(<App />);
