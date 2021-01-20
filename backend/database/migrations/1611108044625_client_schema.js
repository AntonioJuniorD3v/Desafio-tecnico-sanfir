"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ClientSchema extends Schema {
  up() {
    this.create("clients", (table) => {
      table.increments();
      table.string("name", 80).notNullable();
      table.string("email", 254).notNullable().unique();
      table.date("date_of_birth", 60).notNullable();
      table.string("city").notNullable();
      table.string("uf", 2).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("clients");
  }
}

module.exports = ClientSchema;
