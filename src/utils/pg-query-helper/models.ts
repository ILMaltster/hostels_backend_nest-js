export interface ISelecetWhere {
    field: string;
    value: string | number;
} 

export interface ISelectOrder {
    fields: string[];
    orderName: 'DESC' | 'ASC';
} 