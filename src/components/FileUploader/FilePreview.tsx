import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { DeleteOutlined, HolderOutlined } from '@ant-design/icons'
import { formatBytes } from '../../utils/helpers'
import { useStore } from '../../store/store'
// import Input from '../Input'

const SortableItem = ({ file, onDelete }) => {
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
      <div className="flex items-center w-full ">
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
      {/* <div className='w-10'>
        <Input id={file.id} />
      </div> */}
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

const FilePreview = ({ files, setFiles }) => {
  const allFiles = useStore((state) => state.allFiles)
  const setAllFiles = useStore((state) => state.setAllFiles)

  const sensors = useSensors(useSensor(PointerSensor))

  const handleDeleteFile = (id) => {
    const updated = files.filter((file) => file.id !== id)
    setFiles(updated)
    setAllFiles(allFiles.filter((file) => file.id !== id))
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = files.findIndex((file) => file.id === active.id)
      const newIndex = files.findIndex((file) => file.id === over?.id)
      const reordered = arrayMove(files, oldIndex, newIndex)
      setFiles(reordered)
      setAllFiles(reordered)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={files.map((file) => file.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="flex-col flex gap-y-3 pb-8 w-full h-full overflow-y-auto scroll-container mt-5">
          {files.map((file, index) => (
            <SortableItem
              key={file.id}
              file={file}
              index={index}
              onDelete={handleDeleteFile}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  )
}

export default FilePreview
