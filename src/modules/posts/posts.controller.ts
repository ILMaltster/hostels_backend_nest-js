import { Controller, Get } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService){}

    @Get()
    async create(){
        // return this.postService.create();
        return '123';
    }

}
