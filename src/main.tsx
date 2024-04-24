import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <main>
      <section className="flex items-center h-screen p-4 text-lg font-semibold text-center text-black md:hidden bg-gradient">
        <p>
          Stay Manager mobile version is under development, please use in devices with minimum
          viewport width of 768px or higher..
        </p>
      </section>
      <section className="hidden md:block">
        <App />
      </section>
    </main>
  </React.StrictMode>
);
