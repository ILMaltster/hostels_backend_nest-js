import { Op } from "sequelize";

/**
 * Возвращает подходящую операцию для поиска по типу переданного значения.
 * @param value значение.
*/
export const getSearchOperation = (value: string | number): any => {
    return (typeof value === 'number' ? {[Op.eq]: value} : {[Op.iLike]: `%${value}%`} );
}