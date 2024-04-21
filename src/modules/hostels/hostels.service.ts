import { Injectable } from '@nestjs/common';
import { Hostel } from './hostels.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateHostelDto } from './dto/create-hostel';
import { UpdateHostelDto } from './dto/update-hostel';
import { IFilter, IOrder, IPaginationModel, ISearch } from 'src/models';
import { Op, WhereOptions } from 'sequelize';
import sequelize from 'sequelize';
import { getSequeilizeOperator } from 'src/utils/getSequelizeOperator';

@Injectable()
export class HostelsService {
    constructor(@InjectModel(Hostel) private hostelRepository: typeof Hostel){}

    public async getHostels(
        limit: number, 
        offset: number, 
        order?: IOrder<keyof Hostel>, 
        search?: ISearch<keyof Hostel>, 
        filter?: IFilter<keyof Hostel>
    ){
        const where: WhereOptions<Hostel> | undefined = search.field 
            ? sequelize.where(sequelize.cast(sequelize.col(search.field), 'varchar'), { [Op.iLike]: `%${search.value}%`})
            : undefined

        const filterSearch: WhereOptions<Hostel> | undefined = filter.field 
            ? sequelize.where(sequelize.cast(sequelize.col(search.field), 'varchar'), { [getSequeilizeOperator(filter.operator)]: search.value ?? null})
            : undefined

        const {count, rows} = await this.hostelRepository.findAndCountAll({
            limit, 
            offset, 
            where: {
                [Op.and]: [
                    where,
                    filterSearch
                ]
            },
            order: [[order.field || 'name', order.type || 'desc']]
        });

        const paginationHostel: IPaginationModel<Hostel> = {count, rows, limit};
        return paginationHostel;
    }

    public async createHostel(dto: CreateHostelDto){
        return this.hostelRepository.create(dto);
    }
    
    public async editHostel(body: UpdateHostelDto, tin: string){
        return this.hostelRepository.update(body, {where: {tin}});   
    }

    public async deleteHostel(tin: string){
        return this.hostelRepository.destroy({where: {tin}});   
    }
}
