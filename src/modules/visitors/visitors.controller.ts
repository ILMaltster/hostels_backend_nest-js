import { Controller, Get, Param, Put, Query, Body, Post, Delete, ParseIntPipe  } from '@nestjs/common';
import { CreateVisitorDto } from './dto/create-staff';
import { UpdateVisitorDto } from './dto/update-staff';
import { IFilter, IOrder, IOrderTypes, ISearch } from 'src/models';
import { Visitor } from './visitors.model';
import { VisitorService } from './visitors.service';

/**
 * Функция предназначена для конвертирования типа значения по наименованию поля.
 * @param type тип, полученный из модели.
 * @param value значение для преобразования.
 * @returns преобразованное значение.
 */
const convertIfIntegerType = (type: string, value: string | number): string | number => {
    return type === 'INTEGER' ? Number(value) : value
}

@Controller('staff')
export class VisitorsController {
    constructor(private readonly visitorService: VisitorService){}

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
            convSearchValue = convertIfIntegerType(Visitor.getAttributes()[searchField].type.constructor.name, searchValue);
        if (filterField)
            convFilterValue = convertIfIntegerType(Visitor.getAttributes()[filterField].type.constructor.name, filterValue);
        if (filterOperator === 'isAnyOf' && typeof convFilterValue === 'string')
            convFilterValue = convFilterValue.split(',');

        const order: IOrder<keyof Visitor> = {field: orderField, type: orderType};
        const search: ISearch<keyof Visitor> = {field: searchField, value: convSearchValue}
        const filter: IFilter<keyof Visitor> = {field: filterField, operator: filterOperator, value: convFilterValue}
        
        return await this.visitorService.getPosts(
            Number(limit), 
            Number(offset), 
            order, 
            search, 
            filter
        );
    }

    @Post()
    async createHostel(@Body() body: CreateVisitorDto){
        return await this.visitorService.createPost(body);
    }
    
    @Put(':id')
    async editHostel(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateVisitorDto){
        return await this.visitorService.editPost(body, id);
    }

    @Delete(':id')
    async deleteHostel(@Param('id', ParseIntPipe) id: number){
        return await this.visitorService.deletePost(id);
    }
}
