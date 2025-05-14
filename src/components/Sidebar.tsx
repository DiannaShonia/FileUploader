import Logo from '../assets/Logo.svg'

const Sidebar = () => {
  return (
    <aside className="w-2/12 flex flex-col h-full rounded-2xl mr-3 bg-CardBg">
      <div className="">
        <img className="w-32 py-4 ml-6" src={Logo} alt="" />
      </div>
      <div className="flex flex-col justify-center items-center h-16" />
    </aside>
  )
}

export default Sidebar
