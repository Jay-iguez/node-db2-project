
exports.up = async function (knex) {
  await knex.schema.createTable('cars', table => {
    table.increments('id')
    table.string('vin').notNullable()
    table.string('make').notNullable()
    table.string('model').notNullable()
    table.integer('mileage').notNullable()
    table.string('title').defaultTo('none')
    table.string('transmission').defaultTo('none')
  })
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('cars')
};
