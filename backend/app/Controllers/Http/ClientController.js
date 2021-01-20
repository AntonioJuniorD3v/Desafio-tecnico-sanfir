"use strict";

const Client = use("App/Models/Client");

class ClientController {
  async index({ response }) {
    let clients = await Client.query().fetch();

    return response.status(200).json(clients);
  }

  async store({ request, response }) {
    const data = request.only(["name", "email", "date_of_birth", "city", "uf"]);

    const client = await Client.create(data);

    return response.status(201).json({
      message: "Cliente cadastrado com sucesso.",
      data: client,
    });
  }

  async update({ request, response }) {
    const data = request.only(["name", "email", "date_of_birth", "city", "uf"]);
    const { id } = request.only(["id"]);

    const client = await Client.query().where("id", id).update(data);

    return response.status(200).json({
      message: "Dados do cliente atualizado com sucesso.",
      data: client,
    });
  }

  async delete({ response, params: { id } }) {
    await Client.query().where("id", id).delete();

    return response.status(200).json({
      message: "Cliente deletado com sucesso.",
    });
  }
}

module.exports = ClientController;
