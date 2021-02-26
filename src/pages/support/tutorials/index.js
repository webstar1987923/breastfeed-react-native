import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Modal } from "react-native";
import { WebView } from 'react-native-webview';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Images } from "src/assets/images";
import styles from "./styles";

class TutorialsScreen extends React.Component {

	constructor() {
		super();
		this.state = {
			modalVisible: false,
			tutorialsVideo: null
		};
	}

	setModalVisible = (visible, video) => {
		this.setState({ modalVisible: visible });
		this.setState({ tutorialsVideo: video });
	}

	render() {
		const { modalVisible, tutorialsVideo } = this.state;
		
		return (
			<View style={styles.container}>
				<ScrollView>
					<View>
						<TouchableOpacity style={styles.tutorialsVideoBox} onPress={() => this.setModalVisible(true, 'https://player.vimeo.com/video/490523886?autoplay=1&loop=1&autopause=0')}>
							<View style={styles.tutorialsVideoImage}>
								<Image
									source={Images.Tutorials.tutorialsVideo1}
									style={styles.tutorialsVideo}
								/>
								<Text style={styles.tutorialsVideoTime}>2:31</Text>
							</View>
							<Text style={styles.tutorialsvideoText}>How to Operate Final | English</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.tutorialsVideoBox} onPress={() => this.setModalVisible(true, 'https://player.vimeo.com/video/490896029?autoplay=1&loop=1&autopause=0')}>
							<View style={styles.tutorialsVideoImage}>
								<Image
									source={Images.Tutorials.tutorialsVideo2}
									style={styles.tutorialsVideo}
								/>
								<Text style={styles.tutorialsVideoTime}>1:54</Text>
							</View>
							<Text style={styles.tutorialsvideoText}>How to Clean Final | English</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.tutorialsVideoBox} onPress={() => this.setModalVisible(true, 'https://player.vimeo.com/video/491921534?autoplay=1&loop=1&autopause=0')}>
							<View style={styles.tutorialsVideoImage}>
								<Image
									source={Images.Tutorials.tutorialsVideo3}
									style={styles.tutorialsVideo}
								/>
								<Text style={styles.tutorialsVideoTime}>1:04</Text>
							</View>
							<Text style={styles.tutorialsvideoText}>Key Features v4 | English</Text>
						</TouchableOpacity>						
					</View>
				</ScrollView>
				{
					modalVisible ?
						<WebView
							style={{flex:1}}
							javaScriptEnabled={true}
							source={{uri: tutorialsVideo}}
						/>
					:null										
				}
			</View>
		);
	}
}

export default TutorialsScreen;