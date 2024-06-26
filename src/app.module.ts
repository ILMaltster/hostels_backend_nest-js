import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HostelsModule } from './modules/hostels/hostels.module';
import { StaffModule } from './modules/staff/staff.module';
import { VisitorsModule } from './modules/visitors/visitors.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { HotelRoomsModule } from './modules/hotel-rooms/hotel-rooms.module';
import { PostsModule } from './modules/posts/posts.module';
import { HistoryVisitorsDataModule } from './modules/history-visitors-data/history-visitors-data.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Hostel } from './modules/hostels/hostels.model';
import { Post } from './modules/posts/posts.model';
import { Staff } from './modules/staff/staff.model';
import { Visitor } from './modules/visitors/visitors.model';
import { HotelRoom } from './modules/hotel-rooms/hotel-rooms.model';
import { Booking } from './modules/bookings/bookings.model';
import { ReportsModule } from './modules/reports/reports.module';
import { Sequelize } from 'sequelize';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.HOST_PG,
      database: process.env.DATABASE_NAME_PG,
      password: process.env.PASSWORD_PG,
      username: process.env.USER_PG,
      port: Number(process.env.PORT_PG),
      models: [Hostel, Post, Staff, Visitor, HotelRoom, Booking],
      define: {timestamps: false}
    }),
    HostelsModule,
    StaffModule,
    VisitorsModule,
    BookingsModule,
    HotelRoomsModule,
    PostsModule,
    HistoryVisitorsDataModule,
    ReportsModule,
  ],
})

export class AppModule {}
