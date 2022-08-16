const homeRoutes = require('./home-routes.js')
const profileRoutes = require('./profile-routes.js')
const categoryRoutes = require('./category-routes.js')
const favoriteRoutes = require('./favorite-routes.js')
const contactRoutes = require('./contact-routes.js')
const apiRoutes = require('./api')
const router = require('express').Router();

router.use('/', homeRoutes)
router.use('/profiles', profileRoutes)
router.use('/categories', categoryRoutes)
router.use('/favorites', favoriteRoutes)
router.use('/contact', contactRoutes)
router.use('/api', apiRoutes);

module.exports = router;