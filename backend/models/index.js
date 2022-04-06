const config = require("../config/db.config");
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const connect = async () => {
    await sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully');
    }).catch((error) => {
        console.log('error:', error)
    })
}

const db = {
    connect
};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require('../models/user.model')(sequelize, Sequelize);
db.role = require('../models/role.model')(sequelize, Sequelize);
db.type = require('../models/type.model')(sequelize, Sequelize);
db.userroles = require('../models/userRoles.model')(sequelize, Sequelize);

console.log('DB', db.connect);
// db.role.belongsToMany(db.user, {
//     through: "user_roles",
//     foreignKey: "roleId",
//     otherKey: "userId"
// });
// db.user.belongsToMany(db.role, {
//     through: "user_roles",
//     foreignKey: "userId",
//     otherKey: "roleId"
// });

// db.ROLES = ["user", "admin", "moderator"];
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;