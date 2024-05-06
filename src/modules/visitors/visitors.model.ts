import { Column, DataType, Table, Model, HasOne, ForeignKey } from "sequelize-typescript";
import { CreateVisitorDto } from "./dto/create-staff";

@Table({tableName: 'visitors', timestamps: false})
export class Visitor extends Model<Visitor, CreateVisitorDto> {
    @Column({type: DataType.INTEGER, autoIncrement: true})
    id: number;

    @Column({type: DataType.STRING, unique: false})
    additional_info: string;

    @Column({type: DataType.SMALLINT, unique: false})
    rating: number;

    @Column({type: DataType.STRING, unique: false})
    phone: string;

    @Column({type: DataType.STRING, unique: false})
    first_name: string;

    @Column({type: DataType.STRING, unique: false})
    second_name: string;

    @Column({type: DataType.STRING, unique: false})
    third_name: string;
}
