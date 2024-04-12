export interface IPaginationModel<T>{
    rows: T[];
    count: number;
    limit: number;
}

export type IOrderTypes = "desc" | "asc";

export interface IOrder<T = any> {
    field: T;
    type: IOrderTypes;
}

export interface IFilter<T = any> {
    field: T;
    value: string | number;
}