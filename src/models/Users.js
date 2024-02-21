const { DataTypes } = require('sequelize');



module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
  },
  isActive:{ //Para borrado logico
    type:DataTypes.BOOLEAN,
    defaultValue:true,
  },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: "El nombre solo puede contener letras"
        },
        len: {
          args: [2, 255],
          msg: "El nombre tiene que ser minimamente de dos caracteres"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "El email tiene que ser un correo válido"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 255],
          msg: "La contraseña tiene que tener mínimo 6 caracteres"
        },
        isStrongPassword(value) {
          if (!/(?=.*[A-Z])(?=.*\d)/.test(value)) {
            throw new Error('La contraseña debe comenzar con una letra mayúscula y contener al menos un número');
          }
        }
      }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  // Función para cifrar la contraseña antes de guardarla en la base de datos
  // User.beforeCreate(async (user) => {
  //   if (user.password) {
  //     try {
  //       const hashedPassword = await bcrypt.hash(user.password, Number.parseInt(authConfig.rounds));
  //       user.password = hashedPassword;
  //     } catch (error) {
  //       console.error('Error al hacer hash de la contraseña:', error);
  //       throw error;  // Esto asegura que el error se propague y cause una respuesta de error 500
  //     }
  //   }
  // });

  // return User;
};
