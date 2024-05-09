import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBookingDto } from './dto/create-booking';
import { UpdateHotelRoomDto } from './dto/update-booking';
import { IFilter, IOrder, IPaginationModel, ISearch } from 'src/models';
import { Op, WhereOptions } from 'sequelize';
import sequelize from 'sequelize';
import { getSequeilizeOperator } from 'src/utils/getSequelizeOperator';
import { getSearchOperation } from 'src/utils/getSearchOperation';
import { Booking } from './bookings.model';

@Injectable()
export class BookingsService {
    constructor(@InjectModel(Booking) private visitorsRepository: typeof Booking){}

    public async getBookings(
        limit: number, 
        offset: number, 
        order?: IOrder<keyof Booking>, 
        search?: ISearch<keyof Booking>, 
        filter?: IFilter<keyof Booking>
    ){
        const where: WhereOptions<Booking> | undefined = search.field 
            ? sequelize.where(sequelize.col(search.field), getSearchOperation(search.value))
            : undefined

        const filterSearch: WhereOptions<Booking> | undefined = filter.field 
            ? sequelize.where(sequelize.col(filter.field), getSequeilizeOperator(filter.operator, filter.value))
            : undefined

        const {count, rows} = await this.visitorsRepository.findAndCountAll({
            limit, 
            offset, 
            where: {
                [Op.and]: [
                    filterSearch,
                    where,
                ]
            },
            order: [[order.field || 'arrival_date', order.type || 'desc']]
        });

        const paginationPosts: IPaginationModel<Booking> = {count, rows, limit};
        return paginationPosts;
    }

    public async createBooking(dto: CreateBookingDto){
        return this.visitorsRepository.create(dto);
    }
    
    public async editBooking(body: UpdateHotelRoomDto, id: number){
        return this.visitorsRepository.update(body, {
            where: { id }
        });   
    }

    public async deleteBooking(id: number){
        return this.visitorsRepository.destroy({ where: { id }});   
    }
}
