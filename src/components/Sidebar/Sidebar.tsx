import Logo from '../../assets/Logo.svg'
import { Link } from 'react-router-dom'
import { menuItems } from './Sidebar.constants'

const Sidebar = () => {
  return (
    <aside className="w-2/12 flex flex-col h-full rounded-2xl mr-3 py-8 px-8 bg-CardBg">
      <div className="border-b border-Line pb-8">
        <img className="w-32 " src={Logo} alt="" />
      </div>
      <ul className="flex flex-col justify-center mt-12 gap-5">
        {menuItems.map((item) => (
          <li className=" text-Primary-09  rounded p-2" key={item.id}>
            <Link className="flex items-center" to={item.link}>
              <div className="mr-2">{item.icon}</div>
              <p className="text-sm">{item.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
