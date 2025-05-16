/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatBytes, formatDate } from '../../utils/helpers'
import Input from '../../components/Input'
import Actions from '../Actions'
import { HolderOutlined } from '@ant-design/icons'
import type { FileData } from '../../types'

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
    render: (text: string) => <Input value={text} />,
  },
  {
    title: 'Action',
    dataIndex: 'Action',
    key: 'Action',
    render: (_: any, record: FileData) => <Actions data={record} />,
    align: 'center',
  },
]
