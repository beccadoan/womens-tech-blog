const router = require('express').Router();
const { Post, User, Favorite, Comment } = require('../models')

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
                as: 'favorite_posts',
                attributes: ['title', 'id', 'body', 'created_at'],
                include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                      model: User,
                      attributes: ['username', 'id']
                    }
                  },
                  {
                    model: User,
                    attributes: ['username', 'id']
                  }
        ]
        }]
    })
    .then(dbUserData => {
        // pass a single post object into the homepage template
        const user = dbUserData.get({ plain: true });
        res.render('homepage',{ 
          posts: user.favorite_posts,
          headline: 'Your favorite posts',
          loggedIn: req.session.loggedIn,
          user_id: req.session.user_id 
        });
      })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
});

module.exports = router;