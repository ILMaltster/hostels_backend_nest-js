import { Module } from '@nestjs/common';
import { HostelsController } from './hostels.controller';
import { HostelsService } from './hostels.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Hostel } from './hostels.model';

@Module({
  controllers: [HostelsController],
  providers: [HostelsService],
  imports: [
    SequelizeModule.forFeature([Hostel])
  ]
})
export class HostelsModule {}
