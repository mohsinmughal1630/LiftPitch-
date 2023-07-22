export interface ApiResponseHandler<T> {
    message: String,
    data: T,
    resultCode : number
}