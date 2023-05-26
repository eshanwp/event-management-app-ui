import axiosInstance from "../../../config/axios/axios-instance.ts";
import { FilterOptionsModel } from "../../../models/filter-options.model.ts";
import ResponseModel from "../../../models/response.model.ts";
import PaginationResultsModal from "../../../models/pagination-results.modal.ts";
import CommunityNewsResponseModel from "../models/community-news-response.model.ts";
import { getErrorMessage, showNotification } from "../../../helpers/notification-helper.ts";
import ApiUrls from "../../../constants/api-urls.ts";

/**
 * @des handle the functionality for community news search
 * @param filterOptionsModel
 */
export const fetchCommunityNews = async (
     filterOptionsModel: FilterOptionsModel,
): Promise<PaginationResultsModal<CommunityNewsResponseModel>> => {
     try {
          const apiResponse = await axiosInstance.post<
               ResponseModel<PaginationResultsModal<CommunityNewsResponseModel>>
          >(`${ApiUrls.COMMUNITY_NEWS_FILTER}`, filterOptionsModel);
          return apiResponse.data.data;
     } catch (error) {
          showNotification("error", getErrorMessage(error));
          throw new Error("API Error");
     }
};
