import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from './posts.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    SequelizeModule.forFeature([Post])
  ]
})
export class PostsModule {}
