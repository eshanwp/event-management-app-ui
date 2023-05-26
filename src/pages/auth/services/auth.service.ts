import LoginRequestModel from "../models/request/login-request.model.ts";
import axiosInstance from "../../../config/axios/axios-instance.ts";
import LoginResponseModel from "../models/response/login-response.model.ts";
import ApiUrls from "../../../constants/api-urls.ts";
import { getErrorMessage, showNotification } from "../../../helpers/notification-helper.ts";
import store from "../../../store/store.ts";
import authSlice from "../store/auth.slice.ts";
import RegistrationRequestModel from "../models/request/registration-request.model.ts";
import ResponseModel from "../../../models/response.model.ts";
import ForgotPasswordRequestModel from "../models/request/forgot-password-request.model.ts";
import PasswordResetRequestModel from "../models/request/password-reset-request.model.ts";

/**
 * @des handle user login.
 * @param loginRequestModel
 */
export const login = async (loginRequestModel: LoginRequestModel): Promise<void> => {
     try {
          const apiResponse = await axiosInstance.post<LoginResponseModel>(`${ApiUrls.AUTH_LOGIN}`, loginRequestModel);
          store.dispatch(authSlice.actions.setAuth(apiResponse.data));
     } catch (error: any) {
          if (error.response.status === 401) {
               showNotification("error", "The username or password you entered is incorrect. Please try again");
          } else {
               showNotification("error", getErrorMessage(error));
          }
          throw new Error("API Error");
     }
};

/**
 * @des handle user registration.
 * @param registrationRequestModel
 */
export const registration = async (registrationRequestModel: RegistrationRequestModel): Promise<void> => {
     try {
          const apiResponse = await axiosInstance.post<ResponseModel<null>>(
               `${ApiUrls.AUTH_REGISTRATION}`,
               registrationRequestModel,
          );
          showNotification("success", apiResponse.data.details);
     } catch (error) {
          showNotification("error", getErrorMessage(error));
          throw new Error("API Error");
     }
};

/**
 * @des handle user forgot password.
 * @param forgotPasswordRequestModel
 */
export const forgotPassword = async (forgotPasswordRequestModel: ForgotPasswordRequestModel): Promise<void> => {
     try {
          const apiResponse = await axiosInstance.post<ResponseModel<null>>(
               `${ApiUrls.AUTH_FORGOT_PASSWORD}`,
               forgotPasswordRequestModel,
          );
          showNotification("success", apiResponse.data.details);
     } catch (error) {
          showNotification("error", getErrorMessage(error));
          throw new Error("API Error");
     }
};

/**
 * @des handle user password reset.
 * @param passwordResetRequestModel
 */
export const passwordReset = async (passwordResetRequestModel: PasswordResetRequestModel): Promise<void> => {
     try {
          const apiResponse = await axiosInstance.post<ResponseModel<null>>(
               `${ApiUrls.AUTH_PASSWORD_RESET}`,
               passwordResetRequestModel,
          );
          showNotification("success", apiResponse.data.details);
     } catch (error) {
          showNotification("error", getErrorMessage(error));
          throw new Error("API Error");
     }
};
