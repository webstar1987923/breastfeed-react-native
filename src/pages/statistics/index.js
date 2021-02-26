import React, { useEffect } from "react";
import { connect } from "react-redux";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import LanguageSwitcher from "src/components/LanguageSwitcher";
import HeaderComponent from "src/components/HeaderComponent";
import { VictoryBar, VictoryAxis, VictoryStack, VictoryLabel, VictoryChart, VictoryLine, VictoryTheme, VictoryScatter, VictoryGroup } from "victory-native";
import { Images } from "src/assets/images";
import { translate } from "src/locales/i18n";
import moment from "moment";
import { getActiveBaby, getActiveScreen } from "src/redux/selectors";
import { isEmptyObject } from "src/utils/native";
import styles from "./styles";
import { getStatistics } from "../../redux/selectors/statistics";
import * as statisticsAction from "../../redux/actions/statisticsAction";

class StatisticsScreen extends React.Component {
	static navigationOptions = {
		headerTitle: <HeaderComponent />,
		headerStyle: { borderBottomWidth: 0, elevation: 0, paddingTop: 10 },
	}



	constructor(props) {
		super();
		this.state = {
			currentDate: moment().format("MMMM DD, YYYY"),
		};
	}

	componentDidUpdate(prevProps) {
		const { activeBaby,  navigation, activeScreen } = this.props;
		const { routeName } = navigation.state;


		if (prevProps.activeBaby && activeBaby && prevProps.activeBaby.id !== activeBaby.id) {
			const data = {
				babyprofile_id: activeBaby.id
			};
		}
		if (activeScreen !== null && (activeScreen === "Statistics" && routeName === "Statistics")) {
			if (!isEmptyObject(activeBaby)) {
				let startDate = moment().subtract(7,'d').format('YYYY-MM-DD');;
				let endDate = moment().add(1, 'd').format('YYYY-MM-DD');
				
				let data = new FormData();
				const activeBaby = this.props.activeBaby;

				data.append("babyprofile_id", activeBaby.id);
				data.append("from_date", startDate);
				data.append("to_date", endDate);

				this.props.dispatchGetStatisticsList(data);
			}
		}
		
		
	}

	componentDidMount() {

		// console.log(">>>>>>>>")
		let startDate = moment().subtract(7,'d').format('YYYY-MM-DD');;
		let endDate = moment().add(1, 'd').format('YYYY-MM-DD');
		
		let data = new FormData();
		const { activeBaby } = this.props;

		if(activeBaby && activeBaby.id) {
			data.append("babyprofile_id", activeBaby.id);
			data.append("from_date", startDate);
			data.append("to_date", endDate);

			this.props.dispatchGetStatisticsList(data);
		}
 	}

	convertToSecound(hms) {
		let a = hms.split(":"); // split it at the colons
		let total = Number(a[0]) * 60 + Number(a[1]);
		let temp = Math.ceil(Number(total / 60).toFixed(1));
		if(temp > 60) {
			let hh = Math.ceil(tmemp / 60);
			if(hh == 1) {
				return `${hh} hour`;
			}
			return `${hh} hours`;
		} else {
			return `${temp} minutes`;
		}
	}

	convertToGraph(hms) {
		let a = hms.split(":"); // split it at the colons
		let total = Number(a[0]) * 60 + Number(a[1]);
		let temp = Math.ceil(Number(total / 60).toFixed(1));
		return temp;
	}
	prevClick(currentDate) {
		this.setState({ currentDate: moment(currentDate).subtract(1, "days").format("MMMM DD, YYYY") }, () => this.fetchData());
	}

	nextClick(currentDate) {
		this.setState({ currentDate: moment(currentDate).add(1, "days").format("MMMM DD, YYYY") }, () => this.fetchData());
	}

	fetchData() {
		let startDate = moment(this.state.currentDate).subtract(7,'d').format('YYYY-MM-DD');;
		let endDate = moment(this.state.currentDate).add(1, 'd').format('YYYY-MM-DD');
		
		let data = new FormData();
		const activeBaby = this.props.activeBaby;

		data.append("babyprofile_id", activeBaby.id);
		data.append("from_date", startDate);
		data.append("to_date", endDate);

		this.props.dispatchGetStatisticsList(data);
	}

