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
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useStore } from '@/store/store'
import type { FileData } from '@/types'
import type { DragEndEvent } from '@dnd-kit/core'
import FilePreviewItem from './FilePreviewItem'

interface FilePreviewListProps {
  files: FileData[]
  setFiles: React.Dispatch<React.SetStateAction<FileData[]>>
}

const FilePreviewList = ({ files, setFiles }: FilePreviewListProps) => {
  const allFiles = useStore((state) => state.allFiles)
  const setAllFiles = useStore((state) => state.setAllFiles)

  const sensors = useSensors(useSensor(PointerSensor))

  const handleDeleteFile = (id: string) => {
    const updated = files.filter((file) => file.id !== id)
    setFiles(updated)
    setAllFiles(allFiles.filter((file) => file.id !== id))
  }

  const handleDragEnd = (event: DragEndEvent) => {
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
          {files.map((file) => (
            <FilePreviewItem
              key={file.id}
              file={file}
              onDelete={handleDeleteFile}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  )
}

export default FilePreviewList
