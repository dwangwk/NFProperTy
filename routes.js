const routes = require('next-routes')();

routes
.add('/listings/new', '/listings/new')
.add('/listings/:address', '/listings/show')
.add('/listings/:address/manager', '/listings/manager/index')

module.exports = routes;