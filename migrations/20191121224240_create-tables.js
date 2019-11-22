
exports.up = function(knex, Promise) {
    return knex.schema.createTable('recipe', tbl => {
    
        tbl.increments();
        tbl.string('name', 128)
            .unique()
            .notNullable();
    })
    .createTable('steps', tbl => {
        tbl.increments();
        tbl.integer('step_order')
            .unsigned()
            .notNullable();
        tbl.string('step_name', 128)
            .notNullable();
        tbl.text('step_content')
            .notNullable();
        tbl.integer('recipe_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('recipe');
    })

    .createTable('ingredient', tbl => {
        tbl.increments();
        tbl.string('name', 128)
            .notNullable();
        tbl.integer('recipe_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('recipe');
    })

    .createTable('recipe_ingredients', tbl => {
        tbl.integer('recipe_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('recipe');
        tbl.integer('ingredient_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('ingredient');
        tbl.float('quantity')
            .notNullable();
        tbl.primary(['ingredient_id', 'recipe_id']);
    })

    .createTable('shopping_list', tbl => {
        tbl.integer('recipe_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('recipe');
        tbl.integer('ingredient_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('ingredient');
        tbl.float('amount')
            .notNullable()
            .references('quantity')
            .inTable('recipe_ingredients');
        tbl.primary(['ingredient_id', 'recipe_id']);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists('shopping_list')
    .dropTableIfExists('recipe_ingredients')
    .dropTableIfExists('ingredients')
    .dropTableIfExists('steps')
    .dropTableIfExists('recipe')
};
