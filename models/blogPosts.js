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
            blogLikes: DataTypes.INTEGER,
            blogPhoto: DataTypes.STRING,
            blogDate: DataTypes.DATE,
            deleted: DataTypes.BOOLEAN
        },
        {
            timestamps: false
        }
    );
    return blogPosts;    
};