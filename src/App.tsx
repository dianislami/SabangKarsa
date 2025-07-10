import { ThemeProvider } from "./components/theme-provider"
import { LoginPage } from "./pages/auth/LoginPage"
import { RegisterPage } from "./pages/auth/RegisterPage"

function App() {
  // Simple routing based on URL pathname
  const currentPath = window.location.pathname

  const renderPage = () => {
    switch (currentPath) {
      case '/register':
        return <RegisterPage />
      case '/login':
        return <LoginPage />
      default:
        return <LoginPage />
    }
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      {renderPage()}
    </ThemeProvider>
  )
}

export default App