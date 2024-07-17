import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";

import notificationSound from "../assets/sounds/notification.mp3";
import { useAppDispatch } from "../redux/hooks";
import { addMessage } from "../redux/messageslice";

const useListenMessages = () => {
    const dispatch=useAppDispatch();
	const { socket } = useSocketContext();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			newMessage.shouldShake = true;
			const sound = new Audio(notificationSound);
			sound.play();
			dispatch(addMessage(newMessage))
		});

		return () => {
			socket?.off("newMessage");
		};
	}, [socket, dispatch]);
};
export default useListenMessages;