	render() {
		// console.log(this.props);
		const { statistics } = this.props;

		let breastfeeds = null;
		let breastfeedsItems = {};
		let breastfeeds_total_time_avg;
		let breastfeeds_total_session_avg;

		let pumps = null;
		let pumpItems = [];
		let pumps_total_time_avg;
		let pump_total_session_avg;
		let total_ounces_avg;

		let bottles = null;
		let bottleItems = [];
		let bottle_total_ounces_avg;

		let diaper = null;
		let daily_average_poop;
		let daily_average_pee;
		const both = [];
		const pee = [];
		const poop = [];
		// const diaperLabels = [];

		if(statistics && statistics.Breastfeeds && statistics.Breastfeeds.Breastfeeds && statistics.Breastfeeds.Breastfeeds.length > 0) {
			breastfeeds = statistics.Breastfeeds;
			breastfeeds_total_time_avg = breastfeeds.breastfeeds_total_time_avg;
			breastfeeds_total_session_avg = breastfeeds.breastfeeds_total_session_avg;
			const left = [];
			const right = [];

			for(let i in breastfeeds.Breastfeeds) {
				const index = left.findIndex((x) => x.x === moment(breastfeeds.Breastfeeds[i].created_at).format("ddd"));

				if(index > -1) {
					// Need to add in prev record

					let tmpLeft = this.convertToGraph(breastfeeds.Breastfeeds[i].left_breast) + left[index].y;
					let tmpRight = this.convertToGraph(breastfeeds.Breastfeeds[i].right_breast) + right[index].y;

					left[index] = {
						x: moment(breastfeeds.Breastfeeds[i].created_at).format("ddd"),
						y: tmpLeft
					};
					right[index] = {
						x: moment(breastfeeds.Breastfeeds[i].created_at).format("ddd"),
						y: tmpRight
					};
				} else {
					left.push({
						x: moment(breastfeeds.Breastfeeds[i].created_at).format("ddd"),
						y: this.convertToGraph(breastfeeds.Breastfeeds[i].left_breast)
					});

					right.push({
						x: moment(breastfeeds.Breastfeeds[i].created_at).format("ddd"),
						y: this.convertToGraph(breastfeeds.Breastfeeds[i].right_breast)
					});
				}
			}
			breastfeedsItems = {
				left,
				right
			};

			// console.log({left, right});
		}

		if(statistics && statistics.pumps && statistics.pumps.pumps && statistics.pumps.pumps.length > 0) {
			pumps = statistics.pumps;
			// breastfeeds_total_time_avg = breastfeeds.breastfeeds_total_time_avg;
			// breastfeeds_total_session_avg = breastfeeds.breastfeeds_total_session_avg;
			pumps_total_time_avg = pumps.pumps_total_time_avg;
			pump_total_session_avg = pumps.pump_total_session_avg;
			total_ounces_avg = pumps.total_ounces_avg;
			const left = [];
			const right = [];

			for(let i in pumps.pumps) {
				const index = left.findIndex((x) => x.x === moment(pumps.pumps[i].created_at).format("ddd"));

				if(index > -1) {
					// Need to add in prev record

					let tmpLeft = Number(pumps.pumps[i].left_amount) + left[index].y;
					let tmpRight = Number(pumps.pumps[i].right_amount) + right[index].y;

					left[index] = {
						x: moment(pumps.pumps[i].created_at).format("ddd"),
						y: tmpLeft
					};
					right[index] = {
						x: moment(pumps.pumps[i].created_at).format("ddd"),
						y: tmpRight
					};
				} else {
					left.push({
						x: moment(pumps.pumps[i].created_at).format("ddd"),
						y: Number(pumps.pumps[i].left_amount)
					});

					right.push({
						x: moment(pumps.pumps[i].created_at).format("ddd"),
						y: Number(pumps.pumps[i].right_amount)
					});
				}
			}
			pumpItems = {
				left,
				right
			};
		}

		if(statistics && statistics.bottles && statistics.bottles.bottles && statistics.bottles.bottles.length > 0) {
			bottles = statistics.bottles;
			bottle_total_ounces_avg = bottles.bottle_total_ounces_avg;
			const items = [];

			for(let i in bottles.bottles) {
				const index = items.findIndex((x) => x.x === moment(bottles.bottles[i].created_at).format("ddd"));

				if(index > -1) {
					// Need to add in prev record

					let tmpLeft = Number(bottles.bottles[i].amount) + items[index].y;

					items[index] = {
						x: moment(bottles.bottles[i].created_at).format("ddd"),
						y: tmpLeft
					};
				} else {
					items.push({
						x: moment(bottles.bottles[i].created_at).format("ddd"),
						y: Number(bottles.bottles[i].amount)
					});
				}
			}

			bottleItems = items;
		}

		if(statistics && statistics.Diaper && statistics.Diaper.Diaper && statistics.Diaper.Diaper.length > 0) {
			diaper = statistics.Diaper;
			daily_average_poop = diaper.daily_average_poop;
			daily_average_pee = diaper.daily_average_pee;

			// const items = [];

			for(let i in diaper.Diaper) {
				let type = diaper.Diaper[i].type_of_diaper;

				if(type === "Pee") {
					const index = pee.findIndex((x) => x.x === moment(diaper.Diaper[i].created_at).format("ddd"));

					if(index == -1) {
						pee.push({
							x: moment(diaper.Diaper[i].created_at).format("ddd"),
							y: 1
						});
						poop.push({
							x: moment(diaper.Diaper[i].created_at).format("ddd"),
							y: 0
						});
						both.push({
							x: moment(diaper.Diaper[i].created_at).format("ddd"),
							y: 0
						});
					} else {
						pee[index] = {
							x: moment(diaper.Diaper[i].created_at).format("ddd"),
							y: pee[index].y + 1
						};
					}
				}

				if(type === "Both") {
					const index = pee.findIndex((x) => x.x === moment(diaper.Diaper[i].created_at).format("ddd"));

					if(index == -1) {
						both.push({
							x: moment(diaper.Diaper[i].created_at).format("ddd"),
							y: 1
						});
						pee.push({
							x: moment(diaper.Diaper[i].created_at).format("ddd"),
							y: 0
						});
						poop.push({
							x: moment(diaper.Diaper[i].created_at).format("ddd"),
							y: 0
						});
					} else {
						both[index] = {
							x: moment(diaper.Diaper[i].created_at).format("ddd"),
							y: both[index].y + 1
						};
					}
				}

				if(type === "Poop") {
					const index = pee.findIndex((x) => x.x === moment(diaper.Diaper[i].created_at).format("ddd"));

					if(index == -1) {
						poop.push({
							x: moment(diaper.Diaper[i].created_at).format("ddd"),
							y: 1
						});
						pee.push({
							x: moment(diaper.Diaper[i].created_at).format("ddd"),
							y: 0
						});
						both.push({
							x: moment(diaper.Diaper[i].created_at).format("ddd"),
							y: 0
						});
					} else {
						poop[index] = {
							x: moment(diaper.Diaper[i].created_at).format("ddd"),
							y: poop[index].y + 1
						};
					}
				}
			}
			// bottleItems = items;
		}
		// console.log("bottles", breastfeedsItems)
		const { currentDate } = this.state;
		return (
			<ScrollView>
				<View style={styles.container}>
					<View style={styles.statisticsHeader}>
						<TouchableOpacity style={styles.prevArrow} onPress={() => { this.prevClick(currentDate); }}>
							<View style={styles.prevArrow}>
								<Image
									source={Images.Statistics.prevIcon}
									style={styles.ArrowIcon}
								/>
							</View>
						</TouchableOpacity>
						<Text style={styles.statisticsTitle}>
						{currentDate == moment().format("MMMM DD, YYYY") ? "Today" : currentDate == moment().subtract(1, "days").format("MMMM DD, YYYY") == true ? "Yesterday" : currentDate}
						</Text>
						
						{
						currentDate == moment().format("MMMM DD, YYYY")
							? (
								<TouchableOpacity style={styles.nextArrow}>
									<Image
										source={Images.Track.nextIcon}
										style={styles.Disable}
									/>
								</TouchableOpacity>
							)
							: 	(
								<TouchableOpacity style={styles.nextArrow} onPress={() => { this.nextClick(currentDate); }}>
									<Image
										source={Images.Track.nextIcon}
										style={styles.ArrowIcon}
									/>
								</TouchableOpacity>
							)
						}
					</View>
					{
						(!breastfeeds && !pumps && !bottles && !diaper) && (
							<View>
								<Text>No Record found</Text>
							</View>
						)
					}
					{/* 1 */}

					{
						breastfeeds && (
							<View style={styles.statisticsgraphBox}>
								<Text style={styles.statisticsgraphTitle}>Breastfeeding:</Text>
								<View style={styles.statisticsgraphContent}>
									<Text style={styles.statisticsgraphText}>Daily Average Session Time:</Text>
									<Text style={styles.statisticsgraphTextOrange}>{this.convertToSecound(breastfeeds_total_time_avg)}</Text>
								</View>
								<View style={styles.statisticsgraphContent}>
									<Text style={styles.statisticsgraphText}>Daily Average Total Time:</Text>
									<Text style={styles.statisticsgraphTextOrange}>{this.convertToSecound(breastfeeds_total_session_avg)}</Text>
								</View>
								<View style={styles.statisticsgraphchart}>
									<View style={styles.statisticsVictoryStack}>
										<VictoryStack
											colorScale={["#4B2785", "#E4B167"]}
											height={160}
										>
											<VictoryBar
												barRatio={1}
												data={breastfeedsItems.left}
											/>
											<VictoryBar
												barRatio={1}
												labels={({ datum }) => {
													// console.log(datum)
													return `${datum._y1}m`;
												}}
												style={{ labels: { fill: "#000", padding: 2.5, margin: 0, fontSize: 12, lineHeight: 16, letterSpacing: 0.4 } }}
												data={breastfeedsItems.right}
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
						)
					}
					{/* 2 */}
					{
						pumps && (
							<View style={styles.statisticsgraphBox}>
								<Text style={styles.statisticsgraphTitle}>Pumping:</Text>
								<View style={styles.statisticsgraphContent}>
									<Text style={styles.statisticsgraphText}>Daily Average Ounces:</Text>
									<Text style={styles.statisticsgraphTextOrange}>
										{total_ounces_avg}
										{" "}
										ounces
									</Text>
								</View>
								<View style={styles.statisticsgraphContent}>
									<Text style={styles.statisticsgraphText}>Daily Average Session Time:</Text>
									<Text style={styles.statisticsgraphTextOrange}>{this.convertToSecound(pump_total_session_avg)}</Text>
								</View>
								<View style={styles.statisticsgraphContent}>
									<Text style={styles.statisticsgraphText}>Daily Average Total Time:</Text>
									<Text style={styles.statisticsgraphTextOrange}>{this.convertToSecound(pumps_total_time_avg)}</Text>
								</View>
								<View style={styles.statisticsgraphchart}>
									<View style={styles.statisticsVictoryStack}>
										<VictoryStack
											colorScale={["#4B2785", "#E4B167"]}
											height={160}
										>
											<VictoryBar
												barRatio={1}
												data={pumpItems.left}
											/>
											<VictoryBar
												barRatio={1}
												labels={({ datum }) => `${datum._y1}oz`}
												style={{ labels: { fill: "#000", padding: 2.5, margin: 0, fontSize: 12, lineHeight: 16, letterSpacing: 0.4 } }}
												data={pumpItems.right}
											/>
											<VictoryAxis
												tickValues={[1, 2, 3, 4, 5, 6, 7]}
												tickFormat={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", ""]}
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
						)
					}

					{/* 3 */}
					{
						bottles && (
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
												data={bottleItems}
											/>
											<VictoryScatter
												style={{ data: { fill: "#E4B167", stroke: "#E4B167" } }}
												size={4}
												data={bottleItems}
											/>
										</VictoryGroup>
									</VictoryChart>
								</View>
							</View>
						)
					}
					{/* 4 */}
					{
						diaper && (
							<View style={styles.statisticsgraphBox}>
								<Text style={styles.statisticsgraphTitle}>Diapers:</Text>
								<View style={styles.statisticsgraphContent}>
									<Text style={styles.statisticsgraphText}>Daily Average of Pee:</Text>
									<Text style={styles.statisticsgraphTextOrange}>
										{daily_average_pee}
										{" "}
										diapers
									</Text>
								</View>
								<View style={styles.statisticsgraphContent}>
									<Text style={styles.statisticsgraphText}>Daily Average of Poop:</Text>
									<Text style={styles.statisticsgraphTextOrange}>
										{daily_average_poop}
										{" "}
										diapers
									</Text>
								</View>
								<View style={styles.statisticsgraphchart}>
									<View style={styles.statisticsVictoryStack}>
										<VictoryStack
											colorScale={["#4B2785", "#E4B167", "#F3921F"]}
											height={260}
										>
											<VictoryBar
												barRatio={0.8}
												data={pee}
											/>
											<VictoryBar
												barRatio={0.8}
												data={poop}
											/>
											<VictoryBar
												barRatio={0.8}
												data={both}
											/>
											<VictoryAxis
												tickValues={[1, 2, 3, 4, 5, 6, 7]}
												tickFormat={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", ""]}
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
						)
					}
				</View>
			</ScrollView>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.authReducer,
	statistics: getStatistics(state),
	activeBaby: getActiveBaby(state),
	activeScreen: getActiveScreen(state)
});
const mapDispatchToProps = {
	dispatchResetAuthState: () => authActions.resetAuthState(),
	dispatchGetStatisticsList: (data) => statisticsAction.getStatisticsList(data)
};

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsScreen);