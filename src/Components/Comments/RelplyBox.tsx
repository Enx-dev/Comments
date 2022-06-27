import React, { SetStateAction, useState } from "react";
import juli from "../../images/avatars/image-juliusomo.png";
import { useAppDispatch } from "../../App/Store/store";
import { replyComment } from "../../App/Slice/commentSlice";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  currentUser: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  userId: string;
  parentId?: string;
  userName: string;
  type?: string;
  setReply: React.Dispatch<SetStateAction<boolean>>;
};

const RelplyBox = ({
  currentUser,
  userId,
  userName,
  parentId,
  type,
  setReply,
}: Props) => {
  const [content, setContent] = useState<string>();
  const dispatch = useAppDispatch();
  const handleSubmit = () => {
    const date = new Date();
    if (content) {
      setReply(false);
      dispatch(
        replyComment({
          type: type,
          parentId,
          userId,
          username: userName,
          id: uuid(),
          content,
          date: date.toLocaleString(),
        })
      );
    } else {
      toast.warn("cannot be empty", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        toastId: 1,
      });
    }
  };
  return (
    <div className='InputComp'>
      <textarea
        autoFocus
        maxLength={200}
        className='InputComp_message noScrollBar'
        onChange={(e) => setContent(e.target.value)}
        name=''
        id=''
        placeholder='Add a Comment...'></textarea>
      <img className='InputComp_avater' src={juli} alt={currentUser.username} />
      <button onClick={() => handleSubmit()} className='InputComp_btn'>
        Reply
      </button>
    </div>
  );
};

export default RelplyBox;
