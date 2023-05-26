import axiosInstance from "../../../config/axios/axios-instance.ts";
import { FilterOptionsModel } from "../../../models/filter-options.model.ts";
import ResponseModel from "../../../models/response.model.ts";
import PaginationResultsModal from "../../../models/pagination-results.modal.ts";
import EventResponseModel from "../models/response/event-response.model.ts";
import { getErrorMessage, showNotification } from "../../../helpers/notification-helper.ts";
import ApiUrls from "../../../constants/api-urls.ts";

/**
 * @des handle the functionality for event search
 * @param filterOptionsModel
 */
export const fetchEvents = async (
     filterOptionsModel: FilterOptionsModel,
): Promise<PaginationResultsModal<EventResponseModel>> => {
     try {
          const apiResponse = await axiosInstance.post<ResponseModel<PaginationResultsModal<EventResponseModel>>>(
               `${ApiUrls.EVENT_FILTER}`,
               filterOptionsModel,
          );
          return apiResponse.data.data;
     } catch (error) {
          showNotification("error", getErrorMessage(error));
          throw new Error("API Error");
     }
};
