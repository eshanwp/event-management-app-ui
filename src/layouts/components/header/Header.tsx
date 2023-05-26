import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageUrls from "../../../constants/page-urls.ts";
import { useAppSelector } from "../../../store/store.ts";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { authActions } from "../../../pages/auth/store/auth.slice.ts";
import { useDispatch } from "react-redux";

const Header: FC = () => {
     const navigate = useNavigate();
     const dispatch = useDispatch();

     const userName = useAppSelector((state) => state.authSlice.auth?.userName);

     const items: MenuProps["items"] = [
          {
               key: "1",
               label: (
                    <div
                         onClick={() => {
                              dispatch(authActions.setAuth(null));
                              navigate("/");
                         }}>
                         Sign out
                    </div>
               ),
          },
     ];

     return (
          <>
               <header className="fixed top-0 left-0 right-0 z-40">
                    <nav className="bg-white border-gray-200 main-nav">
                         <div className="container xl:max-w-6xl mx-auto px-4">
                              <div className="lg:flex lg:justify-between">
                                   <div className="flex justify-between">
                                        <div className="mx-w-10 text-4xl font-bold capitalize text-gray-900 flex items-center">
                                             Regov Tech
                                        </div>
                                   </div>

                                   <div className="flex flex-row">
                                        <ul className="navbar bg-white lg:bg-transparent w-full hidden text-center lg:text-left lg:flex lg:flex-row text-gray-900 text-sm items-center font-bold">
                                             <li className="relative hover:text-black">
                                                  <Link
                                                       to="/"
                                                       className="block py-3 lg:py-7 px-6 border-b-2 border-transparent">
                                                       Home
                                                  </Link>
                                             </li>
                                             <li className="relative hover:text-black">
                                                  <Link
                                                       to={PageUrls.EVENTS}
                                                       className="block py-3 lg:py-7 px-6 border-b-2 border-transparent">
                                                       Events
                                                  </Link>
                                             </li>
                                             <li className="relative hover:text-black">
                                                  <Link
                                                       to={PageUrls.COMMUNITY_NEWS}
                                                       className="block py-3 lg:py-7 px-6 border-b-2 border-transparent">
                                                       Community news
                                                  </Link>
                                             </li>
                                             {userName ? (
                                                  <>
                                                       <li className="relative hover:text-black mr-4">
                                                            <Link
                                                                 to={PageUrls.DASHBOARD}
                                                                 className="block py-3 lg:py-7 px-6 border-b-2 border-transparent">
                                                                 Dashboard
                                                            </Link>
                                                       </li>
                                                       <li className="relative hover:text-black">
                                                            <Dropdown menu={{ items }}>
                                                                 <div>Hi, {userName}</div>
                                                            </Dropdown>
                                                       </li>
                                                  </>
                                             ) : (
                                                  <li className="relative hover:text-black">
                                                       <Link
                                                            to={PageUrls.AUTH}
                                                            className="block py-3 lg:py-7 px-6 border-b-2 border-transparent">
                                                            Sign in
                                                       </Link>
                                                  </li>
                                             )}
                                        </ul>
                                   </div>
                              </div>
                         </div>
                    </nav>
               </header>
          </>
     );
};

export default Header;
