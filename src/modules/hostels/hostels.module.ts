import { Module } from '@nestjs/common';
import { HostelsController } from './hostels.controller';
import { HostelsService } from './hostels.service';
import { Hostel } from './hostels.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [HostelsController],
  providers: [HostelsService],
  imports: [
    SequelizeModule.forFeature([Hostel])
  ]
})
export class HostelsModule {}
