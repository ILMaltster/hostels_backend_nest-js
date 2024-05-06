import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStaffDto } from './dto/create-staff';
import { UpdateStaffDto } from './dto/update-staff';
import { IFilter, IOrder, IPaginationModel, ISearch } from 'src/models';
import { Op, WhereOptions } from 'sequelize';
import sequelize from 'sequelize';
import { getSequeilizeOperator } from 'src/utils/getSequelizeOperator';
import { getSearchOperation } from 'src/utils/getSearchOperation';
import { Staff } from './staff.model';

@Injectable()
export class StaffService {
    constructor(@InjectModel(Staff) private staffRepository: typeof Staff){}

    public async getPosts(
        limit: number, 
        offset: number, 
        order?: IOrder<keyof Staff>, 
        search?: ISearch<keyof Staff>, 
        filter?: IFilter<keyof Staff>
    ){
        const where: WhereOptions<Staff> | undefined = search.field 
            ? sequelize.where(sequelize.col(search.field), getSearchOperation(search.value))
            : undefined

        const filterSearch: WhereOptions<Staff> | undefined = filter.field 
            ? sequelize.where(sequelize.col(filter.field), getSequeilizeOperator(filter.operator, filter.value))
            : undefined

        const {count, rows} = await this.staffRepository.findAndCountAll({
            limit, 
            offset, 
            where: {
                [Op.and]: [
                    filterSearch,
                    where,
                ]
            },
            order: [[order.field || 'first_name', order.type || 'desc']]
        });

        const paginationPosts: IPaginationModel<Staff> = {count, rows, limit};
        return paginationPosts;
    }

    public async createPost(dto: CreateStaffDto){
        return this.staffRepository.create(dto);
    }
    
    public async editPost(body: UpdateStaffDto, id: number){
        return this.staffRepository.update(body, {where: {id}});   
    }

    public async deletePost(id: number){
        return this.staffRepository.destroy({where: {id}});   
    }
}
