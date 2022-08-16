const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const categories = require('../utils/categories');

router.get('/', (req, res) => {
    Post.findAll({
      attributes: [
        'id',
        'body',
        'title',
        'category_name',
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
          const posts = dbPostData.map(post => post.get({ plain: true }));
          console.log(posts);
          res.render('homepage',{ 
            posts,
            categories,
            homePage: true,
            headline: 'All Posts',
            loggedIn: req.session.loggedIn 
          });
        })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/login', (req, res) => {
      if(req.session.loggedIn) {
        res.redirect('/');
        return;
      }
      res.render('login')
})

router.get('/post/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'body',
        'title',
        'category_name',
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
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
  
        // serialize the data
        const post = dbPostData.get({ plain: true });
  
        // pass data to template
        res.render('single-post', { 
          post,
          loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/contact', (req, res) => {
  res.render('contact-us',{
    loggedIn: req.session.loggedIn
  })
})

module.exports = router;
