import { HeartOutlined, DeleteOutlined } from '@ant-design/icons'
import { useStore } from '../store/store'
import type { FileData } from '../types'
import { mockData } from '../utils/mockFiles'

interface ActionsProps {
  data: FileData
}

const Actions = ({ data }: ActionsProps) => {
  const allFiles = useStore((state) => state.allFiles)
  const setAllFiles = useStore((state) => state.setAllFiles)
  const mockFiles = useStore((state) => state.mockFiles)
  const setMockFiles = useStore((state) => state.setMockFiles)

  const handleDeleteFile = () => {
    if (Number(data.id) > mockData.length) {
      setAllFiles(allFiles.filter((file) => file.id !== data.id))
    } else {
      setMockFiles(mockFiles.filter((file) => file.id !== data.id))
    }
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
