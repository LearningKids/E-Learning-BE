import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UploadService {
  create(file?: string): string {
    if (!file) {
      throw new NotFoundException('File Not Found');
    }
    return file;
  }
}
