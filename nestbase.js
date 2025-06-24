#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const [,, rawName] = process.argv;
if (!rawName) {
  console.error('❌ Vui lòng truyền tên module (ví dụ: StudentProfile)');
  console.log('📖 Cách sử dụng: node nestbase.js StudentProfile');
  process.exit(1);
}

// Helper function để chuyển PascalCase sang kebab-case
function toKebabCase(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

// Helper function để chuyển PascalCase sang camelCase
function toCamelCase(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

// Helper function để tạo plural form
function toPlural(str) {
  const kebabCase = toKebabCase(str);
  if (kebabCase.endsWith('y')) {
    return kebabCase.slice(0, -1) + 'ies';
  } else if (kebabCase.endsWith('s') || kebabCase.endsWith('sh') || kebabCase.endsWith('ch') || kebabCase.endsWith('x') || kebabCase.endsWith('z')) {
    return kebabCase + 'es';
  } else {
    return kebabCase + 's';
  }
}

const Name = rawName; // PascalCase: StudentProfile
const name = toCamelCase(rawName); // camelCase: studentProfile
const kebabName = toKebabCase(rawName); // kebab-case: student-profile
const kebabNames = toPlural(rawName); // plural kebab-case: student-profiles

const basePath = path.join(__dirname, 'src', 'modules', kebabName);

// Tạo thư mục với kebab-case
console.log(`📁 Tạo thư mục cho module ${Name} tại: src/modules/${kebabName}`);
fs.mkdirSync(basePath + '/controllers', { recursive: true });
fs.mkdirSync(basePath + '/services', { recursive: true });
fs.mkdirSync(basePath + '/repositories', { recursive: true });
fs.mkdirSync(basePath + '/entities', { recursive: true });
fs.mkdirSync(basePath + '/dto', { recursive: true });

// Entity với kebab-case filename
console.log(`📄 Tạo ${kebabName}.entity.ts...`);
fs.writeFileSync(`${basePath}/entities/${kebabName}.entity.ts`, 
`import { Table, Column, DataType, BeforeCreate, BeforeUpdate } from 'sequelize-typescript';
import { BaseEntity } from '@Base/base.entity';
import { EntityTable } from '@/common/constants/entity.constant';
@Table({
  tableName: EntityTable.${kebabName.toUpperCase().replace(/-/g, '_')},
  indexes: []
})
export class ${Name} extends BaseEntity {
  
}
`);

// Repository với kebab-case filename
console.log(`📄 Tạo ${kebabName}.repository.ts...`);
fs.writeFileSync(`${basePath}/repositories/${kebabName}.repository.ts`, 
`import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@Base/base.repository';
import { ${Name} } from '../entities/${kebabName}.entity';

@Injectable()
export class ${Name}Repository extends BaseRepository<${Name}> {
  constructor() {
    super(${Name});
  }

}
`);

// Service với kebab-case filename
console.log(`📄 Tạo ${kebabName}.service.ts...`);
fs.writeFileSync(`${basePath}/services/${kebabName}.service.ts`, 
`import { Injectable } from '@nestjs/common';
import { BaseService } from '@Base/base.service';
import { ${Name} } from '../entities/${kebabName}.entity';
import { ${Name}Repository } from '../repositories/${kebabName}.repository';
import { Create${Name}Dto } from '../dto/create-${kebabName}.dto';
import { Update${Name}Dto } from '../dto/update-${kebabName}.dto';
import { ApiError } from '@Exceptions/api-error';

@Injectable()
export class ${Name}Service extends BaseService<${Name}> {
  constructor(private readonly ${name}Repository: ${Name}Repository) {
    super(${name}Repository);
  }

}
`);

// Controller với kebab-case filename
console.log(`📄 Tạo ${kebabName}.controller.ts...`);
fs.writeFileSync(`${basePath}/controllers/${kebabName}.controller.ts`, 
`import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete,
  Query,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { ${Name}Service } from '../services/${kebabName}.service';
import { Create${Name}Dto } from '../dto/create-${kebabName}.dto';
import { Update${Name}Dto } from '../dto/update-${kebabName}.dto';
import { Auth } from '@Decorators/auth.decorator';
import { Public } from '@Decorators/public.decorator';
import { ApiError } from '@Exceptions/api-error';

@Controller('${kebabName}')
export class ${Name}Controller {
  constructor(private readonly ${name}Service: ${Name}Service) {}

}
`);

// DTOs với kebab-case filename
console.log(`📄 Tạo create-${kebabName}.dto.ts...`);
fs.writeFileSync(`${basePath}/dto/create-${kebabName}.dto.ts`, 
`export class Create${Name}Dto {
  
}
`);

console.log(`📄 Tạo update-${kebabName}.dto.ts...`);
fs.writeFileSync(`${basePath}/dto/update-${kebabName}.dto.ts`, 
`import { PartialType } from '@nestjs/mapped-types';
import { Create${Name}Dto } from './create-${kebabName}.dto';

export class Update${Name}Dto extends PartialType(Create${Name}Dto) {}
`);

// Module với kebab-case filename
console.log(`📄 Tạo ${kebabName}.module.ts...`);
fs.writeFileSync(`${basePath}/${kebabName}.module.ts`, 
`import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ${Name} } from './entities/${kebabName}.entity';
import { ${Name}Controller } from './controllers/${kebabName}.controller';
import { ${Name}Service } from './services/${kebabName}.service';
import { ${Name}Repository } from './repositories/${kebabName}.repository';

@Module({
  imports: [SequelizeModule.forFeature([${Name}])],
  controllers: [${Name}Controller],
  providers: [${Name}Service, ${Name}Repository],
  exports: [${Name}Service, ${Name}Repository],
})
export class ${Name}Module {}
`);

console.log(`✅ Đã tạo thành công base module cho ${Name}`);
console.log(`📋 Cấu trúc được tạo:`);
console.log(`   📁 src/modules/${kebabName}/`);
console.log(`   ├── 📁 controllers/`);
console.log(`   │   └── 📄 ${kebabName}.controller.ts`);
console.log(`   ├── 📁 services/`);
console.log(`   │   └── 📄 ${kebabName}.service.ts`);
console.log(`   ├── 📁 repositories/`);
console.log(`   │   └── 📄 ${kebabName}.repository.ts`);
console.log(`   ├── 📁 entities/`);
console.log(`   │   └── 📄 ${kebabName}.entity.ts`);
console.log(`   ├── 📁 dto/`);
console.log(`   │   ├── 📄 create-${kebabName}.dto.ts`);
console.log(`   │   └── 📄 update-${kebabName}.dto.ts`);
console.log(`   └── 📄 ${kebabName}.module.ts`);
console.log(`\n🔧 Bước tiếp theo:`);
console.log(`   1. Import ${Name}Module vào app.module.ts:`);
console.log(`      import { ${Name}Module } from '@modules/${kebabName}/${kebabName}.module';`);
console.log(`   2. Thêm vào imports array: ${Name}Module`);
console.log(`   3. Chỉnh sửa entity theo nhu cầu cụ thể`);
console.log(`   4. Cập nhật DTOs validation rules`);
console.log(`   5. Thêm business logic vào service`);
console.log(`\n📊 Database table: ${kebabNames.replace(/-/g, '_')}`);
console.log(`🌐 API endpoints: /api/${kebabNames}`);
