const sequelize = require('../config/connection');
const { Category } = require('../models');

const categorydata = [
  {
    title: 'General'
  },
  {
    title: 'Web Development'
  },
  {
    title: 'Workplace Issues'
  },
  {
    title: 'Wins'
  },
  {
    title: 'Advice'
  }
];

const seedCategories = () => Category.bulkCreate(categorydata);

module.exports = seedCategories;
