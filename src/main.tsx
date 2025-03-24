
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById('root')!).render(
   <>
   <BrowserRouter>
       <AuthProvider>
          <GoogleOAuthProvider clientId={googleClientId}  >
            <Toaster position='top-center' richColors/>
            <App />
         </GoogleOAuthProvider>
       </AuthProvider> 
   </BrowserRouter>
   
   </>  
)
