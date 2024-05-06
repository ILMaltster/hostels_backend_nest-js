import { Controller, Get, Param, Put, Query, Body, Post, Delete, ParseIntPipe  } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post';
import { UpdatePostDto } from './dto/update-post';
import { IFilter, IOrder, IOrderTypes, ISearch } from 'src/models';
import { PostsService } from './posts.service';
import { Post as ModelPost } from './posts.model';

/**
 * Функция предназначена для конвертирования типа значения по наименованию поля.
 * @param type тип, полученный из модели.
 * @param value значение для преобразования.
 * @returns преобразованное значение.
 */
const convertIfIntegerType = (type: string, value: string | number): string | number => {
    return type === 'INTEGER' ? Number(value) : value
}

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService){}

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
            convSearchValue = convertIfIntegerType(ModelPost.getAttributes()[searchField].type.constructor.name, searchValue);
        if (filterField)
            convFilterValue = convertIfIntegerType(ModelPost.getAttributes()[filterField].type.constructor.name, filterValue);
        if (filterOperator === 'isAnyOf' && typeof convFilterValue === 'string')
            convFilterValue = convFilterValue.split(',');

        const order: IOrder<keyof ModelPost> = {field: orderField, type: orderType};
        const search: ISearch<keyof ModelPost> = {field: searchField, value: convSearchValue}
        const filter: IFilter<keyof ModelPost> = {field: filterField, operator: filterOperator, value: convFilterValue}
        
        return await this.postsService.getPosts(
            Number(limit), 
            Number(offset), 
            order, 
            search, 
            filter
        );
    }

    @Post()
    async createHostel(@Body() body: CreatePostDto){
        return await this.postsService.createPost(body);
    }
    
    @Put(':id')
    async editHostel(@Param('id', ParseIntPipe) id: number, @Body() body: UpdatePostDto){
        return await this.postsService.editPost(body, id);
    }

    @Delete(':id')
    async deleteHostel(@Param('id', ParseIntPipe) id: number){
        return await this.postsService.deletePost(id);
    }
}
