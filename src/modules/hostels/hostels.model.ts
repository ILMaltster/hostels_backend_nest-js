import { Column, DataType, Table, Model } from "sequelize-typescript";

interface HosterCreationsProps {
    name: string;
    tin: string;
    address: string;
}

@Table({tableName: 'hostels', timestamps: false})
export class Hostel extends Model<Hostel, HosterCreationsProps> {
    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number;

    @Column({type: DataType.STRING, unique: false})
    name: string;

    @Column({type: DataType.STRING, unique: true})
    tin: string;

    @Column({type: DataType.STRING, unique: false})
    address: string;
}