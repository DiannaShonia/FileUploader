import { Table, Input } from 'antd'

import { columns } from './AllFilesPreview.constants'
import { useStore } from '../../store/store'
import { mockFiles } from '../../utils/mockFiles'

const { Search } = Input

const AllFilesPreview = () => {
  const files = useStore((state) => state.files)

  // const handleSearch = (value: any) => {}

  return (
    <div className="p-8">
      <Search
        placeholder="Search table"
        // onSearch={handleSearch}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16, width: 300 }}
        allowClear
      />

      <Table
        pagination={false}
        dataSource={[...files, ...mockFiles]}
        columns={columns}
        showSorterTooltip={{ target: 'sorter-icon' }}
        sticky
        scroll
      />
    </div>
  )
}

export default AllFilesPreview
