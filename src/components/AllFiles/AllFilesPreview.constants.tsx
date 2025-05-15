import { formatBytes, formatDate } from '../../utils/helpers'
import Input from '../../components/Input'

export const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
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
    // sorter: (a, b) => a.size - b.size,
  },
  {
    title: 'Last Modified',
    dataIndex: 'lastModified',
    key: 'lastModified',
    render: (text: number) => text && formatDate(text),
    // sorter: (a, b) => a.lastModified - b.lastModified,
  },
  {
    title: 'Alt Text',
    dataIndex: 'altText',
    key: 'altText',
    editable: true,
    render: (text: string) => <Input value={text} />,
  },
  {
    title: 'Action',
    dataIndex: 'altText',
    key: 'altText',
  },
]
