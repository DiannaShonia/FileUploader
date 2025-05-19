import { DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { useStore } from '@/store/store'
import type { FileData } from '@/types'

interface ActionsProps {
  record: FileData
}

const Actions = ({ record }: ActionsProps) => {
  const allFiles = useStore((state) => state.allFiles)
  const setAllFiles = useStore((state) => state.setAllFiles)
  const mockFiles = useStore((state) => state.mockFiles)
  const setMockFiles = useStore((state) => state.setMockFiles)

  const handleDeleteFile = () => {
    setAllFiles(allFiles.filter((file) => file.id !== record.id))
    setMockFiles(mockFiles.filter((file) => file.id !== record.id))
  }

  return (
    <div className="flex items-center gap-2 justify-end">
      {record.type.includes('image') && (
        <button
          className="cursor-pointer bg-CardBgLight font-bold py-2 px-3 rounded  h-9 w-9 flex justify-center 
      items-center  box-border"
        >
          <EyeOutlined style={{ color: '#c5fcfc' }} />
        </button>
      )}
      <button
        onClick={handleDeleteFile}
        className="bg-ErrorDark hover:bg-Error cursor-pointer font-bold py-2 px-3 rounded "
      >
        <DeleteOutlined />
      </button>
    </div>
  )
}

export default Actions
