import { Controller, Get, Param, Put, Query, Body, Post, Delete  } from '@nestjs/common';
import { HostelsService } from './hostels.service';
import { CreateHostelDto } from './dto/create-hostel';
import { UpdateHostelDto } from './dto/update-hostel';
import { Hostel } from './hostels.model';
import { IFilter, IOrder, IOrderTypes, ISearch } from 'src/models';

/**
 * Функция предназначена для конвертирования типа значения по наименованию поля.
 * @param type тип, полученный из модели.
 * @param value значение для преобразования.
 * @returns преобразованное значение.
 */
const convertIfIntegerType = (type: string, value: string | number): string | number => {
    return type === 'INTEGER' ? Number(value) : value
}

@Controller('hostels')
export class HostelsController {
    constructor(private readonly hostelsService: HostelsService){}

    @Get()
    async getHostels(
        @Query('limit') limit: string,
        @Query('offset') offset: string, 
        @Query('orderField') orderField?: IOrder['field'],
        @Query('orderType') orderType?: IOrder['type'], 
        @Query('searchField') searchField?: ISearch['field'],
        @Query('searchValue') searchValue?: string, 
        @Query('filterField') filterField?: IFilter['field'], 
        @Query('filterOperator') filterOperator?: IFilter['operator'],
        @Query('filterValue') filterValue?: string,
    ){
        let convSearchValue: string | number = '';
        let convFilterValue: string | number | Array<string | number> = '';

        // Конвертирует тип значение по наименованию поля в соотвесвтии модели.
        if (searchField)
            convSearchValue = convertIfIntegerType(Hostel.getAttributes()[searchField].type.constructor.name, searchValue);
        if (filterField)
            convFilterValue = convertIfIntegerType(Hostel.getAttributes()[filterField].type.constructor.name, filterValue);
        if (filterOperator === 'isAnyOf' && typeof convFilterValue === 'string')
            convFilterValue = convFilterValue.split(',');

        const order: IOrder<keyof Hostel> = {field: orderField, type: orderType};
        const search: ISearch<keyof Hostel> = {field: searchField, value: convSearchValue}
        const filter: IFilter<keyof Hostel> = {field: filterField, operator: filterOperator, value: convFilterValue}
        
        return await this.hostelsService.getHostels(
            Number(limit), 
            Number(offset), 
            order, 
            search, 
            filter
        );
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
