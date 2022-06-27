import React, { useState } from "react";
import juli from "../images/avatars/image-juliusomo.png";
import { useAppDispatch } from "../App/Store/store";
import { addComment } from "../App/Slice/commentSlice";
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
};

const InputComp = ({ currentUser }: Props) => {
  const [content, setContent] = useState<string>();
  const dispatch = useAppDispatch();
  const submitHandler = () => {
    const date = new Date();
    if (content) {
      dispatch(
        addComment({
          id: uuid(),
          content,
          date: date.toLocaleString(),
        })
      );
      setContent("");
    } else {
      toast.warn("input a comment", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        toastId: "imp",
      });
    }
  };
  return (
    <div className='InputComp'>
      <textarea
        maxLength={200}
        value={content}
        autoFocus
        className='InputComp_message noScrollBar'
        onChange={(e) => setContent(e.target.value)}
        name=''
        id=''
        placeholder='Add a Comment...'></textarea>
      <img className='InputComp_avater' src={juli} alt={currentUser.username} />
      <button onClick={() => submitHandler()} className='InputComp_btn'>
        Send
      </button>
    </div>
  );
};

export default InputComp;
