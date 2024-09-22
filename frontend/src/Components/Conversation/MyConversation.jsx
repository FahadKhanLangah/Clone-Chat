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

  const handleNavigate = (id,converId) => {
    navigate(`/conversation/${id}/${converId}`);
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
              onClick={() => handleNavigate(otherParticipant._id,conversation._id)}
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
                <p className={`overflow-hidden ${conversation?.lastMessage?.message ? "": "text-yellow-500"}`}>{conversation?.lastMessage?.message ? conversation?.lastMessage?.message : "No Last Message"}</p>
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
