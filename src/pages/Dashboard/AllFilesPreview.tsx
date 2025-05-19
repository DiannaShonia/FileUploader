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
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { useStore } from '@/store/store'
import { columns } from './AllFilesPreview.columns'
import type { FileData } from '@/types'
import AllFilesPreviewItem from './AllFilesPreviewItem'

const { Search } = Input

const AllFilesPreview: React.FC = () => {
  const allFiles = useStore((state) => state.allFiles)
  const setFilteredData = useStore((state) => state.setFilteredData)
  const filteredData = useStore((state) => state.filteredData)
  const mockFiles = useStore((state) => state.mockFiles)

  useEffect(() => {
    const updatedData = [...allFiles, ...mockFiles]
    setFilteredData(updatedData)
  }, [allFiles, mockFiles, setFilteredData])

  const handleSearch = (searchText: string) => {
    const filteredFiles = [...allFiles, ...mockFiles].filter((file) =>
      file
        ? Object.values(file).some((value) =>
            value?.toString().toLowerCase().includes(searchText.toLowerCase())
          )
        : false
    )
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
      row: (props: { [x: string]: string }) => {
        const rowKey = props['data-row-key']
        if (!rowKey) {
          return null
        }
        const rowData = filteredData.find((item) => item.id === rowKey)
        if (!rowData) {
          return null
        }
        return <AllFilesPreviewItem id={rowData.id} row={rowData} />
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
