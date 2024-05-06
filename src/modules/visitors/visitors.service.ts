import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateVisitorDto } from './dto/create-staff';
import { UpdateVisitorDto } from './dto/update-staff';
import { IFilter, IOrder, IPaginationModel, ISearch } from 'src/models';
import { Op, WhereOptions } from 'sequelize';
import sequelize from 'sequelize';
import { getSequeilizeOperator } from 'src/utils/getSequelizeOperator';
import { getSearchOperation } from 'src/utils/getSearchOperation';
import { Visitor } from './visitors.model';

@Injectable()
export class VisitorService {
    constructor(@InjectModel(Visitor) private visitorsRepository: typeof Visitor){}

    public async getPosts(
        limit: number, 
        offset: number, 
        order?: IOrder<keyof Visitor>, 
        search?: ISearch<keyof Visitor>, 
        filter?: IFilter<keyof Visitor>
    ){
        const where: WhereOptions<Visitor> | undefined = search.field 
            ? sequelize.where(sequelize.col(search.field), getSearchOperation(search.value))
            : undefined

        const filterSearch: WhereOptions<Visitor> | undefined = filter.field 
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
            order: [[order.field || 'first_name', order.type || 'desc']]
        });

        const paginationPosts: IPaginationModel<Visitor> = {count, rows, limit};
        return paginationPosts;
    }

    public async createPost(dto: CreateVisitorDto){
        return this.visitorsRepository.create(dto);
    }
    
    public async editPost(body: UpdateVisitorDto, id: number){
        return this.visitorsRepository.update(body, {where: {id}});   
    }

    public async deletePost(id: number){
        return this.visitorsRepository.destroy({where: {id}});   
    }
}
