import { AuthProvider } from '@redwoodjs/auth'
import netlifyIdentity from 'netlify-identity-widget'
import ReactDOM from 'react-dom'
import { RedwoodProvider, FatalErrorBoundary } from '@redwoodjs/web'
import FatalErrorPage from 'src/pages/FatalErrorPage'
import { IdentityContextProvider } from 'react-netlify-identity'

import Routes from 'src/Routes'

import './scaffold.css'
import './index.css'

netlifyIdentity.init()

ReactDOM.render(
  <FatalErrorBoundary page={FatalErrorPage}>
    <IdentityContextProvider url="https://hardcore-galileo-35ef53.netlify.app">
      <AuthProvider client={netlifyIdentity} type="netlify">
        <RedwoodProvider>
          <Routes />
        </RedwoodProvider>
      </AuthProvider>
    </IdentityContextProvider>
  </FatalErrorBoundary>,
  document.getElementById('redwood-app')
)
