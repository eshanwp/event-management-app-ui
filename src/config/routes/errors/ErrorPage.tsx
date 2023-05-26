import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router-dom";
import { notFound } from "../../../assets/images";
import { Result } from "antd";

const ErrorPage = () => {
     const error: any = useRouteError();
     const navigate = useNavigate();

     if (isRouteErrorResponse(error)) {
          if (error.status === 404) {
               return (
                    <Result
                         icon={<img className="rounded-full w-96 h-96" src={notFound} alt="image description" />}
                         title=""
                         extra={
                              <button
                                   onClick={() => navigate("/")}
                                   className="relative inline-flex justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200">
                                   <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                                        Home
                                   </span>
                              </button>
                         }
                    />
               );
          }
     }

     return <div>Something went wrong</div>;
};
export default ErrorPage;
