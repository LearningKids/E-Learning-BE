import { Model, PaginateModel } from 'mongoose';

class MethodBase {
  async findOneUpdate(conditions: any, model: PaginateModel<any>, data: any) {
    return await model
      .findOneAndUpdate({ ...conditions }, data, { new: true })
      .exec();
  }

  async findOneByCondition(
    conditions: any,
    model: PaginateModel<any>,
    reference?: any,
    select?: [string],
  ) {
    let query = model.findOne({ ...conditions, deleted_at: null });

    if (select) {
      const selectFields = select.join(' ');
      query = query.select(selectFields);
    }

    if (reference && reference.length > 0) {
      for (const ref of reference) {
        query = query.populate(ref);
      }
    }

    return await query.exec();
  }

  async remove(conditions: any, model: PaginateModel<any>) {
    return await model
      .findOneAndUpdate(
        { ...conditions },
        { deleted_at: Date.now() },
        { new: true },
      )
      .exec();
  }
}

export default new MethodBase();
