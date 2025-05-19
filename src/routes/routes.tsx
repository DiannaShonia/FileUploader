import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const Dashboard = lazy(() => import('@/pages/Dashboard/Dashboard'))
const UploadFiles = lazy(() => import('@/pages/UploadFiles/UploadFiles'))
const Layout = lazy(() => import('@/Layout/Layout'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'upload', element: <UploadFiles /> },
    ],
  },
]

export default routes
