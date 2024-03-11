import { useState } from 'react'
import ExButton from './button'
import TitleModule from './title'
import UserInput from './user-input'
import RequiredTxt from './required-txt'
import { IssueModuleProps } from './create-issue'
import { getRecaptchaToken } from '../../utils/reCaptcha'
import { BASE_URL } from '.'
import { DELETErequest } from '../../utils/requests'
import { showServerResponse } from './functions'

export default function DeleteIssue({ updateServerResponse }: IssueModuleProps) {
  const [issueId, setIssueId] = useState<string>('')

  async function handleDeleteIssue() {
    showServerResponse()
    const stuff = {
      _id: issueId,
      gRecaptchaResponse: await getRecaptchaToken(),
    }

    try {
      const url = `${BASE_URL}/api/issues/apitest`
      const response = await DELETErequest(url, stuff)

      updateServerResponse(JSON.stringify(response, null, 2))

      if (response.error) return

      setIssueId('')
    } catch (error) {
      updateServerResponse(`Une Erreur est survenue`)
    }
  }

  return (
    <div>
      <TitleModule title={'Supprimer'} method={'delete'} endpoint={'/api/issues/:project'} />
      <div className='flex flex-col md:flex-row items-center md:justify-between md:w-[21.5rem] lg:w-[20.5rem] xl:w-[17.5rem] 2xl:w-[22rem] my-2'>
        <UserInput placeholder={`_id *`} updateValue={setIssueId} value={issueId} />
        <ExButton execute={handleDeleteIssue} label={`Supprimer`} />
      </div>
      <RequiredTxt />
    </div>
  )
}
