import { BadRequestException } from '@nestjs/common';

const checkForDuplicateField = function (error, doc, next) {
  if (error && error.code === 11000) {
    const [fieldName, value] = Object.entries(error.keyValue)[0];
    throw new BadRequestException(`Duplicate ${fieldName} : ${value}`);
  } else {
    next();
  }
};

export default checkForDuplicateField;
