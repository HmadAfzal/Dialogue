import { useEffect, useState } from "react";
import Conversation from "./Conversation";
import axios from "axios";
import { ConversationType } from "../../Schema/conversationType";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";


const Conversations = () => {
const [conversations, setConversations]=useState<ConversationType[]>([])
const [loading, setLoading]=useState(false)

useEffect(()=>{
try {
	setLoading(true)
	const fetchConversations=async()=>{
	const response=await axios.get('/api/messages/conversations')
	setConversations(response?.data)
	}
	fetchConversations();
} catch (error:any) {
	console.log(error.response.data.error)
	toast.error(error.response.data.error);
} finally{
	setLoading(false)
}
},[])

	return (
		<>
		{
loading ? <div className="w-full flex items-center justify-center"><Loader2 className="animate-spin"/></div>  :
		
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation) => (
				<Conversation key={conversation?.id} conversation={conversation}/>
			))}
		</div>}</>
	);
};
export default Conversations;
