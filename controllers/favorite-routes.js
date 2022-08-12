const router = require('express').Router();
const { Post, User, Favorite, Category } = require('../models')

router.get('/', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.session.user_id
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
          header: 'Your favorite posts',
          loggedIn: req.session.loggedIn 
        });
      })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
});

module.exports = router;