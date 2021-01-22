import React from "react";
import { connect } from "react-redux";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import * as authActions from "src/redux/actions/authActions";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory-native";
import { Images } from "src/assets/images";
import styles from "./styles";

class GrowthCards extends React.Component {
	componentDidMount() {
	}

	redirectToAddEntry() {
		const { navigation } = this.props;
		navigation.navigate("AddGrowth");
	}

	render() {
		return (
			<View style={styles.container}>
				<ScrollView style={styles.scrollView}>
					<View style={styles.graphTitle}>
						<Text style={styles.graphTitleText}>Current Height:</Text>
						<Text style={styles.graphTitleSelect}>65.9 in</Text>
					</View>
					<VictoryChart
						theme={VictoryTheme.material}
					>
					  <VictoryLine
					    style={{
					      data: { stroke: "#E4B167" },
					      parent: { border: "1px solid #F0F0F0"}
					    }}
					    data={[
					      { x: "Aug", y: "0 in" },
					      { x: "Sep", y: "20 in" },
					      { x: "Oct", y: "40 in" },
					      { x: "Nov", y: "60 in" }
					    ]}
					  />
					</VictoryChart>
					<View style={styles.graphTitle}>
						<Text style={styles.graphTitleText}>Current Weight:</Text>
						<Text style={styles.graphTitleSelect}>16.1 lbs</Text>
					</View>
					<VictoryChart
						theme={VictoryTheme.material}
					>
					  <VictoryLine
					    style={{
					      data: { stroke: "#E4B167" },
					      parent: { border: "1px solid #F0F0F0"}
					    }}
					    data={[
					      { x: "Aug", y: "0 in" },
					      { x: "Sep", y: "20 in" },
					      { x: "Oct", y: "40 in" },
					      { x: "Nov", y: "60 in" }
					    ]}
					  />
					</VictoryChart>
				</ScrollView>
				<View style={styles.addBreastfeed}>
					<TouchableOpacity onPress={() => this.redirectToAddEntry()}>
						<View style={styles.addBreastfeedButton}>
							<Image
								source={Images.GrowthCards.plusIcon}
								style={styles.dotsIcon}
							/>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const mapDispatchToProps = {
	dispatchResetAuthState: () => authActions.resetAuthState()
};

export default connect(null, mapDispatchToProps)(GrowthCards);