import { Dispatch, FC, SetStateAction, useState } from "react";
import { Empty, Modal, Pagination } from "antd";
import { useAppSelector } from "../../../../store/store.ts";
import { FilterOptionsModel } from "../../../../models/filter-options.model.ts";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { QueryClient } from "react-query/core";
import { fetchNote, removeNote } from "../../services/note.service.ts";
import NoteResponseModel from "../../models/response/note-response.model.ts";
import DrawerDataModal from "../../../../models/drawer-data.modal.ts";
import AddNote from "./components/add-note/AddNote.tsx";
import { ActionTypeEnum } from "../../../../enums/action-type.enum.ts";
import { AiFillEdit, IoTrashBin } from "react-icons/all";

const { confirm } = Modal;

interface NoteModalProps {
     isModalOpen: boolean;
     setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const NoteModal: FC<NoteModalProps> = ({ isModalOpen, setIsModalOpen }) => {
     const userId = useAppSelector((state) => state.authSlice.auth?.userId);

     const [drawerData, setDrawerData] = useState<DrawerDataModal<NoteResponseModel>>({
          isOpen: false,
     });

     const [paginateModel, setPaginateModel] = useState<FilterOptionsModel>({
          offset: 0,
          limit: 10,
          selects: ["title", "content"],
          equals: [`userId=${userId}`],
          sort: [],
          relations: [],
     });

     const { data: noteList, refetch: noteListReFetch } = useQuery(
          ["find-notes-user-wise", paginateModel],
          () => fetchNote(paginateModel),
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

     /*** Handle remove the specified note from storage ***/
     const queryClient: QueryClient = useQueryClient();

     const { mutate: mutateCategoryOne } = useMutation({
          //A function that performs an asynchronous remove of the note and returns a promise.
          mutationFn: (id: string) => removeNote(id),
          //After a successful mutation, run the invalidateQueries to cause a data re-fetch.
          onSuccess: () => queryClient.invalidateQueries(),
     });

     return (
          <Modal title="Note" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null} width={900}>
               <button
                    onClick={() =>
                         setDrawerData({
                              isOpen: true,
                              actionType: ActionTypeEnum.CREATE,
                              title: "Add Note",
                         })
                    }
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                         Add Notes
                    </span>
               </button>
               {noteList?.items.length === 0 ? (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
               ) : (
                    <>
                         <div className="flex flex-wrap flex-row -mx-6">
                              {noteList?.items.map((item: NoteResponseModel) => (
                                   <div
                                        className="flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp"
                                        data-wow-duration="1s">
                                        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow mb-3">
                                             <div className="flex flex-col items-center pb-10">
                                                  <h5 className="mb-1 text-xl font-medium text-gray-900">
                                                       {item.title}
                                                  </h5>
                                             </div>
                                             <div className="flex justify-end">
                                                  <div
                                                       className="mr-4"
                                                       onClick={() => {
                                                            confirm({
                                                                 title: "Would you like to remove this note?",
                                                                 onOk() {
                                                                      mutateCategoryOne(item.id);
                                                                 },
                                                                 okText: "Yes",
                                                            });
                                                       }}>
                                                       <IoTrashBin />
                                                  </div>
                                                  <div
                                                       onClick={() =>
                                                            setDrawerData({
                                                                 isOpen: true,
                                                                 actionType: ActionTypeEnum.UPDATE,
                                                                 title: "Edit Note",
                                                                 data: item,
                                                            })
                                                       }>
                                                       <AiFillEdit />
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              ))}
                         </div>

                         <div className="mt-10">
                              <Pagination
                                   defaultCurrent={1}
                                   total={noteList?.totalItems}
                                   onChange={handlePagination}
                                   pageSize={paginateModel.limit}
                                   current={noteList?.currentPage}
                                   showSizeChanger
                                   showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} Notes`}
                              />
                         </div>
                    </>
               )}

               {drawerData.isOpen && (
                    <AddNote drawerData={drawerData} setDrawerData={setDrawerData} noteListReFetch={noteListReFetch} />
               )}
          </Modal>
     );
};
export default NoteModal;
