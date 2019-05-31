const express = require("express");
const server = express();
server.use(express.json());

const actionModel = require('./data/helpers/actionModel');
const projectModel = require("./data/helpers/projectModel");

/************* CRUD for Actions ********************/
server.get('/actions/', (req, res) => {
  actionModel.get()
    .then(action => { res.status(200).json(action) })
})

server.get('/actions/:id', (req, res) => {
  actionModel.get(req.params.id)
    .then(action => res.status(200).json(action))
    .catch(err => res.status(500).json({ success: false, err }))
})

server.post('/actions/', (req, res) => {
  actionModel.insert({ ...req.body, project_id: req.params.id })
    .then(action => res.status(200).json(action))
    .catch(err => res.status(500).json({ success: false, err }));
});

server.put('/actions/:id', (req, res) => {
  actionModel.update(req.params.id, req.body)
    .then(action => res.status(200).json(action))
    .catch(err => res.status(500).json({ success: false, err }));
});

server.delete('/actions/:id', (req, res) => {
  actionModel.remove(req.params.id)
    .then(action => res.status(204).json({ success: true }))
    .catch(err => res.status(500).json({ success: false, err }));
});

/************* CRUD for Projects ********************/

server.get('/projects', (req, res) => {
  projectModel.get()
    .then(project => { res.status(200).json(project) })
})

server.get('/projects/:id', (req, res) => {
  projectModel.get(req.params.id)
    .then(project => res.status(200).json(project))
    .catch(err => res.status(500).json({ success: false, err }))
})

server.post('/actions/', (req, res) => {
  projectModel.insert(req.body)
    .then(project => res.status(200).json(project))
    .catch(err => res.status(500).json({ success: false, err }));
});

server.put('/actions/:id', (req, res) => {
  projectModel.update(req.params.id, req.body)
    .then(project => res.status(200).json(project))
    .catch(err => res.status(500).json({ success: false, err }));
});

server.delete('/actions/:id', (req, res) => {
  projectModel.remove(req.params.id)
    .then(action => res.status(204).json({ success: true }))
    .catch(err => res.status(500).json({ success: false, err }));
});

server.get('/projects/:id/actions', (req, res) => {
  projectModel.getProjectActions({ ...req.body, project_id: req.params.id })
    .then(project => res.status(200).json(project))
    .catch(err => res.status(500).json({ success: false, err }))
})


/************* Server Listen ********************/

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Hellluurrrr from ${port}`);
});
