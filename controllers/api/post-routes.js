const router = require('express').Router();
const { Post, User, Favorite, Comment } = require('../../models');
const sequelize = require('../../config/connection');
// const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    console.log('=====================');
    Post.findAll({
        attributes: ['id', 'body', 'title', 'user_id', 'category_name','created_at'],
        order: [['created_at', 'DESC']],
        include: [
          // include the Comment model here:
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'body', 'title', 'created_at'],
        include: [
            // include the Comment model here:
            {
              model: Comment,
              attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
              include: {
                model: User,
                attributes: ['username']
              }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(400).json({ message: 'No post found with this id' })
            return;
        }
        res.json(dbPostData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
})


router.post('/',(req, res) => {
    Post.create({
        title: req.body.title,
        body: req.body.body,
        category_name: req.body.category_name,
        user_id: req.session.user_id
    })
    .then(dbPostData => {res.json(dbPostData)})
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
})

router.put('/favorite', (req, res) => {
  if (req.session) {
    Post.favorite({...req.body, user_id: req.session.user_id}, { Favorite, Comment, User })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
  }
})

router.put('/:id', (req, res) => {
    Post.update(
      {
        title: req.body.title
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.delete('/:id', (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;