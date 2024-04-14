import { Controller, Get, Param, Put, Query, Body, Post, Delete  } from '@nestjs/common';
import { HostelsService } from './hostels.service';
import { CreateHostelDto } from './dto/create-hostel';
import { UpdateHostelDto } from './dto/update-hostel';
import { Hostel } from './hostels.model';
import { IOrderTypes } from 'src/models';

@Controller('hostels')
export class HostelsController {
    constructor(private readonly hostelsService: HostelsService){}

    @Get()
    async getHostels(
        @Query('limit') limit: string,
        @Query('offset') offset: string, 
        @Query('orderField') orderField?: keyof Hostel,
        @Query('orderType') orderType?: IOrderTypes, 
        @Query('filterField') filterField?:  keyof Hostel, 
        @Query('filterType') filterType?:  keyof Hostel, 


    ){
        return await this.hostelsService.getHostels(Number(limit), Number(offset), {field: orderField, type: orderType});
    }

    @Post()
    async createHostel(@Body() body: CreateHostelDto){
        return await this.hostelsService.createHostel(body);
    }
    
    @Put(':id')
    async editHostel(@Param('id') tin: string, @Body() body: UpdateHostelDto){
        return await this.hostelsService.editHostel(body, tin);
    }

    @Delete(':id')
    async deleteHostel(@Param('id') tin: string){
        return await this.hostelsService.deleteHostel(tin);
    }
}
