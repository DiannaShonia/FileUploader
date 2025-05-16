/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Input } from 'antd'
import { useEffect } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useStore } from '../../store/store'
import { mockFiles } from '../../utils/mockFiles'
import { columns } from './AllFilesPreview.constants'
import type { FileData } from '../../types'

const { Search } = Input

interface SortableRowProps {
  id: string
  row: FileData
}

const SortableRow: React.FC<SortableRowProps> = ({ id, row }) => {
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

const AllFilesPreview: React.FC = () => {
  const allFiles = useStore((state) => state.allFiles)
  const setFilteredData = useStore((state) => state.setFilteredData)
  const filteredData = useStore((state) => state.filteredData)

  useEffect(() => {
    const updatedData = [...allFiles, ...mockFiles]
    console.log('Updated filteredData:', updatedData)
    setFilteredData(updatedData)
  }, [allFiles, setFilteredData])

  const handleSearch = (searchText: string) => {
    const filteredFiles = [...allFiles, ...mockFiles].filter((file) =>
      file && typeof file === 'object'
        ? Object.values(file).some((value) =>
            value?.toString().toLowerCase().includes(searchText.toLowerCase())
          )
        : false
    )
    console.log('Filtered files:', filteredFiles)
    setFilteredData(filteredFiles)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = filteredData.findIndex((item) => item.id === active.id)
    const newIndex = filteredData.findIndex((item) => item.id === over.id)

    if (oldIndex !== -1 && newIndex !== -1) {
      const updatedData = arrayMove(filteredData, oldIndex, newIndex)
      setFilteredData(updatedData)
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  )

  const components = {
    body: {
      row: (props: any) => {
        console.log(props, '~~~~ here ~~~')

        const rowKey = props['data-row-key']
        if (!rowKey) {
          return null
        }
        const rowData = filteredData.find((item) => item.id === rowKey)
        if (!rowData) {
          return null
        }
        return <SortableRow id={rowData.id} row={rowData} />
      },
    },
  }

  return (
    <div className="p-8">
      <Search
        placeholder="Search table"
        onSearch={handleSearch}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16, width: 300 }}
        allowClear
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={filteredData.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <Table
            pagination={false}
            dataSource={filteredData}
            columns={columns}
            showSorterTooltip={{ target: 'sorter-icon' }}
            sticky
            components={components}
            rowKey={(record: FileData) => record.id}
          />
        </SortableContext>
      </DndContext>
    </div>
  )
}

export default AllFilesPreview
