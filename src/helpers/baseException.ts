import { HttpException, NotFoundException } from '@nestjs/common';
class BaseException {
  HttpException(error) {
    throw new HttpException(error?.response, error?.response?.statusCode);
  }
  NotFound(_id: string | number) {
    throw new NotFoundException(`${_id} not Found`);
  }
}

export default new BaseException();
