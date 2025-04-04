
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TonConnectUIProvider } from '@tonconnect/ui-react'

// Recommended manifest URL for TON Connect
const manifestUrl = 'https://raw.githubusercontent.com/ton-community/ton-connect-manifest/main/tonconnect-manifest.json'

createRoot(document.getElementById("root")!).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <App />
  </TonConnectUIProvider>
);
