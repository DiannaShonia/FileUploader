import { motion } from 'motion/react'

const Button = () => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      //   onHoverStart
      className="text-Primary border border-Primary py-2  px-4 rounded-3xl  hover:shadow-[0_4px_10px_rgba(0,0,255,0.3)] transition-shadow"
    >
      Upload Files
    </motion.button>
  )
}

export default Button
