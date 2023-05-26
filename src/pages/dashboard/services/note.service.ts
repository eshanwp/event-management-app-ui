import axiosInstance from "../../../config/axios/axios-instance.ts";
import { FilterOptionsModel } from "../../../models/filter-options.model.ts";
import ResponseModel from "../../../models/response.model.ts";
import PaginationResultsModal from "../../../models/pagination-results.modal.ts";
import NoteResponseModel from "../models/response/note-response.model.ts";
import { getErrorMessage, showNotification } from "../../../helpers/notification-helper.ts";
import ApiUrls from "../../../constants/api-urls.ts";
import NoteRequestModel from "../models/request/note-request.model.ts";

/**
 * @des handle the functionality for note search
 * @param filterOptionsModel
 */
export const fetchNote = async (
     filterOptionsModel: FilterOptionsModel,
): Promise<PaginationResultsModal<NoteResponseModel>> => {
     try {
          const apiResponse = await axiosInstance.post<ResponseModel<PaginationResultsModal<NoteResponseModel>>>(
               `${ApiUrls.NOTE_FILTER}`,
               filterOptionsModel,
          );
          return apiResponse.data.data;
     } catch (error) {
          showNotification("error", getErrorMessage(error));
          throw new Error("API Error");
     }
};

/**
 * @des handle the functionality for add note
 * @param noteRequestModel
 */
export const addNote = async (noteRequestModel: NoteRequestModel): Promise<void> => {
     try {
          const apiResponse = await axiosInstance.post<ResponseModel<null>>(`${ApiUrls.NOTE}`, noteRequestModel);
          showNotification("success", apiResponse.data.details);
     } catch (error) {
          showNotification("error", getErrorMessage(error));
          throw new Error("API Error");
     }
};

/**
 * @des Update the specified note in storage
 * @param noteRequestModel
 * @param id
 */
export const updateNote = async (noteRequestModel: NoteRequestModel, id: string): Promise<void> => {
     try {
          const apiResponse = await axiosInstance.put<ResponseModel<null>>(`${ApiUrls.NOTE}/${id}`, noteRequestModel);
          showNotification("success", apiResponse.data.details);
     } catch (error) {
          showNotification("error", getErrorMessage(error));
          throw new Error("API Error");
     }
};

/**
 * @des Remove the specified note from storage
 * @param id
 */
export const removeNote = async (id: string): Promise<void> => {
     try {
          const apiResponse = await axiosInstance.delete<ResponseModel<null>>(`${ApiUrls.NOTE}/${id}`);
          showNotification("success", apiResponse.data.details);
     } catch (error) {
          showNotification("error", getErrorMessage(error));
          throw new Error("API Error");
     }
};
