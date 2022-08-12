const router = require('express').Router();
const { Post, User, Comment } = require('../models')

router.get('/:id', (req, res) => {
    Post.findAll({
      where: {
        user_id: req.params.id
      },
      attributes: [
        'id',
        'body',
        'title',
        'created_at'
      ],
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
    })
      .then(dbPostData => {
        // pass a single post object into the homepage template
        const posts = dbPostData.map(post => post.get({ plain: true }));
        const user = posts[0].user.username;
        res.render('homepage',{ 
          posts,
          username: user,
          pageType: 'user',
          loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;