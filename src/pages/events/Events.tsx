import { FC, useState } from "react";
import { FilterOptionsModel } from "../../models/filter-options.model.ts";
import { useQuery } from "react-query";
import { Empty, Pagination } from "antd";
import { fetchEvents } from "./services/event.service.ts";
import EventResponseModel from "./models/response/event-response.model.ts";
import MoreDetailsModal from "./components/more-details-modal/MoreDetailsModal.tsx";

interface EventsProps {}

const Events: FC<EventsProps> = () => {
     const [paginateModel, setPaginateModel] = useState<FilterOptionsModel>({
          offset: 0,
          limit: 10,
          selects: [
               "eventName",
               "eventDescription",
               "startTime",
               "endTime",
               "eventReviews.review",
               "eventReviews.rate",
               "user.email",
          ],
          equals: [],
          sort: [],
          relations: ["eventReviews", "eventReviews.user"],
     });

     const { data: eventList } = useQuery(["find-event", paginateModel], () => fetchEvents(paginateModel), {
          keepPreviousData: true,
     });

     const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
     const [selectedEvent, setSelectedEvent] = useState<EventResponseModel>();

     const handlePagination = (pageNumber: number, pageSize: number) => {
          setPaginateModel({
               ...paginateModel,
               offset: (pageNumber - 1) * pageSize,
               limit: pageSize,
          });
     };

     return (
          <>
               <div className="section relative z-0 py-16 md:pt-32 md:pb-20 bg-gray-50">
                    <div className="container xl:max-w-6xl mx-auto px-4">
                         <div className="mb-4 text-sm font-extrabold text-gray-900 md:text-2xl lg:text-4xl">
                              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                                   Events
                              </span>
                         </div>
                         {eventList?.items.length === 0 ? (
                              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                         ) : (
                              <>
                                   <div className="flex flex-wrap flex-row -mx-4">
                                        {eventList?.items.map((item: EventResponseModel) => (
                                             <div
                                                  className="flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp"
                                                  data-wow-duration="1s">
                                                  <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow mb-3">
                                                       <a href="#">
                                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 truncate">
                                                                 {item.eventName}
                                                            </h5>
                                                       </a>
                                                       <p className="mb-3 font-normal text-gray-700 truncate">
                                                            {item.eventDescription}
                                                       </p>
                                                       <div
                                                            onClick={() => {
                                                                 setIsModalOpen(true);
                                                                 setSelectedEvent(item);
                                                            }}
                                                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 bg-gradient-to-br from-cyan-500 to-blue-500">
                                                            Read more
                                                            <svg
                                                                 aria-hidden="true"
                                                                 className="w-4 h-4 ml-2 -mr-1"
                                                                 fill="currentColor"
                                                                 viewBox="0 0 20 20"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                 <path
                                                                      fill-rule="evenodd"
                                                                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                                                      clip-rule="evenodd"></path>
                                                            </svg>
                                                       </div>
                                                  </div>
                                             </div>
                                        ))}
                                   </div>

                                   <div className="mt-10">
                                        <Pagination
                                             defaultCurrent={1}
                                             total={eventList?.totalItems}
                                             onChange={handlePagination}
                                             pageSize={paginateModel.limit}
                                             current={eventList?.currentPage}
                                             showSizeChanger
                                             showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} Events`}
                                        />
                                   </div>
                              </>
                         )}
                    </div>
               </div>

               {isModalOpen && (
                    <MoreDetailsModal
                         selectedEvent={selectedEvent}
                         isModalOpen={isModalOpen}
                         setIsModalOpen={setIsModalOpen}
                    />
               )}
          </>
     );
};
export default Events;
