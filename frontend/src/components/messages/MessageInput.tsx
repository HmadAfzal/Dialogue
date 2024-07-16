import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { MessageBody } from "../../Schema/MessageType";
import axios from "axios";
import { ConversationType } from "../../Schema/conversationType";
import { useAppDispatch } from "../../redux/hooks";
import { addMessage } from "../../redux/messageslice";
const MessageInput = ({ conversation }: { conversation: ConversationType }) => {
	const messageSchema = z.object({
		message: z.string()
	})

	const { register, handleSubmit, resetField } = useForm<MessageBody>({ resolver: zodResolver(messageSchema) });

	const dispatch = useAppDispatch()
	const onSubmit = async (data: MessageBody) => {
		const response = await axios.post(`/api/messages/send/${conversation.id}`, data)
		dispatch(addMessage(response?.data))
		resetField('message')
	}

	return (
		<form className='px-4 mb-3 ' onSubmit={handleSubmit(onSubmit)}>
			<div className='w-full relative'>
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
					placeholder='Send a message'
					{...register("message")}
				/>
				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
					<Send className='w-6 h-6 text-white' />
				</button>
			</div>
		</form>
	);
};
export default MessageInput;
