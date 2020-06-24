require('../models/card-model');

const base = require('../bin/base/repository-base');

class cardRepositoy {
  constructor(){
    this._base = new base('Card')
  }

  async getMyAll(user){
    return await this._base.getMyAll(user);
  }

  async getById(id){
    return await this._base.getById(id);
  }

  async delete(id, user){
    let model = await this._base.getById(id);

    if(model.userId.toString() === user._id){
      return await this._base.delete(id);
    }

    return 'Operação inválida';
  }

  async create(data){
    let card = await this._base.create(data);

    return card;
  }
}

module.exports = cardRepositoy;