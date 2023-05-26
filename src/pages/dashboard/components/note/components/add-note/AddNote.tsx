import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { Drawer, Form, Input } from "antd";
import { useMutation, UseQueryResult } from "react-query";
import { DrawerConfig } from "../../../../../../config/drawer/drawer-config.ts";
import DrawerDataModal from "../../../../../../models/drawer-data.modal.ts";
import NoteResponseModel from "../../../../models/response/note-response.model.ts";
import { useAppSelector } from "../../../../../../store/store.ts";
import { ActionTypeEnum } from "../../../../../../enums/action-type.enum.ts";
import NoteRequestModel from "../../../../models/request/note-request.model.ts";
import { addNote, updateNote } from "../../../../services/note.service.ts";

interface AddNoteProps {
     drawerData: DrawerDataModal<NoteResponseModel>;
     setDrawerData: Dispatch<SetStateAction<DrawerDataModal<NoteResponseModel>>>;
     noteListReFetch: () => Promise<UseQueryResult>;
}

const AddNote: FC<AddNoteProps> = ({ drawerData, setDrawerData, noteListReFetch }) => {
     const [noteForm] = Form.useForm();

     const userId = useAppSelector((state) => state.authSlice.auth?.userId);

     useEffect(() => {
          noteForm.setFieldsValue({
               title: drawerData.data?.title,
               content: drawerData.data?.content,
          });
     }, [drawerData]);

     const { mutate: createNote } = useMutation({
          //A function that performs an asynchronous creation of the note and returns a promise.
          mutationFn: (noteRequestModel: NoteRequestModel) => addNote(noteRequestModel),
          //This function will reset the form when the mutation is successful
          onSuccess: () => {
               setDrawerData({
                    ...drawerData,
               });
               noteForm.resetFields();
          },
     });

     const { mutate: updateCategory } = useMutation({
          //A function that performs an asynchronous update of the note and returns a promise.
          mutationFn: (variables: { body: NoteRequestModel; id: string }) => updateNote(variables.body, variables.id),
          //This function handles the page redirection when the mutation is successful
          onSuccess: () => handleDrawerClose(),
     });

     /**
      * @des Handle drawer close
      */
     const handleDrawerClose = () => {
          noteListReFetch().catch(console.error);
          setDrawerData({ isOpen: false });
     };

     /**
      * @des Handle form submission
      */
     const handleOnFinish = () => {
          noteForm.validateFields().then((value) => {
               const noteRequestModel: NoteRequestModel = {
                    title: value.title,
                    content: value.content,
                    userId: userId,
               };
               if (drawerData.actionType === ActionTypeEnum.CREATE) {
                    createNote(noteRequestModel);
               } else if (drawerData.actionType === ActionTypeEnum.UPDATE && drawerData.data) {
                    updateCategory({
                         body: noteRequestModel,
                         id: drawerData.data?.id,
                    });
               }
          });
     };

     return (
          <Drawer
               {...DrawerConfig}
               open={drawerData.isOpen}
               title={drawerData.title}
               onClose={handleDrawerClose}
               extra={
                    drawerData.actionType === ActionTypeEnum.CREATE ||
                    drawerData.actionType === ActionTypeEnum.UPDATE ? (
                         <button
                              onClick={handleOnFinish}
                              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200">
                              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                                   Submit
                              </span>
                         </button>
                    ) : null
               }>
               <Form layout="vertical" form={noteForm}>
                    <Form.Item
                         label="Title"
                         name="title"
                         rules={[
                              {
                                   message: "You can't keep this as empty",
                                   required: true,
                              },
                         ]}>
                         <Input
                              maxLength={256}
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                         />
                    </Form.Item>

                    <Form.Item
                         label="Content"
                         name="content"
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
               </Form>
          </Drawer>
     );
};
export default AddNote;
