const router = require('express').Router();
const { User, Post, Favorite, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const nodemailer = require('nodemailer')

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => {
            console.log(dbUserData);
            res.json(dbUserData)
        })  
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })
          
    })

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'body', 'created_at'],
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                  model: Post,
                  attributes: ['title']
                }
            },
            {
                model: Post,
                attributes: ['title'],
                through: Favorite,
                as: 'favorite_posts'
            }

        ]
    })
    .then(dbUserData => {
        if (!dbUserData){
            res.status(404).json({ message: 'No user found with this id' })
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
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id
            req.session.username = dbUserData.username
            req.session.loggedIn = true

            res.json(dbUserData)
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
});

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if(!dbUserData) {
            res.status(400).json({ message: 'No user with that email address!'})
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);

        if(!validPassword){
            res.status(400).json({ message: 'Incorrect Password!' })
            return;
        }

        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.email = dbUserData.email;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'You are now logged in!' })
        })
    })
})

router.post('/logout', withAuth, (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    }
    else {
        res.status(404).end();
    }
})

router.put('/:id', withAuth, (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' })
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
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

router.post('/contact', async function(req, res) {

    const transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false,
        auth: {
            user: "womenstechblog@outlook.com",
            pass: process.env.OU_PW
        },
        tls: {
            rejectUnauthorized: false
        }
    });
        let info = await transporter.sendMail({
            from: '"Womens Tech Blog" <womenstechblog@outlook.com>',
            to: "womenstechblog@outlook.com",
            subject: `${req.body.username} sent a message`,
            text: "message received",
            html: `<div>
            <p>Name: ${req.body.username}</p>
            <p>Email: ${req.body.email}</p>
            <p>Message: ${req.body.message}</p>
            </div>`
        });
    
        console.log('Message sent', info.messageId);
})

module.exports = router;