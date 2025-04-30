export interface UserPayload {
    id? : string,
    username : string,
    email : string,
    password : string,
    role? : string
}

export interface ProductPayload {

    id? : string,
    label : string,
    price : number,
    category : any,
    quantity : number,
    imgUrl : string,
    publicId : string
}