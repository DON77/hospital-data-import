function Hospital(client, Sequelize) {
    const hospital = client.define(
        'Hospital',
        {
            id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING(50),
                unique: true,
            },
        },
        {
            timestamps: true,
            tableName: 'hospitals',
        },
    );

  hospital.associate = ({Patient}) => {
    hospital.hasMany(Patient, {
      foreignKey: {
        name: 'hospitalId',
        // allowNull: false,
      },
      targetKey: 'id',
      as: 'patients',
    });
  };

    return hospital;
}

module.exports = Hospital
