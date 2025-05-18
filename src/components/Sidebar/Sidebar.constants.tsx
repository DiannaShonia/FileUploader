import {
  ProjectOutlined,
  SettingOutlined,
  PieChartOutlined,
  FolderOpenOutlined,
  UserOutlined,
} from '@ant-design/icons'
import type { menuItem } from './Sidebar.types'

export const menuItems: menuItem[] = [
  {
    id: '1',
    title: 'Dashboard',
    icon: <ProjectOutlined style={{ fontSize: '20px', color: '#c5fcfc' }} />,
    link: '/',
  },
  {
    id: '2',
    title: 'Upload Files',
    icon: <FolderOpenOutlined style={{ fontSize: '20px', color: '#c5fcfc' }} />,
    link: '/upload',
  },
  {
    id: '3',
    title: 'Users',
    icon: <UserOutlined style={{ fontSize: '20px', color: '#c5fcfc' }} />,
    link: '/',
  },
  {
    id: '4',
    title: 'Analytics',
    icon: <PieChartOutlined style={{ fontSize: '20px', color: '#c5fcfc' }} />,
    link: '/',
  },
  {
    id: '5',
    title: 'Settings',
    icon: <SettingOutlined style={{ fontSize: '20px', color: '#c5fcfc' }} />,
    link: '/',
  },
]
