module.exports = {
  port: 3001,
  host: 'localhost',
  watch: true,
  routes: {
    '/api/*': '/$1'
  },
  middlewares: [
    require('cors')({
      origin: ['http://localhost:4200', 'http://localhost:4000', 'http://localhost:3000'],
      credentials: true
    })
  ]
}; 