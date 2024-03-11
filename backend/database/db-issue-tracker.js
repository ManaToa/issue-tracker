require('dotenv').config()
const mongoose = require('mongoose')

//mongoose.set('useFindAndModify', false)

mongoose.connect(process.env.MANGO_URI)

const issueSchema = new mongoose.Schema({
  issue_title: { type: String, required: true },
  issue_text: { type: String, required: true },
  created_on: { type: Date, required: true },
  updated_on: { type: Date, required: true },
  created_by: { type: String, required: true },
  assigned_to: { type: String },
  open: { type: Boolean, required: true },
  status_text: { type: String },
  project: { type: String, required: true },
})

const Issue = mongoose.model('Issue', issueSchema)

const createIssue = (data, done) => {
  const issue = new Issue(
    Object.assign({}, data, {
      assigned_to: data.assigned_to || '',
      status_text: data.status_text || '',
      created_on: new Date(),
      updated_on: new Date(),
      open: true,
    })
  )
  issue
    .save()
    .then((data) => done(null, data.toObject()))
    .catch((err) => done({ error: 'required field(s) missing' }, err))
}

const updateIssue = (id, data, done) => {
  if (Object.keys(data).length === 0)
    return done({ error: 'no update field(s) sent', _id: id }, null)
  Issue.findOneAndUpdate(
    { _id: id },
    Object.assign({}, data, { updated_on: new Date() })
  )
    .then((doc) => {
      if (doc === null) return done({ error: 'could not update', _id: id }, err)
      return done(null, doc)
    })
    .catch((err) => done({ error: 'could not update', _id: id }, err))
}

const deleteIssue = (id, done) => {
  Issue.deleteOne({ _id: id })
    .then((doc) => {
      if (doc && doc.deletedCount === 0)
        return done({ error: 'could not delete', _id: id }, err)
      return done(null, doc)
    })
    .catch((err) => done({ error: 'could not delete', _id: id }, err))
}

const getAllIssues = (filter, done) => {
  Issue.find(filter)
    .then((issues) => done(null, issues))
    .catch((err) => console.error(err))
}

module.exports = {
  createIssue: createIssue,
  updateIssue: updateIssue,
  deleteIssue: deleteIssue,
  getAllIssues: getAllIssues,
}
