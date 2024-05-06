import { Column, DataType, Table, Model, HasOne, ForeignKey } from "sequelize-typescript";
import { CreateStaffDto } from "./dto/create-staff";
import { Post } from "../posts/posts.model";

@Table({tableName: 'staff', timestamps: false})
export class Staff extends Model<Staff, CreateStaffDto> {
    @Column({type: DataType.INTEGER})
    hostel_id: number;

    @Column({type: DataType.STRING, unique: false})
    first_name: string;

    @Column({type: DataType.STRING, unique: false})
    second_name: string;

    @Column({type: DataType.STRING, unique: false})
    third_name: string;

    @Column({type: DataType.STRING, primaryKey: true, unique: false, })
    tin: string;

    @ForeignKey(() => Post)
    @Column
    post: number;
}
