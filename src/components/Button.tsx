import { motion } from 'motion/react'

const Button = () => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      className="text-Primary border border-Primary py-2 px-5 rounded-3xl text-sm"
    >
      Upload Files
    </motion.button>
  )
}

export default Button
