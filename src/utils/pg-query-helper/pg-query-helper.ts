import {ISelecetWhere, ISelectOrder} from './models'

const typeWrapper = (value) => typeof value === 'number' ? value : `'${value}'`


export class PgQueryHelper{
    static Insert(database: string, values: Record<string, number | string>): string{

        const fieldsNames = Object.keys(values);

        const fieldsNamesParsed = fieldsNames.reduce((acc, name, index, {length})=> acc += (name + (index < (length - 1) ? ', ': '') ), '')
        const valuesParsed = Object.values(values).reduce((acc, value, index, {length})=> acc += typeWrapper(value) + (index < (length - 1) ? ', ': '' ), '')

        const res = (
        `INSERT INTO ${database} (${fieldsNamesParsed}) ` +
        `VALUES (${valuesParsed})`
        )

        return res;
    }

    static Update(database: string, body: Record<string, string | number>, id: string): string {
        const faluesToUpdateString: string = Object.entries(body).reduce((acc, item, index, {length}) => acc += `${item[0]} = ${typeWrapper(item[1])}`  + (index < (length - 1) ? ', ': ''), '')
        
        return `UPDATE ${database} SET ${faluesToUpdateString} where tin=${typeWrapper(id)}`;
    }

    // static Select(database: string, feilds: string[] | string = '*', where?: ISelecetWhere, order?: ISelectOrder): string {
    //     let fieldsString: string = '';
    //     if (feilds !== '*' && Array.isArray(feilds)) fieldsString = feilds.reduce((acc, name, index, {length})=> acc += (name + (index < (length - 1) ? ', ': '') ), '');
        
    //     let whereString: string = '';
    //     if (where){
    //         where.
    //         const whereString = 'WHERE '

    //     }

    //     return `SELECT ${fieldsString} FROM ${database}`;
    // }
}



// export class PgQueryHelper{
//     static Insert(database: string, values: Array<number | string>, fieldsName: Array<number | string>): string{
        
//         return `
//             INSERT INTO ${database} (${fieldsName.map((name, index, {length})=> `${name}` + (index < length - 1 ? ', ': '' ))}) 
//             VALUE (${values.map((name, index, {length})=> `'${name}'` + (index < length - 1 ? ', ': '' ))})
//         `;
//     }
// }