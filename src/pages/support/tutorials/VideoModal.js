import React from "react";
import { Modal, View, Text } from "react-native";
import VideoPlayer from "react-native-video-controls";
import { Button } from "native-base";

function VideoModal(props) {
	const { isModalOpen, videoUrl, onClose } = props;
    console.log({isModalOpen, videoUrl, onClose })
	return (
		<Modal
			visible={isModalOpen}
		>
				<>
                <VideoPlayer
                    onBack={() => onClose()}
					source={{
						uri: videoUrl
					}}
					onError={(err) => {
						console.log(err);
					}}
				/>
                </>
		</Modal>
	);
}

export default VideoModal;
