import { Suspense } from 'react'
import routes from './routes/routes'
import { useRoutes } from 'react-router-dom'
import Loading from './components/Loading/Loading'

function App() {
  const routing = useRoutes(routes)
  return <Suspense fallback={<Loading />}>{routing}</Suspense>
}

export default App
