const router = require('express').Router();
const { Post, User, Favorite } = require('../models')

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                through: Favorite,
                as: 'favorited_posts'
            }

        ]
    })
    .then(dbUserData => {
        // pass a single post object into the homepage template
        const user = dbUserData.map(user => user.get({ plain: true }));
        res.render('profile',{ 
          posts: user.post,
          pageType: 'favorite',
          loggedIn: req.session.loggedIn 
        });
      })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
});

module.exports = router;