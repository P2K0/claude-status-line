import * as React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from '@/hooks/useConfig.tsx'
import App from '@/views/Home/Home'
import '@/styles/global.css'
import '@/i18n/i18n'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)
