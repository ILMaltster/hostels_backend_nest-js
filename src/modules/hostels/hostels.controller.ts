import { Controller, Get, Param, Put, Query, Body, Post, Delete  } from '@nestjs/common';
import { HostelsService } from './hostels.service';
import { CreateHostelDto } from './dto/create-hostel';
import { UpdateHostelDto } from './dto/update-hostel';
import { Hostel } from './hostels.model';
import { IFilter, IOrder, IOrderTypes, ISearch } from 'src/models';

@Controller('hostels')
export class HostelsController {
    constructor(private readonly hostelsService: HostelsService){}

    @Get()
    async getHostels(
        @Query('limit') limit: string,
        @Query('offset') offset: string, 
        @Query('orderField') orderField?: IOrder<keyof Hostel>['field'],
        @Query('orderType') orderType?: IOrder['type'], 
        @Query('searchField') searchField?: ISearch<keyof Hostel>['field'],
        @Query('searchValue') searchValue?: ISearch<keyof Hostel>['value'], 
        @Query('filterField') filterField?: IFilter<keyof Hostel>['field'], 
        @Query('filterOperator') filterOperator?: IFilter['operator'],
        @Query('filterValue') filterValue?: IFilter['value'],
    ){
        const order: IOrder<keyof Hostel> = {field: orderField, type: orderType};
        const search: ISearch<keyof Hostel> = {field: searchField, value: searchValue}
        const filter: IFilter<keyof Hostel> = {field: filterField, operator: filterOperator, value: filterValue}
        
        return await this.hostelsService.getHostels(Number(limit), Number(offset), order, search, filter);
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
