import { Op } from "sequelize"
import { IOperatorMark } from "src/models"

export const getSequeilizeOperator = (operator: IOperatorMark): symbol => {
    switch (operator) {
        case 'isNotEmpty':
        case '!=':
            return Op.ne;
        case '<':
            return Op.lt;
        case '>':
            return Op.gt;
        case '<=':
            return Op.lte;
        case '>=':
            return Op.gte;
        case 'isEmpty':
        case '=':
        case 'equals':
        default:
            return Op.eq;
        case 'contains':
            return Op.contains;
        case 'startWith':
            return Op.startsWith;
        case 'endWith':
            return Op.endsWith;
        case 'isAnyOf':
            return Op.any;
    }
}