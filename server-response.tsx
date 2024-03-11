import TitleModule from './title'

interface ServerResponseProps {
  response: string
}

export default function ServerResponse({ response }: ServerResponseProps) {
  return (
    <div className='mt-4' id='server-result'>
      <TitleModule title='Réponse du serveur' />
      <div className='min-h-[6rem] bg-ligthColorHover p-2 rounded-sm text-xs md:text-base font-mono'>
        <pre className='overflow-x-scroll'>{response}</pre>
      </div>
    </div>
  )
}
