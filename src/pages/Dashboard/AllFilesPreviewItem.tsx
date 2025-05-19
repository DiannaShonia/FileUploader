import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { columns } from '@/pages/Dashboard/AllFilesPreview.columns'
import type { FileData } from '@/types'

interface AllFilesPreviewItemProps {
  id: string
  row: FileData
}

const AllFilesPreviewItem: React.FC<AllFilesPreviewItemProps> = ({
  id,
  row,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <tr ref={setNodeRef} style={style} {...attributes}>
      {columns.map((column: any, index: any) => {
        const value = column.dataIndex
          ? (row as any)[column.dataIndex]
          : undefined
        return (
          <td key={column.key || index}>
            {index === 0 ? (
              <div {...listeners} style={{ cursor: 'grab' }}>
                {column.render?.(undefined, row, index)}
              </div>
            ) : (
              <>
                {column.render
                  ? column.render(value, row, index)
                  : value !== undefined
                    ? value
                    : 'N/A'}
              </>
            )}
          </td>
        )
      })}
    </tr>
  )
}

export default AllFilesPreviewItem
