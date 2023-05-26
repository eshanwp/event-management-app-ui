export default interface PasswordResetRequestModel {
     email: string;
     token: string;
     code: string;
     password: string;
}
