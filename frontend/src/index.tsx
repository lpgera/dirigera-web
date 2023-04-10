import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Failed to find the root element')
}
const root = createRoot(rootElement)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

serviceWorkerRegistration.register()
