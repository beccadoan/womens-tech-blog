const router = require('express').Router();
const { Post, Category } = require('../../models');

router.get('/', (req, res) => {
    Category.findAll()
        .then(dbCategoryData => {
            console.log(dbCategoryData);
            res.json(dbCategoryData)
        })  
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
          
    })

router.get('/:id', (req, res) => {
    Category.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'body', 'created_at']
            }
        ]
    })
    .then(dbCategoryData => {
        if (!dbCategoryData){
            res.status(404).json({ message: 'No category found with this id' })
            return;
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
});

router.post('/', (req, res) => {
    Category.create({
        title: req.body.title
    })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
});

router.delete('/:id', (req, res) => {
    Category.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' })
            return;
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
})

module.exports = router;