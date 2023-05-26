import { Dispatch, FC, SetStateAction } from "react";
import { Form, Input } from "antd";
import { ScreenTypesEnum } from "../../enums/screen-types.enum.ts";
import { useMutation } from "react-query";
import LoginRequestModel from "../../models/request/login-request.model.ts";
import { login } from "../../services/auth.service.ts";
import { useNavigate } from "react-router-dom";

interface LoginProps {
     setScreenName: Dispatch<SetStateAction<ScreenTypesEnum>>;
}

const Login: FC<LoginProps> = ({ setScreenName }) => {
     const navigate = useNavigate();

     const [loginForm] = Form.useForm();

     const { mutate: loginMutate } = useMutation({
          //A function that performs an asynchronous user login and returns a promise.
          mutationFn: (loginRequestModel: LoginRequestModel) => login(loginRequestModel),
          //This function will reset the form when the mutation is successful
          onSuccess: () => {
               navigate("/");
          },
     });

     /**
      * @des handle user login
      */
     const handleLogin = (values: any) => {
          const loginRequestModel: LoginRequestModel = {
               username: values.email,
               password: values.password,
          };
          loginMutate(loginRequestModel);
     };

     return (
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
               <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                         Sign in to your account
                    </h1>
                    <Form layout="vertical" form={loginForm} className="space-y-4 md:space-y-6" onFinish={handleLogin}>
                         <Form.Item
                              label="Email"
                              name="email"
                              rules={[
                                   {
                                        message: "You can't keep this as empty",
                                        required: true,
                                   },
                                   {
                                        message: "Invalid email",
                                        type: "email",
                                   },
                              ]}>
                              <Input
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                   placeholder="name@company.com"
                              />
                         </Form.Item>

                         <Form.Item
                              label="Password"
                              name="password"
                              rules={[
                                   {
                                        message: "You can't keep this as empty",
                                        required: true,
                                   },
                              ]}>
                              <Input.Password
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600  w-full p-2.5"
                                   placeholder="••••••••"
                              />
                         </Form.Item>

                         <div className="flex items-center justify-between">
                              <div
                                   onClick={() => setScreenName(ScreenTypesEnum.FORGOT_PASSWORD)}
                                   className="text-sm font-medium text-primary-600 hover:underline">
                                   Forgot password?
                              </div>
                         </div>
                         <button
                              type="submit"
                              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200">
                              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                                   Sign in
                              </span>
                         </button>
                         <p className="text-sm font-light text-gray-500">
                              Don’t have an account yet?{" "}
                              <div
                                   onClick={() => setScreenName(ScreenTypesEnum.REGISTRATION)}
                                   className="font-medium text-primary-600 hover:underline">
                                   Sign up
                              </div>
                         </p>
                    </Form>
               </div>
          </div>
     );
};
export default Login;
