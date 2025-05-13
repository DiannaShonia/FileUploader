import type { ReactNode } from 'react'
import Logo from '../assets/logo.svg'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-background h-screen  px-12 flex flex-col">
      <header className="h-min w-full p-6">
        <div className="">
          <img className="w-32" src={Logo} alt="" />
        </div>
      </header>
      <main className="  flex flex-1 flex-col overflow-auto h-full  w-11/12 m-auto">
        {children}
      </main>
      <footer className="w-full h-16  rounded-b-2xl flex flex-col justify-center ">
        <div className="flex justify-center items-center h-6">
          <p className="text-Primary text-xs">© 2025 File Manager</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
