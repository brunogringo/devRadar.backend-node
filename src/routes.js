const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

// Query Params: request.query  (filtros, ordenação, paginação, ...)
// Route Params: request.params (Identificar um recurso ou alteração ou remoção)
// Body:         request.body   (Dados para criação ou alteração de um registro)

routes.get('/devs', DevController.index);
routes.get('/devs/:id', DevController.show);
routes.post('/devs', DevController.store);
routes.put('/devs', DevController.update);
routes.delete('/devs/:id', DevController.destroy );

routes.get('/search', SearchController.index);

module.exports = routes;