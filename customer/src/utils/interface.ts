export interface IProduct{
    _id: string,
    name: string,
    desc: string,
    banner: string,
    price: number,
    available: boolean,
}

export interface Icustomer {
    _id:string
    email: string, 
    password: string, 
    phone:string, 
    salt:string, 
}

export interface Iaddress {
    _id:string, 
    street:string, 
    postalCode:string, 
    city:string, 
    country:string
}