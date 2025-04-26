export interface UserPayload {
    id? : string,
    username : string,
    email : string,
    password : string
}

export interface ProductPayload {

    id? : string,
    name : string,
    price : number,
    category : any,
    quantity : number,
    image : string,
}