import { CheckCircleOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useStore } from '@/store/store'

interface InputProps {
  value?: string
  id: string
  backgroundColor?: string
}

const Input = ({ value, id, backgroundColor }: InputProps) => {
  const [altText, setAltText] = useState(value || '')
  const [isFocused, setIsFocused] = useState(false)

  const allFiles = useStore((state) => state.allFiles)
  const setAllFiles = useStore((state) => state.setAllFiles)
  const mockFiles = useStore((state) => state.mockFiles)
  const setMockFiles = useStore((state) => state.setMockFiles)

  const editAltText = () => {
    setAllFiles(
      allFiles.map((file) => (file.id === id ? { ...file, altText } : file))
    )
    setMockFiles(
      mockFiles.map((file) => (file.id === id ? { ...file, altText } : file))
    )
    setIsFocused(false)
  }

  return (
    <div className="flex items-center w-full text-Primary">
      <input
        className={`${!isFocused && altText ? 'bg-none' : backgroundColor || 'bg-CardBg'} focus:outline-none p-2 rounded`}
        type="text"
        placeholder="Add alt text"
        value={altText}
        onChange={(e) => setAltText(e.target.value)}
        onFocus={() => setIsFocused(true)}
      />
      <button
        className="ml-3 z-10 cursor-pointer bg-CardBgLight"
        onClick={editAltText}
      >
        {!altText || isFocused ? (
          <CheckCircleOutlined style={{ color: '#c5fcfc' }} />
        ) : null}
      </button>
    </div>
  )
}

export default Input
