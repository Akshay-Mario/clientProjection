
import { ColDef } from 'ag-grid-community';

export interface IapiProjectionModel {
    id: number;
   apiName: string, 
   apiYear:  number,
   apiPeakHour:  number,
   apiPeakDay:  number
}

export interface IapiColDef extends ColDef{
    id?: number;
    ApiName?: string;
    Year?: number;
    apiPeakHour?: number;
    apiPeakDay?: number;
    action?: string;
    data?: any;
}
