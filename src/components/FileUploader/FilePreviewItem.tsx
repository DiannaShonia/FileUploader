import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { DeleteOutlined, HolderOutlined } from '@ant-design/icons'
import { formatBytes } from '@/utils/helpers'
import Input from '@/components/Input/Input'
import type { FileData } from '@/types'

interface FilePreviewItemProps {
  file: FileData
  onDelete: (id: string) => void
}

const FilePreviewItem = ({ file, onDelete }: FilePreviewItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: file.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="bg-CardBgLight flex gap-x-10 justify-between items-center p-3  rounded-lg relative w-full shadow-lg"
    >
      <div className="flex items-center w-max ">
        <div
          {...listeners}
          {...attributes}
          className={`${isDragging ? 'cursor-grabbing' : 'cursor-grab'} cursor-grab text-Primary-06 pr-3 flex items-center`}
        >
          <HolderOutlined />
        </div>
        {file.source && (
          <div className="mr-3 flex items-center relative">
            <img
              className="object-cover w-16 h-11 object-top rounded-lg"
              src={file.source}
            />
          </div>
        )}
        <div className="flex flex-col justify-between w-2/4">
          <p className="truncate text-sm text-Primary">{file.name}</p>
          <p className="text-Primary-06 text-xs">{formatBytes(file.size)}</p>
        </div>
      </div>
      <div className="w-min">
        <Input id={file.id} backgroundColor="bg-Bg" />
      </div>
      <div className="flex gap-x-2 items-center">
        <button
          onClick={() => onDelete(file.id)}
          className="bg-Error rounded-full w-8 h-8 cursor-pointer flex justify-center items-center"
        >
          <DeleteOutlined style={{ color: '#fff' }} />
        </button>
      </div>
    </li>
  )
}

export default FilePreviewItem
