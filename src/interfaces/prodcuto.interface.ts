export interface Producto{
    error: boolean;
    productos: Array<ProducotDato>
}

export interface ProducotDato {
    codigo: string;
    producto: string;
    linea: string;
    linea_id: number;
    proveedor: string;
    descripcion: string;
    precio_compra: number;   
}