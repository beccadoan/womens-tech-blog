const router = require('express').Router();
const { Post, User, Comment } = require('../models')


router.get('/:name', (req, res) => {
    Post.findAll({
      where: {
        category_name: req.params.name
      },
      attributes: [
        'id',
        'body',
        'title',
        'user_id',
        'category_name',
        'created_at'
      ],
      order: [['created_at', 'DESC']],
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
        res.render('homepage',{ 
          posts,
          headline: `All posts in category: ${req.params.name}`,
          loggedIn: req.session.loggedIn ,
          user_id: req.session.user_id
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;