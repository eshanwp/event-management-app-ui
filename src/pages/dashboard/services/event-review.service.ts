import axiosInstance from "../../../config/axios/axios-instance.ts";
import { FilterOptionsModel } from "../../../models/filter-options.model.ts";
import ResponseModel from "../../../models/response.model.ts";
import PaginationResultsModal from "../../../models/pagination-results.modal.ts";
import { getErrorMessage, showNotification } from "../../../helpers/notification-helper.ts";
import ApiUrls from "../../../constants/api-urls.ts";
import EventReviewRequestModel from "../models/request/event-review-request.model.ts";
import EventReviewResponseModel from "../models/response/event-review-response.model.ts";

/**
 * @des handle the functionality for event review search
 * @param filterOptionsModel
 */
export const fetchEventReviews = async (
     filterOptionsModel: FilterOptionsModel,
): Promise<PaginationResultsModal<EventReviewResponseModel>> => {
     try {
          const apiResponse = await axiosInstance.post<ResponseModel<PaginationResultsModal<EventReviewResponseModel>>>(
               `${ApiUrls.EVENT_REVIEW_FILTER}`,
               filterOptionsModel,
          );
          return apiResponse.data.data;
     } catch (error) {
          showNotification("error", getErrorMessage(error));
          throw new Error("API Error");
     }
};

/**
 * @des handle the functionality for add event review
 * @param eventReviewRequestModel
 */
export const addEventReview = async (eventReviewRequestModel: EventReviewRequestModel): Promise<void> => {
     try {
          const apiResponse = await axiosInstance.post<ResponseModel<null>>(
               `${ApiUrls.EVENT_REVIEW}`,
               eventReviewRequestModel,
          );
          showNotification("success", apiResponse.data.details);
     } catch (error) {
          showNotification("error", getErrorMessage(error));
          throw new Error("API Error");
     }
};
