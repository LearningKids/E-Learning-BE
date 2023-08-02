import { Injectable, NestMiddleware, HttpException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';

// @Injectable()
// export class NotFoundMiddleware<T> implements NestMiddleware {
//   constructor(@InjectModel(T.name) private readonly model: Model<T>) {}

//   async use(req: Request, res: Response, next: () => void) {
//     const id = req.params.id;
//     const entity = await this.model.findById(id);

//     if (!entity) {
//       throw new HttpException(`${this.model.modelName} not found`, 404);
//     }

//     next();
//   }
// }
