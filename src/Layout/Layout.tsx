import Sidebar from '../components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="bg-background h-screen  flex flex-col">
      <div className="flex h-full p-6">
        <Sidebar />
        <main className="  flex flex-1 flex-col  h-full  w-11/12 m-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
