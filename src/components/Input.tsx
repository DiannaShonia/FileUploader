interface InputProps {
  value: string
}

const Input = ({ value }: InputProps) => {
  return (
    <div>
      <input
        className="focus:outline-none"
        type="text"
        placeholder="Add alt text"
        value={value}
      />
    </div>
  )
}

export default Input
