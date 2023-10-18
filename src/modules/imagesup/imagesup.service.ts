import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateImagesupDto } from './dto/create-imagesup.dto';
import { UpdateImagesupDto } from './dto/update-imagesup.dto';
import { Imagesup } from './entities/imagesup.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import paginationQuery from 'src/pagination';
import queryFilters from 'src/pagination/filters';
import { FilterImagesuptDto } from './dto/filter-imagesup.dto';

@Injectable()
export class ImagesupService {
  constructor(
    @InjectModel(Imagesup.name)
    private readonly imagesupModel: PaginateModel<Imagesup>,
  ) {}

  create(createImagesupDto: CreateImagesupDto) {
    const createImagesup = new this.imagesupModel(createImagesupDto);
    return createImagesup.save();
  }

  async findAll(pagination: FilterImagesuptDto) {
    const options = paginationQuery(pagination.page, pagination.page_size);
    const filters = queryFilters(pagination);
    const imagesup = await this.imagesupModel.paginate(filters, options);
    return imagesup;
  }

  async findOne(_id: number) {
    try {
      const imagesup = await this.imagesupModel.findById({ _id }).exec();
      return {
        data: imagesup,
        status: 200,
      };
    } catch (error) {
      throw new InternalServerErrorException('Server Error');
    }
  }

  async update(_id: number, updateImagesupDto: UpdateImagesupDto) {
    try {
      const imagesup = await this.imagesupModel.findById({ _id }).exec();
      if (!imagesup) {
        throw new NotFoundException(`${_id} not Found`);
      }
      const imagesupUpdate = await this.imagesupModel
        .findOneAndUpdate({ _id: _id }, updateImagesupDto, { new: true })
        .exec();
      return imagesupUpdate;
    } catch (error) {
      throw new InternalServerErrorException('Server Error');
    }
  }

  async remove(_id: number) {
    const imagesup = await this.imagesupModel.findById({ _id }).exec();
    if (!imagesup) {
      throw new NotFoundException(`${_id} not Found`);
    }
    await this.imagesupModel
      .findOneAndUpdate({ _id: _id }, { deleted_at: Date.now() })
      .exec();
    throw new HttpException('Delete sucess', HttpStatus.OK);
  }
}
