module.exports = (connex, Sequelize) => {
  const Task = connex.define('task', {
      title: {
          type: Sequelize.STRING,
          allowNull: false
      },
      description: {
          type: Sequelize.TEXT,
          allowNull: true
      },
      status: {
          type: Sequelize.ENUM('todo', 'doing', 'done'),
          defaultValue: 'todo'
      },
      mechanicUsername: {
          type: Sequelize.STRING,
          allowNull: false
      },
      clientUsername: {
          type: Sequelize.STRING,
          allowNull: false
      }
  }, { timestamps: true });

  return Task;
};