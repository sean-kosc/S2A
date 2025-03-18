module.exports = (connex, Sequelize) => {
    const User = connex.define('user', {
        first_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        role: {
            type: Sequelize.ENUM('client', 'mechanic'),
            defaultValue: 'client'
        },
        status: {
            type: Sequelize.ENUM('waiting', 'approved', 'rejected'),
            defaultValue: 'waiting'
        },
        token: {
            type: Sequelize.STRING
        }
    }, { timestamps: true });

    return User
};
