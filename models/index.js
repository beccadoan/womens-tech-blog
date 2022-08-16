const User = require('./User');
const Post = require('./Post');
const Favorite = require('./Favorite');
const Comment = require('./Comment');

User.hasMany(Post, {
    foreignKey: 'user_id'
});

User.belongsToMany(Post, {
    through: Favorite,
    as: 'favorite_posts',
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

User.hasMany(Favorite, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
  });  

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

// Post.belongsTo(Category, {
//     foreignKey: 'category_id',
//     onDelete: 'SET NULL'
// })

Post.belongsToMany(User, {
    through: Favorite,
    as: 'favorite_posts',
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

Post.hasMany(Favorite, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
  });

Favorite.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Favorite.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
  });
  
  Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
  });

//   Category.hasMany(Post, {
//       foreignKey: 'category_id'
//   })
  


module.exports = { User, Post, Favorite, Comment };