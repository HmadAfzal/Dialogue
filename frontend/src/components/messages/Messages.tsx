import toast from 'react-hot-toast';
import Message from './Message';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getConversation } from '../../redux/conversationslice';
import { MessageType } from '../../Schema/MessageType';
import { setMessages } from '../../redux/messageslice';

const Messages = () => {
  const [msgs, setMsgs] = useState<MessageType[] | null>(null);
  const convo = useAppSelector(getConversation);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (convo) {
          const response = await axios.get(`/api/messages/${convo.id}`);
          dispatch(setMessages(response?.data));
          setMsgs(response.data);
        }
      } catch (error: any) {
        console.error(error.response.data.error);
        toast.error(error.response.data.error);
      }
    };

    fetchMessages();
  }, [convo, msgs, dispatch]);

  return (
    <>
      {msgs?.length === 0 && (
      <div className='px-4 py-2 w-full flex items-center justify-center'> <h1 className=' text-lg font-semibold text-gray-200'>
          Be the first to start a conversation
        </h1></div>
      )}

      {msgs && convo && (
        <div className='px-4 flex-1 overflow-auto'>
          {msgs.map((message: MessageType) => (
            <Message key={message.id} message={message} conversation={convo} />
          ))}
        </div>
      )}
    </>
  );
};

export default Messages;
