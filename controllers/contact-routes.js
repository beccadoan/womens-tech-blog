const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('contact-us')
})

module.exports = router;