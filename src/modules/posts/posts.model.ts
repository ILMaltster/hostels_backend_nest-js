import { Column, DataType, Table, Model } from "sequelize-typescript";
import { CreatePostDto } from "./dto/create-post";

@Table({tableName: 'posts', timestamps: false})
export class Post extends Model<Post, CreatePostDto> {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number;

    @Column({type: DataType.STRING, unique: false})
    name: string;
}