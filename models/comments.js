"use strict"

module.exports = (sequelize, DataTypes) => {
    const comments = sequelize.define(
        'comments',
        {
            comId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            comMessage: DataTypes.STRING,
            blogId: {
                type: DataTypes.INTEGER,
                defaultValue: 1
            },
            userId: {
                type: DataTypes.INTEGER,
                defaultValue: 1
            },
            comLikes: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            comCreatedDate: {
                type: DataTypes.DATE,
                defaultValue: Date.now
            },
            deleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: 0
            }
        },
        {
            timestamps: false
        }
    );
    comments.associate = function(models) {
        comments.belongsTo(models.blogPosts, {
            foreignKey: 'blogId'
        });
        comments.belongsTo(models.users, {
            foreignKey: 'userId'
        });
    };
    return comments;    
};