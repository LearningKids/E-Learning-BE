import { Injectable } from '@nestjs/common';
import { CreateClassExerciseDto } from './dto/create-class-exercise.dto';
import { UpdateClassExerciseDto } from './dto/update-class-exercise.dto';

@Injectable()
export class ClassExerciseService {
  create(createClassExerciseDto: CreateClassExerciseDto) {
    return 'This action adds a new classExercise';
  }

  findAll() {
    return `This action returns all classExercise`;
  }

  findOne(id: number) {
    return `This action returns a #${id} classExercise`;
  }

  update(id: number, updateClassExerciseDto: UpdateClassExerciseDto) {
    return `This action updates a #${id} classExercise`;
  }

  remove(id: number) {
    return `This action removes a #${id} classExercise`;
  }
}
