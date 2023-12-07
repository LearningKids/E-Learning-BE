import { PartialType } from '@nestjs/mapped-types';
import { CreateClassExerciseDto } from './create-class-exercise.dto';

export class UpdateClassExerciseDto extends PartialType(CreateClassExerciseDto) {}
