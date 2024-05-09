import { Controller, Get, Param, Put, Query, Body, Post, Delete, ParseIntPipe  } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking';
import { UpdateHotelRoomDto } from './dto/update-booking';
import { IFilter, IOrder, ISearch } from 'src/models';
import { Booking } from './bookings.model';
import { BookingsService } from './bookings.service';

/**
 * Функция предназначена для конвертирования типа значения по наименованию поля.
 * @param type тип, полученный из модели.
 * @param value значение для преобразования.
 * @returns преобразованное значение.
 */
const convertIfIntegerType = (type: string, value: string | number): string | number => {
    return type === 'INTEGER' ? Number(value) : value
}

@Controller('bookings')
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService){}

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
            convSearchValue = convertIfIntegerType(Booking.getAttributes()[searchField].type.constructor.name, searchValue);
        if (filterField)
            convFilterValue = convertIfIntegerType(Booking.getAttributes()[filterField].type.constructor.name, filterValue);
        if (filterOperator === 'isAnyOf' && typeof convFilterValue === 'string')
            convFilterValue = convFilterValue.split(',');

        const order: IOrder<keyof Booking> = {field: orderField, type: orderType};
        const search: ISearch<keyof Booking> = {field: searchField, value: convSearchValue}
        const filter: IFilter<keyof Booking> = {field: filterField, operator: filterOperator, value: convFilterValue}
        
        return await this.bookingsService.getBookings(
            Number(limit), 
            Number(offset), 
            order, 
            search, 
            filter
        );
    }

    @Post()
    async createHotelRoom(@Body() body: CreateBookingDto){
        return await this.bookingsService.createBooking(body);
    }
    
    @Put(':id/')
    async editHotelRoom(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateHotelRoomDto){
        return await this.bookingsService.editBooking(body, id);
    }

    @Delete(':id')
    async deleteVisitor(@Param('id', ParseIntPipe) id: number){
        return await this.bookingsService.deleteBooking(id);
    }
}
