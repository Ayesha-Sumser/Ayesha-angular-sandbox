export interface StarshipDTO <T> {
    success: boolean;
    //conditional optional
    results: T extends undefined ? never : T;
    error: undefined extends T ? string : never;
}