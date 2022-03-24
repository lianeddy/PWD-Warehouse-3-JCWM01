const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../helpers");
const Crypto = require("crypto");

class User extends Model {
  static async findByCredentials(email, password) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("Unable to login");
    }

    const isMatch = User.hashing(password) === user.password;

    if (isMatch) {
      return user;
    }
  }

  static hashing(input) {
    return Crypto.createHmac("sha1", "hash123").update(input).digest("hex");
  }

  generateToken() {
    return "Token";
  }
}

User.init(
  {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    id_warehouse: DataTypes.INTEGER,
    username: DataTypes.STRING(50),
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    full_name: {
      type: DataTypes.TEXT,
    },
    birth_date: DataTypes.DATEONLY,
    gender: DataTypes.STRING(50),
    phone: DataTypes.STRING(100),
    umur: DataTypes.INTEGER,
    is_valid: {
      type: DataTypes.BOOLEAN,
    },
    id_role: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE,
    created_at: DataTypes.BOOLEAN,
    updated_at: DataTypes.BOOLEAN,
    soft_delete: DataTypes.BOOLEAN,
  },

  {
    hooks: {
      beforeSave: (user, options) => {
        console.log(user.password);
      },
    },
    sequelize,
    freezeTableName: true,
    tableName: "sys_user",
    timestamps: false,
  }
);

User.associations;

module.exports = User;
