import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Linking } from "react-native";
import { Images } from "src/assets/images";
import styles from "./styles";

class ManualsScreen extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<View style={styles.supportList}>
						<TouchableOpacity style={styles.supportListItem} onPress={() => Linking.openURL("https://drive.google.com/file/d/1QLUKhwUH4HJsCznrb3PDj1mt8B6fUUL7/view")}>
							<Text style={styles.supportText}>Hygeia Evolve Instructions for Use</Text>
							<Image
								source={Images.ContactusScreen.rightArrowIcon}
								style={styles.supportImage}
							/>
						</TouchableOpacity>
						<TouchableOpacity style={styles.supportListItem} onPress={() => Linking.openURL("https://www.hygeiahealth.com/wp-content/uploads/2021/01/Hygeia-Evolve-Instructions-for-Use-Spanish.pdf")}>
							<Text style={styles.supportText}>Instrucciones de Uso Hygeia Evolve</Text>
							<Image
								source={Images.ContactusScreen.rightArrowIcon}
								style={styles.supportImage}
							/>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		);
	}
}

export default ManualsScreen;