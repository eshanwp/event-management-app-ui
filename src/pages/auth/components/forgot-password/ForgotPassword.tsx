import { Dispatch, FC, SetStateAction } from "react";
import { Checkbox, Form, Input } from "antd";
import { useMutation } from "react-query";
import { forgotPassword } from "../../services/auth.service.ts";
import { ScreenTypesEnum } from "../../enums/screen-types.enum.ts";
import ForgotPasswordRequestModel from "../../models/request/forgot-password-request.model.ts";

interface ForgotPasswordProps {
     setScreenName: Dispatch<SetStateAction<ScreenTypesEnum>>;
}

const ForgotPassword: FC<ForgotPasswordProps> = ({ setScreenName }) => {
     const [forgotPasswordPropsForm] = Form.useForm();

     const { mutate: forgotPasswordMutate } = useMutation({
          //A function that performs an asynchronous forgot password and returns a promise.
          mutationFn: (forgotPasswordRequestModel: ForgotPasswordRequestModel) =>
               forgotPassword(forgotPasswordRequestModel),
          //This function will reset the form when the mutation is successful
          onSuccess: () => {
               setScreenName(ScreenTypesEnum.LOGIN);
          },
     });

     /**
      * @des handle user forgot password
      */
     const handleForgotPassword = (values: any) => {
          const forgotPasswordRequestModel: ForgotPasswordRequestModel = {
               email: values.email,
          };
          forgotPasswordMutate(forgotPasswordRequestModel);
     };

     return (
          <div className="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md">
               <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Forgot Password
               </h2>
               <Form
                    layout="vertical"
                    form={forgotPasswordPropsForm}
                    className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
                    onFinish={handleForgotPassword}>
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

                    <div className="flex items-start">
                         <Form.Item
                              name="agreement"
                              valuePropName="checked"
                              rules={[
                                   {
                                        validator: (_, value) =>
                                             value
                                                  ? Promise.resolve()
                                                  : Promise.reject(
                                                         new Error("Please  accept the Terms and Conditions"),
                                                    ),
                                   },
                              ]}>
                              <Checkbox>
                                   I accept the{" "}
                                   <a className="font-medium text-primary-600 hover:underline" href="#">
                                        Terms and Conditions
                                   </a>
                              </Checkbox>
                         </Form.Item>
                    </div>
                    <button
                         type="submit"
                         className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200">
                         <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                              Reset passwod
                         </span>
                    </button>
               </Form>
          </div>
     );
};
export default ForgotPassword;
