const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[a-zA-Z\s]+$/, // Permite letras y espacios
        len: {
          args: [2, 255],
          msg: "El nombre tiene que ser mínimo de dos caracteres"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: {
          msg: "El email tiene que ser un correo válido"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [6, 255],
          msg: "La contraseña tiene que tener mínimo 6 caracteres"
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
    },

    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    googleId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    githubId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },

    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    productsReviewed:{
      type:DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull:true,
      defaultValue:null,
    }
  });
  

  return User;
};
