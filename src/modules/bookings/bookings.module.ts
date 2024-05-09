import { Module } from '@nestjs/common';
import { Booking } from './bookings.model';
import { BookingsService } from './bookings.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookingsController } from './bookings.controller';

@Module({
        controllers: [BookingsController],
        providers: [BookingsService],
        imports: [
            SequelizeModule.forFeature([Booking])
        ]
})
export class BookingsModule {}
