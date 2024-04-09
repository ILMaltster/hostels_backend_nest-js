import { Injectable } from '@nestjs/common';
import { Hostel } from './hostels.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateHostelDto } from './dto/create-hostel';
import { UpdateHostelDto } from './dto/update-hostel';
import { IPaginationModel } from 'src/models';

@Injectable()
export class HostelsService {
    constructor(@InjectModel(Hostel) private hostelRepository: typeof Hostel){}

    public async getHostels(limit: number, offset: number){
        const {count, rows} = await this.hostelRepository.findAndCountAll({limit, offset, order: [['name', 'DESC']]})
        const paginationHostel: IPaginationModel<Hostel> = {count, rows, limit}
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
