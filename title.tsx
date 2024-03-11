interface TitleModuleProps {
  title?: string
  method?: string
  endpoint?: string
  small?: boolean
}

export default function TitleModule({ title, method, endpoint, small }: TitleModuleProps) {
  return (
    <div className='flex items-center mb-2 flex-col md:flex-row md:justify-start'>
      {title && (
        <h3 className={`font-bold ${small ? 'text-xs' : 'uppercase text-xs md:text-lg mb-1'}`}>
          {title}
        </h3>
      )}
      {method && endpoint && (
        <div
          className={`${
            title && 'md:ml-4'
          } py-1 px-2 bg-ligthColorHover rounded-md font-mono flex flex-col md:flex-row
            ${
              small
                ? 'text-xs md:text-sm items-center w-full px-1 md:w-auto md:px-0'
                : ' text-xs md:text-base'
            }`}
        >
          <span className='font-bold text-mainColor uppercase mr-1'>{method}</span>
          <span>{endpoint}</span>
        </div>
      )}
    </div>
  )
}
