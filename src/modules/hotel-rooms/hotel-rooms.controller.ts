import { Controller, Get, Param, Put, Query, Body, Post, Delete, ParseIntPipe  } from '@nestjs/common';
import { CreateHotelRoomDto } from './dto/create-hotel-room';
import { UpdateHotelRoomDto } from './dto/update-hotel-room';
import { IFilter, IOrder, IOrderTypes, ISearch } from 'src/models';
import { HotelRoom } from './hotel-rooms.model';
import { HotelRoomsService } from './hotel-rooms.service';

/**
 * Функция предназначена для конвертирования типа значения по наименованию поля.
 * @param type тип, полученный из модели.
 * @param value значение для преобразования.
 * @returns преобразованное значение.
 */
const convertIfIntegerType = (type: string, value: string | number): string | number => {
    return type === 'INTEGER' ? Number(value) : value
}

@Controller('hotelRooms')
export class HotelRoomsController {
    constructor(private readonly hotelRoomService: HotelRoomsService){}

    @Get()
    async getHostels(
        @Query('limit', ParseIntPipe) limit: number,
        @Query('offset', ParseIntPipe) offset: number, 
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
            convSearchValue = convertIfIntegerType(HotelRoom.getAttributes()[searchField].type.constructor.name, searchValue);
        if (filterField)
            convFilterValue = convertIfIntegerType(HotelRoom.getAttributes()[filterField].type.constructor.name, filterValue);
        if (filterOperator === 'isAnyOf' && typeof convFilterValue === 'string')
            convFilterValue = convFilterValue.split(',');

        const order: IOrder<keyof HotelRoom> = {field: orderField, type: orderType};
        const search: ISearch<keyof HotelRoom> = {field: searchField, value: convSearchValue}
        const filter: IFilter<keyof HotelRoom> = {field: filterField, operator: filterOperator, value: convFilterValue}
        
        return await this.hotelRoomService.getPosts(
            limit, 
            offset, 
            order, 
            search, 
            filter
        );
    }

    @Post()
    async createHotelRoom(@Body() body: CreateHotelRoomDto){
        return await this.hotelRoomService.createVisitor(body);
    }
    
    @Put(':hotel_id/:hotel_room_number')
    async editHotelRoom(
        @Param('hotel_id', ParseIntPipe) hotelId: number, 
        @Param('hotel_room_number', ParseIntPipe) hotelRoomNumber: number, 
        @Body() body: UpdateHotelRoomDto
    ){
        return await this.hotelRoomService.editVisitor(body, hotelId, hotelRoomNumber);
    }

    @Delete(':hotel_id/:hotel_room_number')
    async deleteVisitor(
        @Param('hotel_id', ParseIntPipe) hotelId: number, 
        @Param('hotel_room_number', ParseIntPipe) hotelRoomNumber: number,
    ){
        return await this.hotelRoomService.deleteVisitor(hotelId, hotelRoomNumber);
    }
}
