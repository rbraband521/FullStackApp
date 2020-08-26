'use strict';
const Sequelize = require('sequelize');
//defining the Sequelize model
//each requirement is definied by the type of input
//estimatedTime and materialsNeeded are able to be empty
module.exports = (sequelize) => {
    class Course extends Sequelize.Model{}
    Course.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.TEXT,
        },
        estimatedTime: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        materialsNeeded: {
            type: Sequelize.STRING,
            allowNull: true,
        }
    }, { sequelize });
//defining the relationship between both models. Each course has a single user.
    Course.associate = (models) => {
        Course.belongsTo(models.User, {
            as: 'user', //alias
            foreignKey: {
                fieldName: 'userId',
                allowNull: false,
            }
        });
    };

    return Course;
};