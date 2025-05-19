import { formatBytes, formatDate } from '@/utils/helpers'
import Input from '@/components/Input/Input'
import Actions from '@/pages/Dashboard/Actions'
import { HolderOutlined } from '@ant-design/icons'
import type { FileData } from '@/types'

export const columns: any = [
  {
    title: '',
    key: 'dragHandle',
    width: 50,
    render: () => <HolderOutlined style={{ cursor: 'grab', color: '#999' }} />,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (_: string, data: FileData) => (
      <div className="flex items-center">
        {data.source ? (
          <img
            className="object-cover w-16 h-11 object-top rounded-lg mr-2"
            src={data.source}
            alt=""
          />
        ) : null}
        <p className="truncate w-28">{data.name}</p>
      </div>
    ),
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Size',
    dataIndex: 'size',
    key: 'size',
    render: (text: number) => text && formatBytes(text),
    sorter: (a: { size: number }, b: { size: number }) => a.size - b.size,
  },
  {
    title: 'Last Modified',
    dataIndex: 'lastModified',
    key: 'lastModified',
    render: (text: number) => text && formatDate(text),
    sorter: (a: { lastModified: number }, b: { lastModified: number }) =>
      a.lastModified - b.lastModified,
  },
  {
    title: 'Alt Text',
    dataIndex: 'altText',
    key: 'altText',
    editable: true,
    render: (text: string, record: FileData) => (
      <Input value={text} id={record.id} />
    ),
  },
  {
    title: 'Action',
    dataIndex: 'Action',
    key: 'Action',
    render: (_: never, record: FileData) => <Actions record={record} />,
    align: 'center',
  },
]
