export class CreateHotelRoomDto {
    readonly hotel_room_number: number;
    readonly hotel_id: number;
    readonly description: string;
    readonly capacity: number;
    readonly price_per_day: number;
    readonly active: boolean;
}