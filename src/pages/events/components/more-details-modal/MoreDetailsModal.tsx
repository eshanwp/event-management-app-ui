import { Dispatch, FC, SetStateAction } from "react";
import { CiTimer } from "react-icons/ci";
import moment from "moment/moment";
import { SystemConfiguration } from "../../../../config/system/system-configuration.ts";
import { Alert, Button, Form, Input, Modal, Rate } from "antd";
import EventResponseModel from "../../models/response/event-response.model.ts";
import { useAppSelector } from "../../../../store/store.ts";
import { useMutation } from "react-query";
import EventReviewRequestModel from "../../../dashboard/models/request/event-review-request.model.ts";
import { addEventReview } from "../../../dashboard/services/event-review.service.ts";

interface MoreDetailsModalProps {
     selectedEvent?: EventResponseModel;
     isModalOpen: boolean;
     setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const MoreDetailsModal: FC<MoreDetailsModalProps> = ({ selectedEvent, isModalOpen, setIsModalOpen }) => {
     const [eventReviewForm] = Form.useForm();

     const userId = useAppSelector((state) => state.authSlice.auth?.userId);

     const { mutate: eventReviewMutate } = useMutation({
          //A function that performs an asynchronous event review with rate and returns a promise.
          mutationFn: (eventReviewRequestModel: EventReviewRequestModel) => addEventReview(eventReviewRequestModel),
          onSuccess: () => {
               eventReviewForm.resetFields();
               setIsModalOpen(false);
          },
     });

     const handleEventReview = (values: any) => {
          const eventReviewRequestModel: EventReviewRequestModel = {
               review: values.review,
               rate: values.rate,
               eventId: selectedEvent?.id ?? "",
               userId: userId,
          };
          eventReviewMutate(eventReviewRequestModel);
     };

     return (
          <Modal
               title={selectedEvent?.eventName}
               open={isModalOpen}
               onCancel={() => setIsModalOpen(false)}
               footer={null}>
               <p>{selectedEvent?.eventDescription}</p>

               <div className="flex mt-4">
                    <CiTimer size="30" />
                    <div className="ml-3 mt-0.5">
                         Start :{moment(selectedEvent?.startTime).format(SystemConfiguration.DATE_FORMAT_WITH_TIME)}
                    </div>
               </div>

               <div className="flex mt-4">
                    <CiTimer size="30" />
                    <div className="ml-3 mt-0.5">
                         End :{moment(selectedEvent?.startTime).format(SystemConfiguration.DATE_FORMAT_WITH_TIME)}
                    </div>
               </div>

               {userId ? (
                    <Form
                         layout="vertical"
                         form={eventReviewForm}
                         className="space-y-4 md:space-y-6"
                         onFinish={handleEventReview}>
                         <Form.Item
                              label="Review"
                              name="review"
                              rules={[
                                   {
                                        message: "You can't keep this as empty",
                                        required: true,
                                   },
                              ]}>
                              <Input.TextArea
                                   showCount
                                   maxLength={1024}
                                   className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                              />
                         </Form.Item>

                         <Form.Item
                              name="rate"
                              rules={[
                                   {
                                        message: "You can't keep this as empty",
                                        required: true,
                                   },
                              ]}>
                              <Rate />
                         </Form.Item>

                         <Button
                              htmlType="submit"
                              className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm text-center">
                              Add review
                         </Button>
                    </Form>
               ) : (
                    <Alert
                         message="You cannot add a review without logging in."
                         type="info"
                         closable
                         className="mt-4"
                    />
               )}
          </Modal>
     );
};
export default MoreDetailsModal;
