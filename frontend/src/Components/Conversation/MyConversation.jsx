import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversation } from "../../Redux/Actions/converAction";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyConversation = () => {
  const { error, conversations } = useSelector((v) => v.conversations);
  const { user } = useSelector((v) => v.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getConversation());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleNavigate = (id) => {
    navigate(`/conversation/${id}`);
  };

  return (
    <>
      <ToastContainer />
      {conversations && conversations.length > 0 ? (
        conversations.map((conversation, i) => {
          const otherParticipant = conversation.participants.find(
            (participant) => participant._id !== user._id
          );
          if (!otherParticipant) return null;

          return (
            <div
              key={i}
              className="flex backdrop-blur-3xl bg-opacity-100 mb-1 hover:bg-gray-400"
              onClick={() => handleNavigate(otherParticipant._id)} 
            >
              <div className="flex flex-[20%] items-center h-20 w-20 border-b-1 mt-1">
                <img
                  className="h-16 p-1 m-2 ml-6 w-16 rounded-full"
                  src={otherParticipant.avatar?.url}
                  alt="User avatar"
                />
              </div>
              <div className="pt-4 flex-[80%] pl-6 overflow-hidden h-20">
                <h1 className="text-2xl font-bold">{otherParticipant.name}</h1>
                <p className="overflow-hidden">{otherParticipant.about}</p>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-lg">No Conversation found</p>
      )}
    </>
  );
};

export default MyConversation;
