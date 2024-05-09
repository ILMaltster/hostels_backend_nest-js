import { Module } from '@nestjs/common';
import { HotelRoom } from './hotel-rooms.model';
import { HotelRoomsService } from './hotel-rooms.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { HotelRoomsController } from './hotel-rooms.controller';

@Module({
        controllers: [HotelRoomsController],
        providers: [HotelRoomsService],
        imports: [
            SequelizeModule.forFeature([HotelRoom])
        ]
})
export class HotelRoomsModule {}
