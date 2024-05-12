import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateHotelRoomDto } from './dto/create-hotel-room';
import { UpdateHotelRoomDto } from './dto/update-hotel-room';
import { IFilter, IOrder, IPaginationModel, ISearch } from 'src/models';
import { Op, WhereOptions } from 'sequelize';
import sequelize from 'sequelize';
import { getSequeilizeOperator } from 'src/utils/getSequelizeOperator';
import { getSearchOperation } from 'src/utils/getSearchOperation';
import { HotelRoom } from './hotel-rooms.model';

@Injectable()
export class HotelRoomsService {
    constructor(@InjectModel(HotelRoom) private hotelRoomsRepository: typeof HotelRoom){}

    public async getPosts(
        limit: number, 
        offset: number, 
        order?: IOrder<keyof HotelRoom>, 
        search?: ISearch<keyof HotelRoom>, 
        filter?: IFilter<keyof HotelRoom>
    ){
        const where: WhereOptions<HotelRoom> | undefined = search.field 
            ? sequelize.where(sequelize.col(search.field), getSearchOperation(search.value))
            : undefined

        const filterSearch: WhereOptions<HotelRoom> | undefined = filter.field 
            ? sequelize.where(sequelize.col(filter.field), getSequeilizeOperator(filter.operator, filter.value))
            : undefined

        let {count, rows} = await this.hotelRoomsRepository.findAndCountAll({
            limit, 
            offset, 
            where: {
                [Op.and]: [
                    filterSearch,
                    where,
                ]
            },
            order: [[order.field || 'hotel_id', order.type || 'desc']]
        });

        rows.forEach((row, index) => {
            // @ts-ignore
            rows[index].price_per_day = rows[index].price_per_day.replace('?', '')
        })

        const paginationPosts: IPaginationModel<HotelRoom> = {count, rows, limit};
        return paginationPosts;
    }

    public async createVisitor(dto: CreateHotelRoomDto){
        return this.hotelRoomsRepository.create(dto);
    }
    
    public async editVisitor(body: UpdateHotelRoomDto, hotelId: number, hotelRoomNumber: number){
        let parsedBody = {
            ...body,
            price_per_day: Number(body.price_per_day.replace(/\s+/g, '').replaceAll(',', '.'))
        }
        console.log(parsedBody);
        return this.hotelRoomsRepository.update(parsedBody, {
            where: {
                'hotel_id': hotelId, 
                'hotel_room_number':hotelRoomNumber
            }
        });   
    }

    public async deleteVisitor( hotelId: number, hotelRoomNumber: number){
        return this.hotelRoomsRepository.destroy({ where: {
            'hotel_id': hotelId, 
            'hotel_room_number':hotelRoomNumber
        }});   
    }
}
