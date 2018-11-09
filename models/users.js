"use strict"

module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define(
        'users',
        {
            userId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            userPhoto: {
                type: DataTypes.STRING,
                defaultValue: 'Photo Here'
            },
            birthDay: {
                type: DataTypes.STRING,
                defaultValue: 'UserBirthday'
            },
            userEmail: {
                type: DataTypes.STRING,
                defaultValue: 'UserEmail'
            },
            phoneNumer: {
                type: DataTypes.INTEGER,
                defaultValue: 'PhoneNumber Here'
            },
            userCreatedDate: DataTypes.DATE,
            userAdmin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            deleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        {
            timestamps: false
        }
    );
    return users;    
};