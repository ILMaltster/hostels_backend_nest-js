import { Module } from '@nestjs/common';
import { Staff } from './staff.model';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
        controllers: [StaffController],
        providers: [StaffService],
        imports: [
        SequelizeModule.forFeature([Staff])
    ]
})
export class StaffModule {}
