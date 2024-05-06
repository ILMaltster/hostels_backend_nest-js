import { Module } from '@nestjs/common';
import { Visitor } from './visitors.model';
import { VisitorService as VisitorsService } from './visitors.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { VisitorsController } from './visitors.controller';

@Module({
        controllers: [VisitorsController],
        providers: [VisitorsService],
        imports: [
            SequelizeModule.forFeature([Visitor])
        ]
})
export class VisitorsModule {}
