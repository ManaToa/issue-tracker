import { useEffect, useState } from 'react'
import { initRecaptcha } from '../../utils/reCaptcha'
import BoxContainer from './box-container'
import ServerResponse from './server-response'

import CreateIssue from './create-issue'
import DeleteIssue from './delete-issue'
import GETExamples from './get-example'
import UpdateIssue from './update-issue'

export const BASE_URL = `/issue-tracker`

export default function IssueTracker() {
  const [serverResult, setServerResult] = useState<string>('')

  useEffect(() => {
    initRecaptcha()
  }, [])

  return (
    <div className='w-[13.5rem] md:w-[33rem] xl:w-[29rem] 2xl:w-[35rem]'>
      <BoxContainer children={<CreateIssue updateServerResponse={setServerResult} />} />
      <BoxContainer children={<UpdateIssue updateServerResponse={setServerResult} />} />
      <BoxContainer children={<DeleteIssue updateServerResponse={setServerResult} />} />
      <BoxContainer children={<ServerResponse response={serverResult} />} />
      <BoxContainer children={<GETExamples />} />
    </div>
  )
}
