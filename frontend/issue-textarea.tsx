interface IssueTxtAreaProps {
  placeholder: string
  value: string
  updateValue: React.Dispatch<React.SetStateAction<string>>
}

export default function IssueTxtArea({ placeholder, value, updateValue }: IssueTxtAreaProps) {
  return (
    <textarea
      className='w-full mb-2 py-1 px-3 placeholder:text-[#3636369d] text-xs md:text-base text-center md:text-left bg-ligthColorAlt font-mono block rounded-sm'
      id=''
      cols={30}
      rows={5}
      placeholder={placeholder}
      value={value}
      onChange={e => updateValue(e.target.value)}
    ></textarea>
  )
}
