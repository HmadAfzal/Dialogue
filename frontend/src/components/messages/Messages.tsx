import toast from "react-hot-toast";
import Message from "./Message";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getConversation } from "../../redux/conversationslice";
import { MessageType } from "../../Schema/MessageType";
import { getMessages, setMessages } from "../../redux/messageslice";
import MessageSkeleton from "../skeletons/MessageSkeleton";

const Messages = () => {
  const [loading, setLoading] = useState(false);
  const convo = useAppSelector(getConversation);
  const messages = useAppSelector(getMessages); // Get messages from the store
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (convo) {
          setLoading(true);
          const response = await axios.get(`/api/messages/${convo.id}`);
          dispatch(setMessages(response?.data));
        }
      } catch (error: any) {
        console.error(error.response.data.error);
        toast.error(error.response.data.error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [convo, dispatch]);

  return (
    <>
      {loading ? (
        <div className="px-4 py-4 w-full h-[100%]">
          <MessageSkeleton />
          <MessageSkeleton />
          <MessageSkeleton />
          <MessageSkeleton />
          <MessageSkeleton />
        </div>
      ) : (
        <>
          {messages.length === 0 && (
            <div className="px-4 py-2 w-full flex items-center justify-center">
              <h1 className="text-lg font-semibold text-gray-200">
                Be the first to start a conversation
              </h1>
            </div>
          )}

          {messages && convo && (
            <div className="px-4 flex-1 overflow-auto">
              {messages.map((message: MessageType) => (
                <Message key={message.id} message={message} conversation={convo} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Messages;
