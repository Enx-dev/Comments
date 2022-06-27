import React, { useEffect, useState } from "react";
import RelplyBox from "./RelplyBox";
import RepliesContainer from "./RepliesContainer";
import amy from "../../images/avatars/image-amyrobson.png";
import max from "../../images/avatars/image-maxblagun.png";
import juli from "../../images/avatars/image-juliusomo.png";
import DeleteModal from "../DeleteModal/DeleteModal";
import { useAppDispatch } from "../../App/Store/store";
import moment from "moment";
import {
  updateComment,
  DecreaseScore,
  increaseScore,
} from "../../App/Slice/commentSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type commentData = {
  id: string;
  content: string;
  createdAt: string;
  score: number;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  replies: {
    id: string;
    content: string;
    createdAt: string;
    score: number;
    replyingTo: string;
    user: {
      image: {
        png: string;
        webp: string;
      };
      username: string;
    };
  }[];
  currentUser: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
};

const Comments = ({
  content,
  createdAt,
  id,
  replies,
  score,
  user,
  currentUser,
}: commentData) => {
  const [img, setImg] = useState<string>();
  const [reply, setReply] = useState<boolean>(false);
  const [deleteModal, setDelete] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [update, setUpdate] = useState<string>(content);
  const [Score, setScore] = useState<number>(0);
  const dispatch = useAppDispatch();

  const UpdateComment = () => {
    if (update) {
      dispatch(updateComment({ content: update, id }));
      setEdit(false);
    } else {
      toast.warn("cannot be empty", {
        position: "bottom-center",
        autoClose: 5000,
        toastId: 2,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const AddScore = () => {
    if (Score < 1) {
      setScore((prev) => prev + 1);
      dispatch(increaseScore({ id }));
    }
  };
  const MinusScore = () => {
    if (Score > -1) {
      setScore((prev) => prev - 1);
      dispatch(DecreaseScore({ id }));
    }
  };
  useEffect(() => {
    if (user.username === "amyrobson") {
      setImg(amy);
    } else if (user.username === "maxblagun") {
      setImg(max);
    } else {
      setImg(juli);
    }
  }, [user]);
  return (
    <>
      <div className='Comment'>
        <div className='Comment_top'>
          <div className='Comment_top_head'>
            <img
              className='Comment_top_head_avater'
              src={img}
              alt={user.username}
            />
            <p className='Comment_top_head_username'>{user.username}</p>
            {currentUser.username === user.username && (
              <p className='px-3 py-1 rounded-md text-white font-medium tracking-wide bg-primarymoderateBlue'>
                you
              </p>
            )}

            <p className='Comment_top_head_createdat'>
              {moment(createdAt).fromNow() !== "Invalid date"
                ? moment(createdAt).fromNow()
                : createdAt}
            </p>
          </div>
          <div className='Comment_top_content'>
            {edit ? (
              <div className='flex space-y-4 flex-col'>
                <textarea
                  autoFocus
                  className='w-full outline outline-1 rounded-lg outline-primarymoderateBlue caret-primarymoderateBlue p-4'
                  defaultValue={update}
                  onChange={(e) => setUpdate(e.target.value)}
                />
                {edit && (
                  <button
                    onClick={() => UpdateComment()}
                    className='bg-primarymoderateBlue self-end  px-6 py-3 text-white font-medium uppercase tracking-wide rounded-lg hover:bg-primarymoderateBlue/50 transition-colors duration-150 ease-in-out'>
                    Update
                  </button>
                )}
              </div>
            ) : (
              <p className='Comment_top_content_p'>{content}</p>
            )}
          </div>
        </div>
        <div className='Comment_bottom'>
          <span className='Comment_bottom_span'>
            <svg
              onClick={() => AddScore()}
              className='fill-primarylightGrayishBlue cursor-pointer hover:fill-primarymoderateBlue'
              width='11'
              height='11'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 
              .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z'
              />
            </svg>
            <p className='Comment_bottom_span_score'>{score}</p>
            <svg
              onClick={() => MinusScore()}
              className='fill-primarylightGrayishBlue cursor-pointer hover:fill-primarymoderateBlue'
              width='11'
              height='3'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859
               0 0 0-.53-.167H.76a.859.859
                0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z'
              />
            </svg>
          </span>

          <span className='Comment_bottom_span2'>
            {currentUser.username === user.username ? (
              <>
                {" "}
                <button
                  onClick={() => setDelete(true)}
                  className='group Comment_bottom_btn'>
                  <svg
                    className='group-hover:fill-primarypaleRed fill-primarysoftRed'
                    width='12'
                    height='14'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 
              0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773
             0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z'
                    />
                  </svg>
                  <p className='group-hover:text-primarypaleRed text-primarysoftRed'>
                    Delete
                  </p>
                </button>
                <button
                  onClick={() => setEdit((prev) => !prev)}
                  className='group Comment_bottom_btn'>
                  <svg
                    width='14'
                    height='14'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      className='fill-primarymoderateBlue group-hover:fill-primarymoderateBlue/50'
                      d='M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879
                   8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875
                    0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216
                     1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975
                      2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z'
                    />
                  </svg>
                  <p className='text-primarymoderateBlue group-hover:text-primarymoderateBlue/50'>
                    Edit
                  </p>
                </button>{" "}
              </>
            ) : (
              <button
                onClick={() => setReply((prev) => !prev)}
                className='group Comment_bottom_btn'>
                <svg
                  className='fill-primarymoderateBlue group-hover:fill-primarymoderateBlue/50'
                  width='14'
                  height='13'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 
                7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51
                 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227
                  5.31a.657.657 0 0 1 0-.993Z'
                  />
                </svg>
                <p className='text-primarymoderateBlue group-hover:text-primarymoderateBlue/50'>
                  Reply
                </p>
              </button>
            )}
          </span>
        </div>
      </div>
      {reply && (
        <RelplyBox
          userId={id}
          userName={user.username}
          currentUser={currentUser}
          setReply={setReply}
        />
      )}
      <RepliesContainer
        currentUser={currentUser}
        parentId={id}
        replies={replies}
      />
      {deleteModal && <DeleteModal id={id} setDelete={setDelete} />}
    </>
  );
};

export default Comments;
