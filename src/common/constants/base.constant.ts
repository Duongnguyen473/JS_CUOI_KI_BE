import { applyDecorators } from '@nestjs/common/decorators/core/apply-decorators';
import { Column } from 'sequelize-typescript/dist/model/column/column';
import { DataType } from 'sequelize-typescript/dist/sequelize/data-type/data-type';

export const StrObjectId = () =>
  applyDecorators(
    Column({
      primaryKey: true,
      defaultValue: () => DataType.UUIDV4,
    }) as PropertyDecorator,
  );
