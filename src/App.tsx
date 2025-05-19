import { Suspense } from 'react'
import routes from '@/routes/routes'
import { useRoutes } from 'react-router-dom'
import Loading from '@/components/Loading/Loading'
import { ToastContainer } from 'react-toastify'

function App() {
  const routing = useRoutes(routes)
  return (
    <Suspense fallback={<Loading />}>
      {routing}
      <ToastContainer position="top-right" autoClose={3000} />
    </Suspense>
  )
}

export default App
