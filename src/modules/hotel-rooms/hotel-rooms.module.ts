import { Module } from '@nestjs/common';
import { HotelRoomsController } from './hotel-rooms.controller';

@Module({
  controllers: [HotelRoomsController]
})
export class HotelRoomsModule {}
