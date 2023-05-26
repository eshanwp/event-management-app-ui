import { createBrowserRouter } from "react-router-dom";
import Layout from "../../layouts/Layout.tsx";
import PasswordReset from "../../pages/auth/components/password-reset/PasswordReset.tsx";
import PageUrls from "../../constants/page-urls.ts";
import ErrorPage from "./errors/ErrorPage.tsx";
import Home from "../../pages/home/Home.tsx";
import Auth from "../../pages/auth/Auth.tsx";
import CommunityNews from "../../pages/community-news/CommunityNews.tsx";
import Events from "../../pages/events/Events.tsx";
import Dashboard from "../../pages/dashboard/Dashboard.tsx";

const router = createBrowserRouter([
     {
          path: "/",
          element: <Layout />,
          errorElement: <ErrorPage />,
          children: [
               {
                    index: true,
                    element: <Home />,
               },
               {
                    path: PageUrls.AUTH,
                    element: <Auth />,
               },
               {
                    path: PageUrls.PASSWORD_RESET,
                    element: <PasswordReset />,
               },
               {
                    path: PageUrls.COMMUNITY_NEWS,
                    element: <CommunityNews />,
               },
               {
                    path: PageUrls.EVENTS,
                    element: <Events />,
               },
               {
                    path: PageUrls.DASHBOARD,
                    element: <Dashboard />,
               },
          ],
     },
]);

export default router;
