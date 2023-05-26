import axios from "axios";
import { BehaviorSubject } from "rxjs";
import store from "../../store/store.ts";

export const pendingApiCalls$ = new BehaviorSubject<number>(0);

const axiosInstance = axios.create({
     baseURL: import.meta.env.VITE_POS_API,
});

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
     async (config) => {
          if (config && config.headers) {
               config.headers["Authorization"] = `Bearer ${store.getState().authSlice.auth?.accessToken}`;
          }
          return config;
     },
     (error) => {
          Promise.reject(error);
     },
);

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
     (response) => {
          return response;
     },
     async function (error) {
          return Promise.reject(error);
     },
);

const loadingSpinnerExcludeUrls = [""];

const isLoadingSpinnerExcludeUrl = (url: string) => {
     let isLoadingSpinnerExcludeUrl = false;
     loadingSpinnerExcludeUrls.forEach((singleExcludeUrl) => {
          if (url.includes(singleExcludeUrl)) {
               isLoadingSpinnerExcludeUrl = true;
          }
     });
     return isLoadingSpinnerExcludeUrl;
};

axiosInstance.interceptors.request.use((request) => {
     if (request.url && !isLoadingSpinnerExcludeUrl(request.url)) {
          pendingApiCalls$.next(pendingApiCalls$.getValue() + 1);
     }
     return request;
});

axiosInstance.interceptors.response.use(
     (response) => {
          if (response.config.url && !isLoadingSpinnerExcludeUrl(response.config.url)) {
               pendingApiCalls$.next(pendingApiCalls$.getValue() - 1);
          }
          return response;
     },
     (error) => {
          pendingApiCalls$.next(pendingApiCalls$.getValue() - 1);
          return Promise.reject(error);
     },
);

export default axiosInstance;
