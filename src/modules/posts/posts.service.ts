import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
    create(cat: any){
        return [123, 321]
    }
}
