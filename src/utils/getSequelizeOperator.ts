import { Op } from "sequelize"
import { IFilter, IOperatorMark } from "src/models"

export const getSequeilizeOperator = (operator: IOperatorMark, value: IFilter['value']): any => {
    switch (operator) {
        case 'isNotEmpty':
            return {[Op.ne]: null};
        case '!=':
            return {[Op.ne]: value};
        case '<':
            return {[Op.lt]: value};
        case '>':
            return {[Op.gt]: value};
        case '<=':
            return {[Op.lte]: value};
        case '>=':
            return {[Op.gte]: value};
        case 'isEmpty':
            return {[Op.eq]: null};
        case 'contains':
            return {[Op.iLike]: value};
        case 'startsWith':
            return {[Op.startsWith]: value};
        case 'endWith':
            return {[Op.endsWith]: value};
        case 'isAnyOf':
            return {[Op.iLike]: { [Op.any]: value}};
        case '=':
        case 'equals':
        default:
            return {[Op.eq]: value};
    }
}