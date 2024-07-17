import { useEffect, useState } from "react";
import { ConversationType } from "../../Schema/conversationType";
import { getRandomEmoji } from '../../utils/getEmoji'
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {  getConversation, selectConversation } from "../../redux/conversationslice";

const Conversation = ({ conversation }: { conversation: ConversationType }) => {
	
	const [emoji, setEmoji] = useState<string>()
	const selectedConversation=useAppSelector(getConversation);
	useEffect(() => {
		const emojiGot = getRandomEmoji();
		setEmoji(emojiGot)
	}, [])


	const dispatch = useAppDispatch()

	const selectConvo = (conversation: ConversationType) => {
		dispatch(selectConversation(conversation))
	}

	const isSelected=selectedConversation?.id==conversation.id

	return (
		<>
			<div className={`flex gap-2 items-center hover:bg-[#3bb9a4] rounded p-2 py-1 cursor-pointer ${isSelected && 'bg-[#3bb9a4]'}` } onClick={() => { selectConvo(conversation) }}>
				<div className='avatar online'>
					<div className='w-8 md:w-12 rounded-full'>
						<img src={conversation?.profilepic} alt='user avatar' />
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200 text-sm md:text-md'>{conversation?.fullname}</p>
						<span className='text-xl hidden md:inline-block'>{emoji}</span>
					</div>
				</div>
			</div>

			<div className='divider my-0 py-0 h-1' />
		</>
	);
};
export default Conversation;
