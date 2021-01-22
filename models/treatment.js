function Treatment(client, Sequelize) {
  const treatment = client.define(
    'Treatment',
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
      isActive: {
        type: Sequelize.BOOLEAN,
        default: false
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      endDate: {
        type: Sequelize.DATE
      },
      displayName: {
        allowNull: false,
        type: Sequelize.STRING(250)
      },
      diagnose: {
        type: Sequelize.TEXT
      },
      cycleCount: {
        type: Sequelize.INTEGER
      },
      cycleDuration: {
        type: Sequelize.INTEGER
      },
      treatmentId: {
        type: Sequelize.STRING(50)
      },
      compositePatientId: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: 'treatments',
    },
  );

  treatment.associate = ({Patient}) => {
    treatment.belongsTo(Patient, {
      foreignKey: {
        name: 'compositePatientId',
        allowNull: false,
      },
      targetKey: 'compositeId',
      as: 'patient',
    });
  };

  return treatment;
}

module.exports = Treatment
