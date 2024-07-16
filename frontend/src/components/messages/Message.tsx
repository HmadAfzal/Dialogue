import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/userslice";
import { ConversationType } from "../../Schema/conversationType";
import { MessageType } from "../../Schema/MessageType";
import { extractTime } from "../../utils/convertTime";

interface MessageProps {
  message: MessageType;
  conversation: ConversationType;
}

const Message: React.FC<MessageProps> = ({ message, conversation }) => {
  const [fromMe, setFromMe] = useState(false);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user?.id === message.senderId) {
      setFromMe(true);
    } else {
      setFromMe(false);
    }
  }, [user, message.senderId]);

  const chatClass = fromMe ? "chat-end" : "chat-start";
  const bubbleBg = fromMe ? "bg-[#3bb9a4]" : "";

  return (
    <div className={`chat ${chatClass}`}>
      <div className="hidden md:block chat-image avatar">
        <div className="w-6 md:w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={fromMe ? user?.profilePic : conversation.profilepic}
          />
        </div>
      </div>
      <p className={`chat-bubble text-white ${bubbleBg} text-sm md:text-md`}>
        {message.body}
      </p>
      <span className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white">
        {extractTime(message.createdAt)}
      </span>
    </div>
  );
};

export default Message;
