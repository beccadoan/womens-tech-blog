const router = require('express').Router();

router.get('/:id', (req, res) => {
    Post.findAll({
      where: {
        user_id: req.params.id
      },
      attributes: [
        'id',
        'post_url',
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
        res.render('profile',{ 
          pageType: 'category',
          posts
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;