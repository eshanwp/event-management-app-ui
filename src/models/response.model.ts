export default interface ResponseModel<T> {
     success: boolean;
     message: string;
     details: string;
     data: T;
}
