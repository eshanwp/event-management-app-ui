import { FC, useState } from "react";
import { ScreenTypesEnum } from "./enums/screen-types.enum.ts";
import Login from "./components/login/Login.tsx";
import ForgotPassword from "./components/forgot-password/ForgotPassword.tsx";
import Registration from "./components/registration/Registration.tsx";

interface AuthProps {}

const Auth: FC<AuthProps> = () => {
     const [screenName, setScreenName] = useState<ScreenTypesEnum>(ScreenTypesEnum.LOGIN);

     const renderScreens = () => {
          switch (screenName) {
               case ScreenTypesEnum.LOGIN: {
                    return <Login setScreenName={setScreenName} />;
               }
               case ScreenTypesEnum.FORGOT_PASSWORD: {
                    return <ForgotPassword setScreenName={setScreenName} />;
               }
               case ScreenTypesEnum.REGISTRATION: {
                    return <Registration setScreenName={setScreenName} />;
               }
               default: {
                    break;
               }
          }
     };

     return (
          <section className="bg-gray-50">
               <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    {renderScreens()}
               </div>
          </section>
     );
};
export default Auth;
