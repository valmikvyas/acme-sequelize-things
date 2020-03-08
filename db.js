const Sequelize = require("sequelize");
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme_db"
);

const Places = conn.define("places", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
});

const People = conn.define("people", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  placeId: {
    type: Sequelize.UUID,
    allowNull: false
  }
});

const Things = conn.define("things", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  personId: {
    type: Sequelize.UUID,
    allowNull: false
  }
});

People.belongsTo(Places);
Things.belongsTo(People);


const sync = async () => {
  await conn.sync({ force: true });

  const [fooPlace, barPlace] = await Promise.all([
    Places.create({ name: "foo place" }),
    Places.create({ name: "bar place" })
  ]);
  const [fooPeople, bazzPeople, barPeople] = await Promise.all([
    People.create({ name: "foo people", placeId: fooPlace.id }),
    People.create({ name: "bazz people", placeId: barPlace.id }),
    People.create({ name: "bar people", placeId: barPlace.id })
  ]);
  await Promise.all([
    Things.create({ name: "foo things", personId: fooPeople.id }),
    Things.create({ name: "bazz things", personId: bazzPeople.id }),
    Things.create({ name: "bar things", personId: barPeople.id })
  ]);
};


module.exports = {
  sync,
  models: {
    People,
    Places,
    Things
  }
};
