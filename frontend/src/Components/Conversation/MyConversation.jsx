import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversation } from "../../Redux/Actions/converAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BsBellFill } from "react-icons/bs";
const MyConversation = () => {
  const { error, conversations } = useSelector((v) => v.conversations);
  const { user, onlineUsers } = useSelector((v) => v.auth);
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
  // Look here we have used slice to create shallow 
  //if we dont use slice then it will change the org conservations state
  // which cause erro because redux store is immutable
  const sortedConversations = conversations?.slice().sort((a, b) => {
    // we can write Simple as like this
    // const datea = new Date(a.lastMessage.createdAt);
    // const dateb = new Date(b.lastMessage.createdAt);
    // this is optional chaning to avoid any error
    const dateA = a.lastMessage?.createdAt ? new Date(a.lastMessage.createdAt) : new Date(0);
    const dateB = b.lastMessage?.createdAt ? new Date(b.lastMessage.createdAt) : new Date(0);
    return dateB - dateA;
  });
  const handleNavigate = (id, converId) => {
    navigate(`/conversation/${id}/${converId}`);
  };
  return (
    <>
      {sortedConversations && sortedConversations.length > 0 ? (
        sortedConversations.map((conversation, i) => {
          const otherParticipant = conversation.participants.find(
            (participant) => participant._id !== user._id
          );
          if (!otherParticipant) return null;

          return (
            <div
              key={i}
              className="flex backdrop-blur-3xl bg-opacity-100 mb-1 hover:bg-gray-400"
              onClick={() => handleNavigate(otherParticipant._id, conversation._id)}
            >
              <div className="flex relative flex-[20%] items-center h-20 w-20 border-b-1 mt-1">
                <img
                  className="h-16 p-1 m-2 ml-6 w-16 rounded-full"
                  src={otherParticipant.avatar?.url}
                  alt="User avatar"
                />
                {onlineUsers && onlineUsers.includes(otherParticipant._id) ? <div className="absolute  right-0 sm:right-10 top-4 h-3 w-3 border-2 border-white bg-green-500 rounded-full" /> : null}
              </div>
              <div className="pt-4 flex-[80%] pl-6 overflow-hidden h-20">
                <h1 className="text-2xl font-bold">{otherParticipant.name}</h1>
                <div className={`overflow-hidden flex justify-between ${conversation?.lastMessage?.message ? "text-white" : "text-yellow-500"} ${user._id !== conversation?.lastMessage?.sender ? (conversation?.lastMessage?.isRead ? "text-white" : "text-green-600 font-bold") : "text-white"}`}>
                  <span>
                    {conversation?.lastMessage?.message}
                  </span>
                  <span className="text-2xl text-orange-600 pr-4">
                    {user._id !== conversation?.lastMessage?.sender && !conversation?.lastMessage?.isRead && <BsBellFill />}
                  </span>
                </div>
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
