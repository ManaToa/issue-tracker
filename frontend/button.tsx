interface ExButtonProps {
  execute: () => void
  label: string
}

export default function ExButton({ execute, label }: ExButtonProps) {
  return (
    <button
      className='bg-darkColor text-lightColor p-1 font-bold uppercase hover:bg-mainColor w-full md:w-auto px-3 mb-2'
      onClick={() => execute()}
    >
      {label}
    </button>
  )
}
