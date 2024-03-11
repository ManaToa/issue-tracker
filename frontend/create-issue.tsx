import { useState } from 'react'
import ExButton from './button'
import TitleModule from './title'
import UserInput from './user-input'
import IssueTxtArea from './issue-textarea'
import RequiredTxt from './required-txt'
import { getRecaptchaToken } from '../../utils/reCaptcha'
import { BASE_URL } from '.'
import { POSTrequest } from '../../utils/requests'
import { showServerResponse } from './functions'

export interface IssueModuleProps {
  updateServerResponse: React.Dispatch<React.SetStateAction<string>>
}

export default function CreateIssue({ updateServerResponse }: IssueModuleProps) {
  const [issueTitle, setIssueTitle] = useState<string>('')
  const [createdBy, setCreatedBy] = useState<string>('')
  const [assignedTo, setAssignedTo] = useState<string>('')
  const [issueStatus, setIssueStatus] = useState<string>('')
  const [issueText, setIssueText] = useState<string>('')

  async function handleCreateIssue() {
    showServerResponse()
    const stuff = {
      issue_title: issueTitle,
      issue_text: issueText,
      created_by: createdBy,
      assigned_to: assignedTo,
      status_text: issueStatus,
      gRecaptchaResponse: await getRecaptchaToken(),
    }

    try {
      const url = `${BASE_URL}/api/issues/apitest`
      const response = await POSTrequest(url, stuff)

      updateServerResponse(JSON.stringify(response, null, 2))
      showServerResponse()

      if (response.error) return

      setIssueTitle('')
      setCreatedBy('')
      setAssignedTo('')
      setIssueStatus('')
      setIssueText('')
    } catch (error) {
      updateServerResponse(`Une Erreur est survenue`)
    }
  }

  return (
    <div>
      <TitleModule title={'Soumettre'} method={'post'} endpoint={'/api/issues/:project'} />
      <div className='flex flex-wrap justify-between my-2'>
        <UserInput placeholder={`Titre *`} updateValue={setIssueTitle} value={issueTitle} />
        <UserInput placeholder={`Créé par *`} updateValue={setCreatedBy} value={createdBy} />
        <UserInput placeholder={`Destiné à`} updateValue={setAssignedTo} value={assignedTo} />
        <UserInput placeholder={`Statut`} updateValue={setIssueStatus} value={issueStatus} />
        <IssueTxtArea placeholder={`Description *`} updateValue={setIssueText} value={issueText} />
      </div>

      <RequiredTxt />
      <ExButton execute={handleCreateIssue} label={`Soumettre`} />
    </div>
  )
}
