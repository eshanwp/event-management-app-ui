import { Dispatch, FC, SetStateAction } from "react";
import { Modal } from "antd";
import { BiUserCircle } from "react-icons/all";
import CommunityNewsResponseModel from "../../models/community-news-response.model.ts";

interface MoreDetailsModalProps {
     selectedCommunityNews?: CommunityNewsResponseModel;
     isModalOpen: boolean;
     setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const MoreDetailsModal: FC<MoreDetailsModalProps> = ({ selectedCommunityNews, isModalOpen, setIsModalOpen }) => {
     return (
          <Modal
               title={selectedCommunityNews?.title}
               open={isModalOpen}
               onCancel={() => setIsModalOpen(false)}
               footer={null}>
               <p>{selectedCommunityNews?.content}</p>
               <div className="flex mt-4">
                    <BiUserCircle size={30} />
                    <p className="ml-4 mt-1"> Author : {selectedCommunityNews?.author}</p>
               </div>
          </Modal>
     );
};
export default MoreDetailsModal;
