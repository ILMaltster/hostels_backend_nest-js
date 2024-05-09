import { Column, DataType, Table, Model, HasOne, ForeignKey } from "sequelize-typescript";
import { CreateBookingDto } from "./dto/create-booking";
import { Visitor } from "../visitors/visitors.model";
import { Hostel } from "../hostels/hostels.model";
import { HotelRoom } from "../hotel-rooms/hotel-rooms.model";

@Table({tableName: 'bookings', timestamps: false})
export class Booking extends Model<Booking, CreateBookingDto> {
    @Column({type: DataType.INTEGER, primaryKey: true, unique: false, autoIncrement: true})
    id: number;

    @ForeignKey(() => HotelRoom)
    @Column
    hotel_room_id: number;

    @ForeignKey(() => Hostel)
    @Column
    hotel_id: number;

    @Column({type: DataType.DATE, unique: false})
    arrival_date: string;
    
    @Column({type: DataType.DATE, unique: false})
    departure_date: string;

    @ForeignKey(() => Visitor)
    @Column
    visitor_id: number;
}
