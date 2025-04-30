import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ConfigProvider } from 'antd'
import { Global } from '@emotion/react'
import globalStyles from './styles/globalStyles.ts'
import { ModalProvider } from './contexts/ModalContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#4A7CFE',
        },
        components: {
          Button: {
            borderRadius: 8,
          },
          Typography: {
            titleMarginBottom: 0,
          },
        },
      }}
    >
      <Global styles={globalStyles} />
      <ModalProvider>
        <App />
      </ModalProvider>
    </ConfigProvider>
  </StrictMode>,
)
