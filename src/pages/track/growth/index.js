/* eslint-disable guard-for-in */
import React from "react";
import { connect } from "react-redux";
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, Dimensions } from "react-native";
import * as authActions from "src/redux/actions/authActions";
import { VictoryChart, VictoryLine, VictoryGroup, VictoryScatter, VictoryAxis, VictoryTheme } from "victory-native";
import * as growthActions from "src/redux/actions/growthActions";
import { Images } from "src/assets/images";
import {
	LineChart
  } from "react-native-chart-kit";
import { getActiveBaby } from "src/redux/selectors";
import Svg from "react-native-svg";

import moment from "moment";
import styles from "./styles";

let temp = [];
const chartData = [
	["Nov", 1, 20],
	["Nov", 2, 24],
	["Nov", 3, ],
	["Nov", 4, 28],
	["Dec", 1, 33],
	["Dec", 2, 36],
	["Dec", 3, 41],
	["Dec", 4, 43],
	["Jan", 1, 45],
	["Jan", 2, ],
	["Jan", 3, 50],
	["Jan", 4, 53],
	["Feb", 1, 54],
	["Feb", 2, 54],
	["Feb", 3, ],
	["Feb", 4, 56],
	["Mar", 1, 56],
	["Mar", 2, 58],
	["Mar", 3, ],
	["Mar", 4, ],
	["Apr", 1, ],
	["Apr", 2, ],
	["Apr", 3, ],
	["Apr", 4, ],
	["May", 1, ],
	["May", 2, ],
	["May", 3, ],
	["May", 4, ],
	["Jun", 1, ],
	["Jun", 2, ],
	["Jun", 3, ],
	["Jun", 4, ],
	["Jul", 1, ],
	["Jul", 2, ],
	["Jul", 3, ],
	["Jul", 4, ],
	["Aug", 1, ],
	["Aug", 2, ],
	["Aug", 3, ],
	["Aug", 4, ],
	["Sep", 1, ],
	["Sep", 2, ],
	["Sep", 3, ],
	["Sep", 4, ],
	["Oct", 1, ],
	["Oct", 2, ],
	["Oct", 3, ],
	["Oct", 4, ]
];
class GrowthCards extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedPoint: null,
			from: null,
			isModalOpen: false,
			heightList: null,
			weightLBList: null,
			weightOZList: null
		};
	}

	componentDidMount() {
		const { currentDate, activeBaby } = this.props;
		this.growthFunction(currentDate, activeBaby);
		let height = [];
		for(let i = 0; i < 100; i++) {
			height.push({ label: `${i / 2} Inches`, value: i / 2 });
		}

		let weightLB = [];
		for(let i = 0; i < 50; i++) {
			weightLB.push({ label: `${i} lb`, value: i });
		}

		let weightOZ = [];
		for(let i = 0; i < 50; i++) {
			weightOZ.push({ label: `${i} oz`, value: i });
		}
		this.setState({
			weightOZList: weightOZ,
			weightLBList: weightLB,
			heightList: height
		});
	}

	componentDidUpdate(prevProps) {
		const { currentDate, activeBaby } = this.props;
		if(currentDate !== prevProps.currentDate || prevProps.activeBaby && activeBaby && prevProps.activeBaby.id !== activeBaby.id) {
			this.growthFunction(currentDate, activeBaby);
		}
	}

	growthFunction(currentDate, activeBaby) {
		const { dispatchGrowthListing } = this.props;
		if(activeBaby) {
			const data = {
				babyprofile_id: activeBaby.id,
				date: currentDate,
			};
			dispatchGrowthListing(data);
		}
	}

	redirectToAddEntry() {
		const { navigation } = this.props;
		navigation.navigate("AddGrowth");
	}

	// eslint-disable-next-line class-methods-use-this
	checkMonth(date) {
		let month = "";

		if(date >= 1 && date < 2) {
			month = "Jan";
		}
		if(date >= 2 && date < 3) {
			month = "Feb";
		}
		if(date >= 3 && date < 4) {
			month = "March";
		}

		return month;
	}

	setPoint(data) {
		if(JSON.stringify(data) === JSON.stringify(this.state)) {
			this.setState({
				from: null,
				selectedPoint: null
			});
			return;
		}
		this.setState({ ...data });
	}

	render() {
		temp = [];
		const { growth } = this.props;
		const list = growth.growthListing || [];
		const heightList = [];
		const weightList = [];

		// eslint-disable-next-line no-restricted-syntax
		for(let i in list) {
			const index = heightList.findIndex((x) => x.x === list[i].date);
			if(index === -1) {
				heightList.push({
					x: list[i].date,
					y: Number(list[i].height)
				});
			}

			const indexW = weightList.findIndex((x) => x.x === list[i].date);
			if(indexW === -1) {
				weightList.push({
					x: list[i].date,
					y: Number(list[i].weight_oz)
				});
			}
		}

		if(heightList.length === 0) {
			heightList.push({
				x: moment().format("YYYY-MM-DD"),
				y: 0
			});
			weightList.push({
				x: moment().format("YYYY-MM-DD"),
				y: 0
			});
		}

		const { selectedPoint, from, isModalOpen } = this.state;
		const itemsGraph = [{
			x: "Nov",
			y: 5
		}, {
			x: "Nov-2",
			y: 10
		}, {
			x: "Nov-3",
			y: 15
		}, {
			x: "Dec",
			y: 20
		}, {
			x: "Dec-2",
			y: 25
		}, {
			x: "Dec",
			y: 30
		}, {
			x: "Jan",
			y: 35
		}, {
			x: "Jan-2",
			y: 40
		}, {
			x: "Jan-3",
			y: 45
		}, {
			x: "Feb",
			y: 35
		}, {
			x: "Feb-2",
			y: 40
		}, {
			x: "Feb-3",
			y: 45
		}, {
			x: "March",
			y: 35
		}, {
			x: "March-2",
			y: 40
		}, {
			x: "March-3",
			y: 45
		}, {
			x: "April",
			y: 50
		}, {
			x: "April-2",
			y: 55
		}, {
			x: "April-3",
			y: 60
		}, {
			x: "May",
			y: 65
		}, {
			x: "May 2",
			y: 66
		}, {
			x: "May 3",
			y: 68
		}, {
			x: "Jun",
			y: 70
		}, {
			x: "Jun 2",
			y: 72
		}, {
			x: "Jun 3",
			y: 75
		}, {
			x: "July",
			y: 78
		}, {
			x: "July 2",
			y: 80
		}, {
			x: "July 3",
			y: 82
		}, {
			x: "Aug",
			y: 84
		}, {
			x: "Aug 2",
			y: 88
		}, {
			x: "Aug 3",
			y: 90
		}, {
			x: "Sept",
			y: 92
		}, {
			x: "Sept 2",
			y: 94
		}, {
			x: "Sept 3",
			y: 96
		}];
		const recordGraphs = [];
		const months = ["March", "April", "May", "Jun", "July", "Aug", "Sept", "Nov", "Dec", "Jan", "Feb"];
		let counter = 2;
		for(let i in months) {
			for(let j = 1; j <= 4; j++) {
				if(j === 1) {
					recordGraphs.push({
						x: `${months[i]}`,
						y: counter
					});
				} else {
					recordGraphs.push({
						x: `${months[i]} ${j}`,
						y: counter
					});
				}
				counter += 2;
			}
		}

		const currentHeight = heightList[heightList.length - 1].y;
		const currentWeight = (list.length > 0) ? list[list.length - 1].weight_lb : 0;
		console.log({ recordGraphs });

		return (
			<View style={styles.container}>
				<Modal
					animationType="slide"
					transparent={true}
					visible={isModalOpen}
					onRequestClose={() => {
						this.setState({ isModalOpen: false });
					}}
				>
					<View style={styles.setModalCentered}>
						<View style={styles.setModalView}>
							<View style={styles.setModalHeader}>
								<Text style={styles.cancelText} onPress={() => this.setState({ isModalOpen: false })}>Cancel</Text>
							</View>
							{ (selectedPoint) && (
								<View>
									<Text>
										Date:
										{selectedPoint.x}
										{" "}
										{from == "height" ? "Height" : "Weight"}
										:
										{" "}
										{selectedPoint.y}
									</Text>
								</View>
							)}
						</View>

					</View>
				</Modal>
				<ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 10 }}>
					<View>
					<LineChart
						data={{
							labels: ['January', 'February', 'March', 'April'],
							datasets: [
							{
								data: [
								Math.random() * 100,
								Math.random() * 100,
								Math.random() * 100,
								Math.random() * 100,
								Math.random() * 100,
								Math.random() * 100,
								],
							},
							],
						}}
						width={Dimensions.get('window').width - 16} // from react-native
						height={220}
						yAxisLabel={'Rs'}
						chartConfig={{
							backgroundColor: '#1cc910',
							backgroundGradientFrom: '#eff3ff',
							backgroundGradientTo: '#efefef',
							decimalPlaces: 2, // optional, defaults to 2dp
							color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
							style: {
							borderRadius: 16,
							},
						}}
						bezier
						style={{
							marginVertical: 8,
							borderRadius: 16,
						}}
						/>
					</View>
					<Svg width={400} height={400} viewBox="0 0 400 400" style={{ width: "100%", height: "auto" }}>
						<VictoryChart standalone={false} minDomain={{ y: 0 }}>
							<VictoryGroup data={recordGraphs}>
								<VictoryLine
									style={{
										data: { stroke: "#E4B167" },
										parent: { border: "1px solid #F0F0F0" }
									}}
								/>
								<VictoryScatter
									style={{ data: { fill: "#E4B167" } }}
									size={5}
									// events={[{
									// 	target: "data",
									// 	eventHandlers: {
									// 		onPressIn: (data, item, vlaue) => {
									// 			this.setPoint({
									// 				selectedPoint: item.datum,
									// 				from: "height",
									// 				isModalOpen: true
									// 			});
									// 			return [];
									// 		}
									// 	}
									// }]}
								/>
								<VictoryAxis tickValues={[0, 20, 40, 60, 80, 100]} dependentAxis tickFormat={(x) => (`${Number(x)} in`)} />
							</VictoryGroup>
							<VictoryAxis
								style={{ axisLabel: { fontSize: 12, padding: 5, angle: 90 }, tickLabels: { fontSize: 12, padding: 10, angle: 90, verticalAnchor: "middle", textAnchor: "start" } }}
							/>
						</VictoryChart>
					</Svg>
					<View style={styles.graphTitle}>
						<Text style={styles.graphTitleText}>Current Height:</Text>
						<Text style={styles.graphTitleSelect}>
							{currentHeight}
							{" "}
							in
						</Text>
					</View>
					<Svg width={400} height={300} viewBox="0 0 400 300" style={{ width: "100%", height: "auto" }}>
						<VictoryChart standalone={false} minDomain={{ y: 0 }} maxDomain={{ y: 60 }}>
							<VictoryGroup data={heightList}>
								<VictoryLine
									style={{
										data: { stroke: "#E4B167" },
										parent: { border: "1px solid #F0F0F0" }
									}}
								/>
								<VictoryScatter
									style={{ data: { fill: "#E4B167" } }}
									size={9}
									events={[{
										target: "data",
										eventHandlers: {
											onPressIn: (data, item, vlaue) => {
												this.setPoint({
													selectedPoint: item.datum,
													from: "height",
													isModalOpen: true
												});
												return [];
											}
										}
									}]}
								/>
								<VictoryAxis tickValues={[0, 20, 40, 60]} dependentAxis tickFormat={(x) => (`${Number(x)} in`)} />
							</VictoryGroup>
							<VictoryAxis />

						</VictoryChart>
					</Svg>

					<View style={styles.graphTitle}>
						<Text style={styles.graphTitleText}>Current Weight:</Text>
						<Text style={styles.graphTitleSelect}>
							{currentWeight}
							{" "}
							lbs
						</Text>
					</View>
					<Svg width={400} height={300} viewBox="0 0 400 300" style={{ width: "100%", height: "auto" }}>
						<VictoryChart standalone={false} minDomain={{ y: 0 }} maxDomain={{ y: 35 }}>
							<VictoryGroup data={weightList}>
								<VictoryLine style={{
									data: { stroke: "#E4B167" },
									parent: { border: "1px solid #F0F0F0" }
								}}
								/>
								<VictoryScatter
									style={{ data: { fill: "#E4B167" } }}
									size={9}
									events={[{
										target: "data",
										eventHandlers: {
											onPressIn: (data, item, vlaue) => {
												this.setPoint({
													selectedPoint: item.datum,
													from: "width",
													isModalOpen: true
												});
												return [];
											}
										}
									}]}
								/>
							</VictoryGroup>
							<VictoryAxis
								tickFormat={(x) => {
									console.log(x, "HELLo");
									return x;
								}}
							/>
							<VictoryAxis tickValues={[0, 10, 20, 30, 40]} dependentAxis tickFormat={(x) => (`${Number(x)} oz`)} />
						</VictoryChart>
					</Svg>
				</ScrollView>
				<TouchableOpacity style={styles.addBreastfeed} onPress={() => this.redirectToAddEntry()}>
					<Image
						source={Images.GrowthCards.plusIcon}
						style={styles.dotsIcon}
					/>
				</TouchableOpacity>
			</View>
		);
	}
}

const mapStateToProps = (state) => ({
	growth: state.growthReducer,
	activeBaby: getActiveBaby(state)
});

const mapDispatchToProps = {
	dispatchGrowthListing: (data) => growthActions.handleGrowthListing(data),
	dispatchResetAuthState: () => authActions.resetAuthState()
};

export default connect(mapStateToProps, mapDispatchToProps)(GrowthCards);