import { FC, useState } from "react";
import { FilterOptionsModel } from "../../models/filter-options.model.ts";
import { useQuery } from "react-query";
import { Empty, Pagination, Rate } from "antd";
import { useAppSelector } from "../../store/store.ts";
import { fetchEventReviews } from "./services/event-review.service.ts";
import EventReviewResponseModel from "./models/response/event-review-response.model.ts";
import NoteModal from "./components/note/NoteModal.tsx";
import { matchRoles } from "../../helpers/auth.helper.ts";
import { RoleEnum } from "../../enums/role.enum.ts";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {
     const userId = useAppSelector((state) => state.authSlice.auth?.userId);
     const roles = useAppSelector((state) => state.authSlice.auth?.roles);

     const isAdmin = matchRoles(roles, [RoleEnum.ADMIN]);

     let equals: any = [];
     if (!isAdmin) {
          equals = [`userId=${userId}`];
     }

     const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
     const [paginateModel, setPaginateModel] = useState<FilterOptionsModel>({
          offset: 0,
          limit: 10,
          selects: ["review", "rate", "event.eventName", "user.email"],
          equals: equals,
          sort: [],
          relations: ["event", "user"],
     });

     const { data: eventReviewList } = useQuery(
          ["find-event-review-user-wise", paginateModel],
          () => fetchEventReviews(paginateModel),
          {
               keepPreviousData: true,
          },
     );

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
                         <button
                              onClick={() => setIsModalOpen(true)}
                              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200">
                              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                                   Notes
                              </span>
                         </button>
                         {eventReviewList?.items.length === 0 ? (
                              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                         ) : (
                              <>
                                   <div className="relative overflow-x-auto">
                                        <table className="w-full text-sm text-left text-gray-500">
                                             <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                                  <tr>
                                                       <th scope="col" className="px-6 py-3 rounded-l-lg">
                                                            Event Name
                                                       </th>
                                                       <th scope="col" className="px-6 py-3">
                                                            Review
                                                       </th>
                                                       {isAdmin && (
                                                            <th scope="col" className="px-6 py-3 rounded-r-lg">
                                                                 User
                                                            </th>
                                                       )}
                                                       <th scope="col" className="px-6 py-3 rounded-r-lg">
                                                            Rate
                                                       </th>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {eventReviewList?.items.map((item: EventReviewResponseModel) => (
                                                       <tr className="bg-white">
                                                            <td className="px-6 py-4">{item.event.eventName}</td>
                                                            <td className="px-6 py-4">{item.review}</td>
                                                            {isAdmin && (
                                                                 <th scope="col" className="px-6 py-3 rounded-r-lg">
                                                                      {item.user.email}
                                                                 </th>
                                                            )}
                                                            <td
                                                                 scope="row"
                                                                 className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                                 <Rate value={item.rate ?? 0} disabled />
                                                            </td>
                                                       </tr>
                                                  ))}
                                             </tbody>
                                        </table>
                                   </div>
                                   <div className="mt-10">
                                        <Pagination
                                             defaultCurrent={1}
                                             total={eventReviewList?.totalItems}
                                             onChange={handlePagination}
                                             pageSize={paginateModel.limit}
                                             current={eventReviewList?.currentPage}
                                             showSizeChanger
                                             showTotal={(total, range) =>
                                                  `${range[0]}-${range[1]} of ${total} Events reviews`
                                             }
                                        />
                                   </div>
                              </>
                         )}
                    </div>
               </div>

               {isModalOpen && <NoteModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}
          </>
     );
};
export default Dashboard;
