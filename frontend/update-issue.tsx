import { useState } from 'react'
import ExButton from './button'
import TitleModule from './title'
import UserInput from './user-input'
import IssueTxtArea from './issue-textarea'
import RequiredTxt from './required-txt'
import { IssueModuleProps } from './create-issue'
import { PUTrequest } from '../../utils/requests'
import { BASE_URL } from '.'
import { getRecaptchaToken } from '../../utils/reCaptcha'
import { showServerResponse } from './functions'

export default function UpdateIssue({ updateServerResponse }: IssueModuleProps) {
  const [issueId, setIssueId] = useState<string>('')
  const [issueTitle, setIssueTitle] = useState<string>('')
  const [createdBy, setCreatedBy] = useState<string>('')
  const [assignedTo, setAssignedTo] = useState<string>('')
  const [issueStatus, setIssueStatus] = useState<string>('')
  const [issueText, setIssueText] = useState<string>('')

  async function handleUpdateIssue() {
    showServerResponse()
    const stuff = {
      _id: issueId,
      issue_title: issueTitle,
      issue_text: issueText,
      created_by: createdBy,
      assigned_to: assignedTo,
      status_text: issueStatus,
      gRecaptchaResponse: await getRecaptchaToken(),
    }

    try {
      const url = `${BASE_URL}/api/issues/apitest`
      const response = await PUTrequest(url, stuff)

      updateServerResponse(JSON.stringify(response, null, 2))

      if (response.error) return

      setIssueId('')
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
      <TitleModule title={'Actualiser'} method={'put'} endpoint={'/api/issues/:project'} />
      <div className='flex flex-wrap justify-between my-2'>
        <UserInput placeholder={`_id *`} updateValue={setIssueId} value={issueId} />
        <UserInput placeholder={`Titre *`} updateValue={setIssueTitle} value={issueTitle} />
        <UserInput placeholder={`Créé par *`} updateValue={setCreatedBy} value={createdBy} />
        <UserInput placeholder={`Destiné à`} updateValue={setAssignedTo} value={assignedTo} />
        <UserInput placeholder={`Statut`} updateValue={setIssueStatus} value={issueStatus} />
        <IssueTxtArea placeholder={`Description *`} updateValue={setIssueText} value={issueText} />
      </div>
      <RequiredTxt />
      <ExButton execute={handleUpdateIssue} label={`Mettre à jour`} />
    </div>
  )
}
