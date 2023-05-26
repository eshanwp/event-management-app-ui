import { FC, useEffect } from "react";
import { Checkbox, Form, Input } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "react-query";
import { passwordReset } from "../../services/auth.service.ts";
import PasswordResetRequestModel from "../../models/request/password-reset-request.model.ts";

interface PasswordResetProps {}

const PasswordReset: FC<PasswordResetProps> = () => {
     const navigate = useNavigate();
     const [searchParams] = useSearchParams();
     const [passwordResetForm] = Form.useForm();

     useEffect(() => {
          passwordResetForm.setFieldsValue({
               email: searchParams.get("email"),
          });
     }, [searchParams]);

     const { mutate: passwordResetMutate } = useMutation({
          //A function that performs an asynchronous password reset and returns a promise.
          mutationFn: (passwordResetRequestModel: PasswordResetRequestModel) =>
               passwordReset(passwordResetRequestModel),
          //This function will reset the form when the mutation is successful
          onSuccess: () => {
               navigate("/");
          },
     });

     /**
      * @des handle user password reset
      */
     const handlePasswordRest = (values: any) => {
          const passwordResetRequestModel: PasswordResetRequestModel = {
               email: values.email,
               password: values.password,
               code: searchParams.get("code") ?? "",
               token: searchParams.get("token") ?? "",
          };
          passwordResetMutate(passwordResetRequestModel);
     };

     return (
          <section className="bg-gray-50">
               <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                         <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                   Change Password
                              </h1>
                              <Form
                                   layout="vertical"
                                   form={passwordResetForm}
                                   className="space-y-4 md:space-y-6"
                                   onFinish={handlePasswordRest}>
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
                                             readOnly={true}
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

                                   <Form.Item
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        dependencies={["password"]}
                                        rules={[
                                             {
                                                  required: true,
                                                  message: "Please confirm your password!",
                                             },
                                             ({ getFieldValue }) => ({
                                                  validator(_, value) {
                                                       if (!value || getFieldValue("password") === value) {
                                                            return Promise.resolve();
                                                       }
                                                       return Promise.reject(
                                                            new Error(
                                                                 "The two passwords that you entered do not match!",
                                                            ),
                                                       );
                                                  },
                                             }),
                                        ]}>
                                        <Input.Password
                                             className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600  w-full p-2.5"
                                             placeholder="••••••••"
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
                                                                        new Error(
                                                                             "Please  accept the Terms and Conditions",
                                                                        ),
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
                                             Change Password
                                        </span>
                                   </button>
                              </Form>
                         </div>
                    </div>
               </div>
          </section>
     );
};
export default PasswordReset;
