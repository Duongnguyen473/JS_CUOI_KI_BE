import { OmitType } from "@nestjs/swagger";
import { Class } from "../entities/class.entity";

export class CreateClassDto extends OmitType(Class, ['id']) {
  
}
