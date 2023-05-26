import { Dispatch, FC, SetStateAction } from "react";
import { Checkbox, Form, Input } from "antd";
import { ScreenTypesEnum } from "../../enums/screen-types.enum.ts";
import { useMutation } from "react-query";
import { registration } from "../../services/auth.service.ts";
import RegistrationRequestModel from "../../models/request/registration-request.model.ts";

interface RegistrationProps {
     setScreenName: Dispatch<SetStateAction<ScreenTypesEnum>>;
}

const Registration: FC<RegistrationProps> = ({ setScreenName }) => {
     const [registrationForm] = Form.useForm();

     const { mutate: registrationMutate } = useMutation({
          //A function that performs an asynchronous user registration and returns a promise.
          mutationFn: (registrationRequestModel: RegistrationRequestModel) => registration(registrationRequestModel),
          //This function will reset the form when the mutation is successful
          onSuccess: () => {
               setScreenName(ScreenTypesEnum.LOGIN);
          },
     });

     /**
      * @des handle user registration
      */
     const handleRegistration = (values: any) => {
          const registrationRequestModel: RegistrationRequestModel = {
               email: values.email,
               password: values.password,
          };
          registrationMutate(registrationRequestModel);
     };

     return (
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
               <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                         Create and account
                    </h1>
                    <Form
                         layout="vertical"
                         form={registrationForm}
                         className="space-y-4 md:space-y-6"
                         onFinish={handleRegistration}>
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
                                                  new Error("The two passwords that you entered do not match!"),
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
                                   Create an account
                              </span>
                         </button>

                         <p className="text-sm font-light text-gray-500">
                              Already have an account?{" "}
                              <div
                                   onClick={() => setScreenName(ScreenTypesEnum.LOGIN)}
                                   className="font-medium text-primary-600 hover:underline">
                                   Login here
                              </div>
                         </p>
                    </Form>
               </div>
          </div>
     );
};
export default Registration;
