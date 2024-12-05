export interface DTO<T> {
    success : boolean;
    data : T extends undefined? never:T; //data is always optional
    error : undefined extends T? string : never; // if there is data no error but no data there will be error
    // if T  is undefined then error is of type string compare to data if T is undefined data is of type error
}
