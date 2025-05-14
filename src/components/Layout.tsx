import type { ReactNode } from 'react'
import Sidebar from './Sidebar'
interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-background h-screen  flex flex-col">
      <div className="flex h-full p-6">
        <Sidebar />
        <main className="  flex flex-1 flex-col overflow-auto h-full  w-11/12 m-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
