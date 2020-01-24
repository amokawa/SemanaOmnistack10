const { Router } = require('express');
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')
const routes = Router();

routes
    // DEVS Endpoint
    .get('/devs', DevController.index)
    .post('/devs', DevController.create)
    .get('/devs/:github_user', DevController.read)
    .put('/devs/:github_user', DevController.update)
    .delete('/devs/:github_user', DevController.delete)

    // SEARCH Endpoint
    .get('/search', SearchController.index);

module.exports = routes;