import { Injectable } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { IPaginationModel } from 'src/models';


@Injectable()
export class ReportsService {
    constructor(private sequelize: Sequelize) {}
    public async profitableRooms(from: Date, to: Date, limit: number, offset: number){
        const count = Number((await this.sequelize.query<{count: number}>(
            `SELECT count(*) from (` +
            `SELECT hr.description, b.hotel_room_id, b.hotel_id, sum(price_per_day/capacity) ` +
            `FROM bookings b JOIN hotel_rooms hr on hotel_room_id = hotel_room_number ` +
            `WHERE arrival_date between '${from.toLocaleDateString()}' and '${to.toLocaleDateString()}' ` +
            `GROUP BY (b.hotel_room_id, b.hotel_id, hr.description))`,
            {type: QueryTypes.SELECT}
            ))[0].count);

        const profitableRooms = await this.sequelize.query(
            `SELECT hr.description, b.hotel_room_id, b.hotel_id, sum(price_per_day/capacity) ` +
            `FROM bookings b JOIN hotel_rooms hr on hotel_room_id = hotel_room_number ` +
            `WHERE arrival_date between '${from.toLocaleDateString()}' and '${to.toLocaleDateString()}' ` +
            `GROUP BY (b.hotel_room_id, b.hotel_id, hr.description) ` +
            `order by sum desc ` +
            `LIMIT ${limit} OFFSET ${offset}`
            , {
            type: QueryTypes.SELECT,
          });

          const paginationProfitableRooms: IPaginationModel<any> = {count, rows: profitableRooms, limit};


          return paginationProfitableRooms;
    }
    public async frequentCustomer(hostelId, limit: number, offset: number){
        const count = Number((await this.sequelize.query<{count: number}>(
            `SELECT count(*) from (` +
            `SELECT v.id as visitor_id FROM visitors v ` +
            `join bookings b on v.id = b.visitor_id ` +
            `JOIN hotel_rooms hr on hotel_room_id = hotel_room_number ` +
            `where hr.hotel_id = ${hostelId} ` +
            `group by (v.id))`,
            {type: QueryTypes.SELECT}
            ))[0].count);
        

        const frequentCustomer = await this.sequelize.query(
            `SELECT v.id as visitor_id, concat_ws(' ', v.first_name, v.second_name, v.third_name) as FIO, count(v.id) as orders, sum(hr.price_per_day * (b.departure_date -b.arrival_date))` +
            `FROM visitors v ` +
            `join bookings b on v.id = b.visitor_id ` +
            `JOIN hotel_rooms hr on hotel_room_id = hotel_room_number ` +
            `where hr.hotel_id = ${hostelId} ` +
            `group by (v.id) ` +
            `order by orders desc ` +
            `LIMIT ${limit} OFFSET ${offset}`,
            {type: QueryTypes.SELECT}
            );
            
          //сделать select на подсчет всего записей и сделать limit
          const paginationFrequentCustomer: IPaginationModel<any> = {count, rows: frequentCustomer, limit};

          return paginationFrequentCustomer;
    }

}
