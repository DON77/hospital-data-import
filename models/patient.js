const Hospital = require('./hospital')

function Patient(client, Sequelize) {
  const patient = client.define(
    'Patient',
    {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      internalId: {
        allowNull: false,
        type: Sequelize.STRING(50),
        unique: true
      },
      mrn: {
        allowNull: false,
        type: Sequelize.STRING(50),
        unique: true
      },
      dob: {
        type: Sequelize.DATE,
        allowNull: false
      },
      dod: {
        type: Sequelize.DATE,
        default: null
      },
      firstName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      sex: {
        type: Sequelize.ENUM('male', 'female'),
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING(50),
      },
      city: {
        type: Sequelize.STRING(50),
      },
      state: {
        type: Sequelize.STRING(50),
      },
      zip: {
        type: Sequelize.STRING(50),
      },
      hospitalId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: Hospital(client, Sequelize),
          key: 'id'
        }
      },
      compositeId: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      }
    },
    {
      timestamps: true,
      tableName: 'patients',
    },
  );

  // Associations
  patient.associate = ({Hospital}) => {
    patient.belongsTo(Hospital, {
      foreignKey: {
        name: 'hospitalId',
        allowNull: false,
      },
      targetKey: 'id',
      as: 'hospital',
    });
  };

  patient.associate = ({Treatment}) => {
    patient.hasMany(Treatment, {
      foreignKey: {
        name: 'compositeId',
      },
      targetKey: 'compositePatientId',
      as: 'treatments',
    });
  };

  return patient;
}

module.exports = Patient
