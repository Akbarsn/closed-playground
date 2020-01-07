'use strict';
module.exports = (sequelize, DataTypes) => {
  const notes = sequelize.define('notes', {
    header: DataTypes.STRING,
    description: DataTypes.STRING,
    author: DataTypes.INTEGER
  }, {});
  notes.associate = function(models) {
    // associations can be defined here
  };
  return notes;
};