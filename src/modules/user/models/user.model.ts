import { EntityTable } from "@/common/constants/entity.constant";
import { Column, Model, Table } from "sequelize-typescript";
import { User } from "../entities/user.entity";
import { Gender, UserRoles } from "../common/constant";
import { StrObjectId } from "@/common/constants/base.constant";

@Table({
    tableName: EntityTable.USER
})
export class UserModel extends Model implements User {
    @StrObjectId()
    _id: string;
    @Column
    fullname: string;
    @Column({
        unique: true
    })
    email: string;
    @Column({
        unique: true
    })
    phone: string;
    @Column
    password: string;
    
    @Column
    birthday?: Date;
    @Column
    avatar?: string;
    @Column
    role: UserRoles;
    @Column
    gender?: Gender;
    @Column
    address?: string;

    
}