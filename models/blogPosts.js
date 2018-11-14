"use strict"

module.exports = (sequelize, DataTypes) => {
    const blogPosts = sequelize.define(
        'blogPosts',
        {
            blogId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            blogTitle: DataTypes.STRING,
            blogMessage: DataTypes.STRING,
            blogLikes: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            blogPhoto: {
                type: DataTypes.STRING,
                defaultValue: 'Photo Here'
            },
            blogDate: DataTypes.DATE,
            deleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: 0
            },
            blogViews: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            }
        },
        {
            timestamps: false
        }
    );
    blogPosts.associate = function(models) {
        blogPosts.hasMany(models.comments, {
            foreignKey: 'blogId'
        });
    };
    return blogPosts;    
};