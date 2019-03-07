import { ProducotDato } from './prodcuto.interface';
export interface Ordenes {
    error: boolean;
    ordenes: Array<Orden>;
}
export interface Orden {
    id: number;
    creado_en: string;
    detalle: Array<ProducotDato>;
}