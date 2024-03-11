import TitleModule from './title'

export default function GETExamples() {
  return (
    <div>
      <TitleModule title='Examples de requêtes GET' />
      <TitleModule method={`get`} endpoint={`/api/issues/{project}`} small={true} />
      <TitleModule
        method={`get`}
        endpoint={`/api/issues/{project}?open=true&assigned_to=Joe`}
        small={true}
      />
    </div>
  )
}
