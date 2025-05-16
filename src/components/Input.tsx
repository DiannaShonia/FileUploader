import { CheckCircleOutlined } from '@ant-design/icons'
import { useState } from 'react'

interface InputProps {
  value: string
}

const Input = ({ value }: InputProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)

  return (
    <div className="flex items-center w-full">
      <input
        className={`${!isFocused && value ? 'bg-none' : 'bg-CardBgLight'} focus:outline-none p-2 rounded`}
        type="text"
        placeholder="Add alt text"
        defaultValue={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <div className="ml-3 bg-CardBgLight">
        {!value || isFocused ? (
          <CheckCircleOutlined style={{ color: '#c5fcfc' }} />
        ) : null}
      </div>
    </div>
  )
}

export default Input
