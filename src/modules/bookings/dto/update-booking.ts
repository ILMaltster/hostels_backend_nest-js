export class UpdateHotelRoomDto {
    readonly hotel_room_id?: number;
    readonly hotel_id?: number;
    readonly arrival_date?: string;
    readonly departure_date?: string;
    readonly visitor_id?: number;
}