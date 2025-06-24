import { applyDecorators } from '@nestjs/common/decorators/core/apply-decorators';
import { Column } from 'sequelize-typescript/dist/model/column/column';
import { DataType } from 'sequelize-typescript/dist/sequelize/data-type/data-type';
import { v4 as uuidv4 } from 'uuid';
export const generateObjectId = (): string => {
  return uuidv4().replace(/-/g, '');
};

export const StrObjectId = () =>
  applyDecorators(
    Column({
      type: DataType.STRING,
      primaryKey: true,
      defaultValue: generateObjectId,
      allowNull: false,
    }) as PropertyDecorator,
  );
