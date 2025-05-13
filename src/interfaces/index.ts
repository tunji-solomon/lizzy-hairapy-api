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

export interface OrderPayload {
    id? : string,
    username : string,
    orderId : string,
    products : any,
    totalCost : number,
    paymentReceiptUrl : string,
    publicId : string,
    paymentConfirmed : boolean
}