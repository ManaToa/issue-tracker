interface UserInputProps {
  placeholder: string
  value: string
  updateValue: React.Dispatch<React.SetStateAction<string>>
}

export default function UserInput({ placeholder, value, updateValue }: UserInputProps) {
  return (
    <input
      type='text'
      className='mb-2 py-1 px-3 placeholder:text-[#3636369d] text-xs md:text-base text-center md:text-left bg-ligthColorAlt font-mono w-[10.5rem] md:w-[14rem] xl:w-[12rem] 2xl:w-[14rem] block rounded-sm'
      placeholder={placeholder}
      value={value}
      onChange={e => updateValue(e.target.value)}
    />
  )
}
