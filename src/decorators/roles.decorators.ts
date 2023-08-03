import { SetMetadata } from '@nestjs/common';
import { roleNames } from 'src/core/constants';

export const ROLES = 'ROLES';
export const Roles = (roles: string[]) => SetMetadata(ROLES, roles);

export const accessRole = {
  accessAdmin: [roleNames.admin],
  accessTeacher: [roleNames.admin, roleNames.teacher],
  accessStudent: [roleNames.admin, roleNames.teacher, roleNames.student],
  accessStudent_Trial: [
    roleNames.admin,
    roleNames.teacher,
    roleNames.student_trial,
  ],
};
