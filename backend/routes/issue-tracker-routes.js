const db = require('../controllers/database/db-issue-tracker')
const captcha = require('../controllers/reCaptcha')

const checkInput = (input) => /^[\w\s.-]*$/i.test(input)

module.exports = function (app) {
  app
    .route('/issue-tracker/api/issues/:project')

    .get(function (req, res) {
      const project = req.params.project
      db.getAllIssues(
        Object.assign({}, req.query, { project: project }),
        (err, issues) => {
          err ? console.error(err) : res.json(issues)
        }
      )
    })

    .post(async function (req, res) {
      const isNotBot = await captcha.verify(req.body)
      if (!isNotBot.success)
        return res.json({
          error: `Désolé, nous n'avons pas pu vérifier que vous n'êtes pas un robot. Veuillez réessayer.`,
        })

      const project = req.params.project

      if (
        !checkInput(req.body.issue_title) ||
        !checkInput(req.body.issue_text) ||
        !checkInput(req.body.created_by) ||
        !checkInput(req.body.assigned_to) ||
        !checkInput(req.body.status_text) ||
        !checkInput(project)
      )
        return res.json({
          error: `Entrée Invalide, certains caractères ne sont pas autorisés.`,
        })

      db.createIssue(
        Object.assign({}, req.body, { project: project }),
        (err, issue) => {
          if (err) return res.json(err)
          res.json(issue)
        }
      )
    })

    .put(async function (req, res) {
      const isNotBot = await captcha.verify(req.body)
      if (!isNotBot.success)
        return res.json({
          error: `Désolé, nous n'avons pas pu vérifier que vous n'êtes pas un robot. Veuillez réessayer.`,
        })

      const id = req.body._id
      if (id === '' || id === undefined)
        return res.json({ error: 'missing _id' })

      if (
        !checkInput(req.body.issue_title) ||
        !checkInput(req.body.issue_text) ||
        !checkInput(req.body.created_by) ||
        !checkInput(req.body.assigned_to) ||
        !checkInput(req.body.status_text) ||
        !checkInput(id)
      )
        return res.json({
          error: `Entrée Invalide, certains caractères ne sont pas autorisés.`,
        })

      const data = Object.fromEntries(
        Object.entries(req.body).filter(
          ([key, value]) => value !== '' && key !== '_id'
        )
      )
      db.updateIssue(id, data, (err, issue) => {
        err
          ? res.json(err)
          : res.json({ result: 'successfully updated', _id: issue._id })
      })
    })

    .delete(async function (req, res) {
      const isNotBot = await captcha.verify(req.body)
      if (!isNotBot.success)
        return res.json({
          error: `Désolé, nous n'avons pas pu vérifier que vous n'êtes pas un robot. Veuillez réessayer.`,
        })

      if (req.body._id === '' || req.body._id === undefined)
        return res.json({ error: 'missing _id' })
      db.deleteIssue(req.body._id, (err, issue) => {
        err
          ? res.json(err)
          : res.json({
              result: 'successfully deleted',
              _id: req.body._id,
            })
      })
    })
}
