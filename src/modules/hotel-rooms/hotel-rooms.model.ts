import { Column, DataType, Table, Model, HasOne, ForeignKey } from "sequelize-typescript";
import { CreateHotelRoomDto } from "./dto/create-hotel-room";
import { Hostel } from "../hostels/hostels.model";

@Table({tableName: 'hotel_rooms', timestamps: false})
export class HotelRoom extends Model<HotelRoom, CreateHotelRoomDto> {
    @Column({type: DataType.INTEGER, primaryKey: true, unique: false})
    hotel_room_number: number;
    
    @ForeignKey(() => Hostel)
    @Column
    hotel_id: number;
    
    @Column({type: DataType.STRING, unique: false})
    description: string;
    
    @Column({type: DataType.INTEGER, unique: false})
    capacity: number;
    
    @Column({type: DataType.FLOAT, unique: false})
    price_per_day: number;
    
    @Column({type: DataType.BOOLEAN, unique: false})
    active: boolean;
}
