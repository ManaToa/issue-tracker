interface BoxContainerProps {
  children: JSX.Element
}

export default function BoxContainer({ children }: BoxContainerProps) {
  return <div className='bg-lightColor shadow-xl p-6 rounded-md mb-5'>{children}</div>
}
