import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseEntity } from 'src/shared/base/base.entity';

export type RoleDocument = HydratedDocument<Role>;

export enum ROLE {
  Admin = 'ADMIN',
  Teacher = 'TEACHER',
  Student = 'STUDENT',
  Student_Trial = 'STUDENT_TRIAL',
}
@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Role extends BaseEntity {
  @Prop({ unique: true, required: true })
  role_type: number;

  @Prop({ unique: true, required: true, enum: ROLE })
  role_name: string;
}
export const RoleSchema = SchemaFactory.createForClass(Role);
