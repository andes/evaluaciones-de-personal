import { MongoQuery, ResourceBase } from '@andes/core';
import { User } from './user.schema'; // 

class UsersResource extends ResourceBase {
  Model = User;
  resourceName = 'users';
  resourceModule = 'auth';
  middlewares = [];
  searchFileds = {
    apellido: MongoQuery.partialString,
    nombre: MongoQuery.partialString,
    documento: MongoQuery.partialString,
    validationToken: MongoQuery.equalMatch,
    active: MongoQuery.equalMatch,
    email: MongoQuery.partialString,
    search: ['apellido', 'nombre', 'documento', 'email'],
  };

  //   async validateUser(token: string, req: Request) {
  //     const users = await this.search({ validationToken: token, active: false }, {}, req);
  //     if (users.length > 0) {
  //       const user = users[0];
  //       const data = { validationToken: null, active: true };
  //       return await this.update(user._id, data, req);
  //     }
  //     throw new ResourceNotFound();
  //   }

  //   async setNewToken(email: string, req: Request) {
  //     const users = await this.search({ email, active: true }, {}, req);
  //     if (users.length > 0) {
  //       const user = users[0];
  //       const data = { validationToken: new mongoose.Types.ObjectId().toHexString() };
  //       return await this.update(user._id, data, req);
  //     }
  //   }
}

export const UsersCtr = new UsersResource();

export const UsersRouter = UsersCtr.makeRoutes();
