import React from "react";
import { connect } from "react-redux";
import { View, Text, Image, ScrollView } from "react-native";
import * as authActions from "src/redux/actions/authActions";
import LanguageSwitcher from "src/components/LanguageSwitcher";
import HeaderComponent from "src/components/HeaderComponent";
import { VictoryBar, VictoryAxis, VictoryStack, VictoryLabel, VictoryChart, VictoryLine, VictoryTheme, VictoryScatter, VictoryGroup } from "victory-native";
import { Images } from "src/assets/images";
import { translate } from "src/locales/i18n";
import styles from "./styles";

class StatisticsScreen extends React.Component {
	static navigationOptions = ({ navigation, screenProps: { i18n, insets } }) => {
		return {
			title: translate("statisticsScreen.headerTitle"),
			headerRight: (
				<LanguageSwitcher navigation={navigation} i18n={i18n} insets={insets} />
			)
		};
	};

	static navigationOptions = {
		header: <HeaderComponent />
	}

	componentDidMount() {
	}

	render() {
		return (
			<ScrollView>
				<View style={styles.container}>
					<View style={styles.statisticsHeader}>
						<View style={styles.prevArrow}>
							<Image
								source={Images.Statistics.prevIcon}
								style={styles.ArrowIcon}
							/>
						</View>
						<Text style={styles.statisticsTitle}>Today</Text>
						<View style={styles.nextArrow}>
							<Image
								source={Images.Statistics.nextIcon}
								style={styles.Disable}
							/>
						</View>
					</View>
					{/* 1 */}
					<View style={styles.statisticsgraphBox}>
						<Text style={styles.statisticsgraphTitle}>Breastfeeding:</Text>
						<View style={styles.statisticsgraphContent}>
							<Text style={styles.statisticsgraphText}>Daily Average Session Time:</Text>
							<Text style={styles.statisticsgraphTextOrange}>20 minutes</Text>
						</View>
						<View style={styles.statisticsgraphContent}>
							<Text style={styles.statisticsgraphText}>Daily Average Total Time:</Text>
							<Text style={styles.statisticsgraphTextOrange}>12 hours</Text>
						</View>
						<View style={styles.statisticsgraphchart}>
							<View style={styles.statisticsVictoryStack}>
								<VictoryStack
									colorScale={["#4B2785", "#E4B167"]}
									height={160}
								>
									<VictoryBar
										barRatio={1}
										data={[
											{ x: "Mon", y: 79 },
											{ x: "Tue", y: 85 },
											{ x: "Wed", y: 86 },
											{ x: "Thu", y: 81 },
											{ x: "Fri", y: 77 },
											{ x: "Sat", y: 90 },
											{ x: "Sun", y: 78 }
										]}
									/>
									<VictoryBar
										barRatio={1}
										labels={({ datum }) => `${datum.y}m`}
										style={{ labels: { fill: "#000", padding: 2.5, margin: 0, fontSize: 12, lineHeight: 16, letterSpacing: 0.4 } }}
										data={[
											{ x: "Mon", y: 85 },
											{ x: "Tue", y: 75 },
											{ x: "Wed", y: 85 },
											{ x: "Thu", y: 88 },
											{ x: "Fri", y: 90 },
											{ x: "Sat", y: 90 },
											{ x: "Sun", y: 70 }
										]}
									/>
									<VictoryAxis
										tickValues={[1, 2, 3, 4, 5, 6, 7]}
										tickFormat={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
										tickLabelComponent={(
											<VictoryLabel
												dy={-5}
												style={[
													{ fill: "#000", fontSize: 12, lineHeight: 16, letterSpacing: 0.4 }
												]}
											/>
										)}
									/>
								</VictoryStack>
							</View>
							<View style={styles.maincolorscaleStatic}>
								<View style={styles.colorscaleStatic}>
									<View style={styles.colorscaleblue} />
									<Text style={styles.statisticsgraphcolorTitle}>Left Breast</Text>
								</View>
								<View style={styles.colorscaleStatic}>
									<View style={styles.colorscaleorange} />
									<Text style={styles.statisticsgraphcolorTitle}>Right Breast</Text>
								</View>
							</View>
						</View>
					</View>
					{/* 2 */}
					<View style={styles.statisticsgraphBox}>
						<Text style={styles.statisticsgraphTitle}>Pumping:</Text>
						<View style={styles.statisticsgraphContent}>
							<Text style={styles.statisticsgraphText}>Daily Average Ounces:</Text>
							<Text style={styles.statisticsgraphTextOrange}>12 ounces</Text>
						</View>
						<View style={styles.statisticsgraphContent}>
							<Text style={styles.statisticsgraphText}>Daily Average Session Time:</Text>
							<Text style={styles.statisticsgraphTextOrange}>30 minutes</Text>
						</View>
						<View style={styles.statisticsgraphContent}>
							<Text style={styles.statisticsgraphText}>Daily Average Total Time:</Text>
							<Text style={styles.statisticsgraphTextOrange}>12 hours</Text>
						</View>
						<View style={styles.statisticsgraphchart}>
							<View style={styles.statisticsVictoryStack}>
								<VictoryStack
									colorScale={["#4B2785", "#E4B167"]}
									height={160}
								>
									<VictoryBar
										barRatio={1}
										data={[
											{ x: "Mon", y: 79 },
											{ x: "Tue", y: 85 },
											{ x: "Wed", y: 86 },
											{ x: "Thu", y: 81 },
											{ x: "Fri", y: 77 },
											{ x: "Sat", y: 90 },
											{ x: "Sun", y: 78 }
										]}
									/>
									<VictoryBar
										barRatio={1}
										labels={({ datum }) => `${datum.y}oz`}
										style={{ labels: { fill: "#000", padding: 2.5, margin: 0, fontSize: 12, lineHeight: 16, letterSpacing: 0.4 } }}
										data={[
											{ x: "Mon", y: 85 },
											{ x: "Tue", y: 75 },
											{ x: "Wed", y: 85 },
											{ x: "Thu", y: 88 },
											{ x: "Fri", y: 90 },
											{ x: "Sat", y: 90 },
											{ x: "Sun", y: 70 }
										]}
									/>
									<VictoryAxis
										tickValues={[1, 2, 3, 4, 5, 6, 7]}
										tickFormat={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
										tickLabelComponent={(
											<VictoryLabel
												dy={-5}
												style={[
													{ fill: "#000", fontSize: 12, lineHeight: 16, letterSpacing: 0.4 }
												]}
											/>
										)}
									/>
								</VictoryStack>
							</View>
							<View style={styles.maincolorscaleStatic}>
								<View style={styles.colorscaleStatic}>
									<View style={styles.colorscaleblue} />
									<Text style={styles.statisticsgraphcolorTitle}>Left Breast</Text>
								</View>
								<View style={styles.colorscaleStatic}>
									<View style={styles.colorscaleorange} />
									<Text style={styles.statisticsgraphcolorTitle}>Right Breast</Text>
								</View>
							</View>
						</View>
					</View>
					{/* 3 */}
					<View style={styles.statisticsgraphBox}>
						<Text style={styles.statisticsgraphTitle}>Bottles:</Text>
						<View style={styles.statisticsgraphContent}>
							<Text style={styles.statisticsgraphText}>Daily Average Ounces:</Text>
							<Text style={styles.statisticsgraphTextOrange}>12 ounces</Text>
						</View>
						<View style={styles.statisticsgraphchart}>
							<VictoryChart
								theme={VictoryTheme.material}
							>
								<VictoryGroup>
									<VictoryLine
										style={{
											data: { stroke: "#E4B167" },
											parent: { border: "1px solid #ccc" }
										}}
										data={[
											{ x: "Mon", y: "0 oz" },
											{ x: "Tue", y: "5 oz" },
											{ x: "Wed", y: "10 oz" },
											{ x: "Thu", y: "15 oz" },
											{ x: "Fri", y: "17 oz" },
											{ x: "Sat", y: "18 oz" },
											{ x: "Sun", y: "20 oz" }
										]}
									/>
									<VictoryScatter
										style={{ data: { fill: "#E4B167", stroke: "#E4B167" } }}
										size={4}
										data={[
											{ x: "Mon", y: "0 oz" },
											{ x: "Tue", y: "5 oz" },
											{ x: "Wed", y: "10 oz" },
											{ x: "Thu", y: "15 oz" },
											{ x: "Fri", y: "17 oz" },
											{ x: "Sat", y: "18 oz" },
											{ x: "Sun", y: "20 oz" }
										]}
									/>
								</VictoryGroup>
							</VictoryChart>
						</View>
					</View>
					{/* 4 */}
					<View style={styles.statisticsgraphBox}>
						<Text style={styles.statisticsgraphTitle}>Diapers:</Text>
						<View style={styles.statisticsgraphContent}>
							<Text style={styles.statisticsgraphText}>Daily Average of Pee:</Text>
							<Text style={styles.statisticsgraphTextOrange}>12 diapers</Text>
						</View>
						<View style={styles.statisticsgraphContent}>
							<Text style={styles.statisticsgraphText}>Daily Average of Poop:</Text>
							<Text style={styles.statisticsgraphTextOrange}>10 diapers</Text>
						</View>
						<View style={styles.statisticsgraphchart}>
							<View style={styles.statisticsVictoryStack}>
								<VictoryStack
									colorScale={["#4B2785", "#E4B167", "#F3921F"]}
									height={260}
								>
									<VictoryBar
										barRatio={0.8}
										data={[
											{ x: "Mon", y: 79 },
											{ x: "Tue", y: 52 },
											{ x: "Wed", y: 62 },
											{ x: "Thu", y: 72 },
											{ x: "Fri", y: 81 },
											{ x: "Sat", y: 53 },
											{ x: "Sun", y: 62 }
										]}
									/>
									<VictoryBar
										barRatio={0.8}
										data={[
											{ x: "Mon", y: 80 },
											{ x: "Tue", y: 83 },
											{ x: "Wed", y: 86 },
											{ x: "Thu", y: 80 },
											{ x: "Fri", y: 77 },
											{ x: "Sat", y: 103 },
											{ x: "Sun", y: 79 }
										]}
									/>
									<VictoryBar
										barRatio={0.8}
										data={[
											{ x: "Mon", y: 98 },
											{ x: "Tue", y: 83 },
											{ x: "Wed", y: 93 },
											{ x: "Thu", y: 95 },
											{ x: "Fri", y: 65 },
											{ x: "Sat", y: 40 },
											{ x: "Sun", y: 83 }
										]}
									/>
									<VictoryAxis
										tickValues={[1, 2, 3, 4, 5, 6, 7]}
										tickFormat={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
										tickLabelComponent={(
											<VictoryLabel
												dy={-5}
												style={[
													{ fill: "#999", fontSize: 12, lineHeight: 16, letterSpacing: 0.4 }
												]}
											/>
										)}
									/>
								</VictoryStack>
							</View>
							<View style={styles.maincolorscaleStatic}>
								<View style={styles.colorscaleStatic}>
									<View style={styles.colorscaleblue} />
									<Text style={styles.statisticsgraphcolorTitle}>Pee</Text>
								</View>
								<View style={styles.colorscaleStatic}>
									<View style={styles.colorscaleorange} />
									<Text style={styles.statisticsgraphcolorTitle}>Poop</Text>
								</View>
								<View style={styles.colorscaleStatic}>
									<View style={styles.colorscaledarkorange} />
									<Text style={styles.statisticsgraphcolorTitle}>Both</Text>
								</View>
							</View>
						</View>
					</View>
				</View>
			</ScrollView>
		);
	}
}

const mapDispatchToProps = {
	dispatchResetAuthState: () => authActions.resetAuthState()
};

export default connect(null, mapDispatchToProps)(StatisticsScreen);