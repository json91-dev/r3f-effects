import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import '@src/global.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename={'/'}>
    <Suspense>
      <App />
    </Suspense>
  </BrowserRouter>
)
