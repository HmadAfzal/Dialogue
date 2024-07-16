import { useEffect, useState } from "react";
import Conversation from "./Conversation";
import axios from "axios";
import { ConversationType } from "../../Schema/conversationType";
import toast from "react-hot-toast";


const Conversations = () => {
const [conversations, setConversations]=useState<ConversationType[]>([])

useEffect(()=>{
try {
	const fetchConversations=async()=>{
	const response=await axios.get('/api/messages/conversations')
	setConversations(response?.data)
	}
	fetchConversations();
} catch (error:any) {
	console.log(error.response.data.error)
	toast.error(error.response.data.error);
}
},[])

	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation) => (
				<Conversation key={conversation?.id} conversation={conversation}/>
			))}
		</div>
	);
};
export default Conversations;
