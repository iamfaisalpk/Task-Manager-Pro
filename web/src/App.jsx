import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { Provider, useDispatch } from 'react-redux'
import { store } from './redux/store'
import router from './routes/router'
import ErrorBoundary from './components/ErrorBoundary'
import { initializeAuth } from './redux/slices/authSlice'

const AppContent = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAuth())
  }, [dispatch])

  return <RouterProvider router={router} />
}

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </ErrorBoundary>
  )
}

export default App
