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
    operator: IOperatorMark;
    value?: string | number | Array<string | number>;
}

export interface ISearch<T = any> {
    field: T;
    value: string | number;
}

type TGenericOperatorMark = 'isEmpty' | 'isNotEmpty' | 'isAnyOf'
export type TIntegerOperatorMark = '>' | '<' | '=' | '!=' | '>=' | '<=' | TGenericOperatorMark;
export type TStringOperatorMark = 'contains' | 'equals' | 'startsWith' | 'endWith' | TGenericOperatorMark;
export type IOperatorMark = TIntegerOperatorMark | TStringOperatorMark;