import React, { SetStateAction } from "react";
import { createPortal } from "react-dom";
import { useAppDispatch } from "../../App/Store/store";
import { deleteComment } from "../../App/Slice/commentSlice";
type Props = {
  id: string;
  setDelete: React.Dispatch<SetStateAction<boolean>>;
  type?: string;
  parentId?: string;
};

const DeleteModal = ({ id, setDelete, type, parentId }: Props) => {
  const dispatch = useAppDispatch();
  const DeletComment = () => {
    dispatch(deleteComment({ id, type, parentId }));
    setDelete(false);
  };
  return createPortal(
    <>
      <div className='Delete_backdrop' />
      <div className='Delete_modal'>
        <h1 className='Delete_modal_title'>Delete comment</h1>
        <p className='Delete_modal_p'>
          Are you sure you want to remove this comment? This will remove the
          comment and cant be undone
        </p>
        <div className='Delete_modal_span'>
          <button
            onClick={() => setDelete(false)}
            className='Delete_modal_span_btn1'>
            No, Cancel
          </button>
          <button
            onClick={() => DeletComment()}
            className='Delete_modal_span_btn2'>
            Yes, Delete
          </button>
        </div>
      </div>
    </>,
    document.getElementById("modal")!
  );
};

export default DeleteModal;
