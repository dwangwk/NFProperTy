const routes = require('next-routes')();

routes
.add('/listings/new', '/listings/new')
.add('/listings/:address', '/listings/show');

module.exports = routes;