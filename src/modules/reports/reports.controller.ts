import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService){}
    
    @Get('profitableRooms')
    async profitableRooms(
        @Query('limit', ParseIntPipe) limit: number,
        @Query('offset', ParseIntPipe) offset: number, 
        @Query('from') from: string,
        @Query('to') to: string, 
    ) {
        const parsedFrom = new Date(from);
        const parsedTo = new Date(to);
        return this.reportsService.profitableRooms(parsedFrom, parsedTo, limit, offset)
    }

    @Get('frequentCustomer')
    async frequentCustomer(
        @Query('limit', ParseIntPipe) limit: number,
        @Query('offset', ParseIntPipe) offset: number, 
        @Query('hostelId', ParseIntPipe) hostelId: number,
    ) {
        return this.reportsService.frequentCustomer(hostelId, limit, offset)
    }

}
