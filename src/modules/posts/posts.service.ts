import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDto } from './dto/create-post';
import { UpdatePostDto } from './dto/update-post';
import { IFilter, IOrder, IPaginationModel, ISearch } from 'src/models';
import { Op, WhereOptions } from 'sequelize';
import sequelize from 'sequelize';
import { getSequeilizeOperator } from 'src/utils/getSequelizeOperator';
import { getSearchOperation } from 'src/utils/getSearchOperation';
import { Post } from './posts.model';

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post) private postsRepository: typeof Post){}

    public async getPosts(
        limit: number, 
        offset: number, 
        order?: IOrder<keyof Post>, 
        search?: ISearch<keyof Post>, 
        filter?: IFilter<keyof Post>
    ){
        const where: WhereOptions<Post> | undefined = search.field 
            ? sequelize.where(sequelize.col(search.field), getSearchOperation(search.value))
            : undefined

        const filterSearch: WhereOptions<Post> | undefined = filter.field 
            ? sequelize.where(sequelize.col(filter.field), getSequeilizeOperator(filter.operator, filter.value))
            : undefined

        const {count, rows} = await this.postsRepository.findAndCountAll({
            limit, 
            offset, 
            where: {
                [Op.and]: [
                    filterSearch,
                    where,
                ]
            },
            order: [[order.field || 'name', order.type || 'desc']]
        });

        const paginationPosts: IPaginationModel<Post> = {count, rows, limit};
        return paginationPosts;
    }

    public async createPost(dto: CreatePostDto){
        return this.postsRepository.create(dto);
    }
    
    public async editPost(body: UpdatePostDto, id: number){
        return this.postsRepository.update(body, {where: {id}});   
    }

    public async deletePost(id: number){
        return this.postsRepository.destroy({where: {id}});   
    }
}
