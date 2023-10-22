import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateImagesupDto } from './dto/create-imagesup.dto';
import { UpdateImagesupDto } from './dto/update-imagesup.dto';
import { Imagesup } from './entities/imagesup.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import paginationQuery from 'src/pagination';
import queryFilters from 'src/pagination/filters';
import { FilterImagesuptDto } from './dto/filter-imagesup.dto';
import baseException from 'src/helpers/baseException';
import methodBase from 'src/helpers/methodBase';

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
      const imagesup = await methodBase.findOneByCondition(
        { _id },
        this.imagesupModel,
      );
      return {
        data: imagesup,
        status: 200,
      };
    } catch (error) {
      baseException.HttpException(error);
    }
  }

  async update(_id: number, updateImagesupDto: UpdateImagesupDto) {
    try {
      const imagesupUpdate = await methodBase.findOneUpdate(
        { _id },
        this.imagesupModel,
        updateImagesupDto,
      );
      if (!imagesupUpdate) {
        baseException.NotFound(_id);
      }
      return imagesupUpdate;
    } catch (error) {
      baseException.HttpException(error);
    }
  }

  async remove(_id: number) {
    try {
      const imageDelete = await this.imagesupModel
        .findOneAndUpdate({ _id: _id }, { deleted_at: Date.now() })
        .exec();
      if (!imageDelete) {
        baseException.NotFound(_id);
      }
      throw new HttpException('Delete sucess', HttpStatus.OK);
    } catch (error) {
      baseException.HttpException(error);
    }
  }
}
