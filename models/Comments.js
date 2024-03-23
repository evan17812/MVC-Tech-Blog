
const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

const bcrypt = require("bcrypt");

class Comments extends Model {

  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Comments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: { type: DataTypes.TEXT, allowNull: false },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "user", key: "id" },
    },
    blogpostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "blogpost", key: "id" },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);


module.exports = Comments;