import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./config/routes/Route.tsx";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store.ts";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useEffect, useState } from "react";
import { ConfigProvider, Spin } from "antd";
import { pendingApiCalls$ } from "./config/axios/axios-instance.ts";
import { PersistGate } from "redux-persist/integration/react";

function App() {
     /**---- handle api call count ---**/
     const [pendingApiCallsCount, setPendingApiCallsCount] = useState<number>(0);

     useEffect(() => {
          const loadingObservableListener = pendingApiCalls$.subscribe((pendingApiCalls: number) => {
               setPendingApiCallsCount(pendingApiCalls);
          });
          return () => {
               loadingObservableListener.unsubscribe();
          };
     }, []);

     /**---- handle react query ---**/
     const queryClient: QueryClient = new QueryClient();

     return (
          <QueryClientProvider client={queryClient}>
               <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                         <Spin spinning={pendingApiCallsCount > 0}>
                              <ConfigProvider
                                   theme={{
                                        token: {
                                             colorPrimary: "#06b6d4",
                                        },
                                   }}>
                                   <RouterProvider router={router} />
                              </ConfigProvider>
                         </Spin>
                    </PersistGate>
               </Provider>
               {import.meta.env.DEV && <ReactQueryDevtools position="bottom-left" />}
          </QueryClientProvider>
     );
}

export default App;
