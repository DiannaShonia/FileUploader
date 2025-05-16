import { HeartOutlined, DeleteOutlined } from '@ant-design/icons'
import { useStore } from '../store/store'
import type { FileData } from '../types'

interface ActionsProps {
  data: FileData
}

const Actions = ({ data }: ActionsProps) => {
  const filteredData = useStore((state) => state.filteredData)
  const setFilteredData = useStore((state) => state.setFilteredData)

  const handleDeleteFile = () => {
    setFilteredData(filteredData.filter((file) => file.id !== data.id))
  }

  return (
    <div className="flex items-center justify-center">
      <button
        className="bg-CardBgLight font-bold py-2 px-3 rounded  h-9 w-9 flex justify-center 
      items-center  box-border"
      >
        <HeartOutlined style={{ color: '#c5fcfc' }} />
      </button>
      <button
        onClick={handleDeleteFile}
        className="bg-ErrorDark hover:bg-Error cursor-pointer font-bold py-2 px-3 rounded ml-2"
      >
        <DeleteOutlined />
      </button>
    </div>
  )
}

export default Actions
