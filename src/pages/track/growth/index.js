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
	// ["Apr", 1, ],
	// ["Apr", 2, ],
	// ["Apr", 3, ],
	// ["Apr", 4, ],
	
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
		console.log("caelld>>>>>", prevProps.tabReducer, this.props.tabReducer)
		const { currentDate, activeBaby } = this.props;
		if(currentDate !== prevProps.currentDate || prevProps.activeBaby && activeBaby && prevProps.activeBaby.id !== activeBaby.id) {
			this.growthFunction(currentDate, activeBaby);
		}

		// eslint-disable-next-line react/destructuring-assignment
		if(prevProps.tabReducer.trackActiveTab !== this.props.tabReducer.trackActiveTab && activeBaby && activeBaby.id) {
			// eslint-disable-next-line react/destructuring-assignment
			if(this.props.tabReducer.trackActiveTab === "Growth") {
				this.growthFunction(currentDate, activeBaby);
			}			
		}
	}

	growthFunction(currentDate, activeBaby) {
		console.log("####");
		const { dispatchGrowthListing } = this.props;
		if(activeBaby) {
			const data = {
				babyprofile_id: activeBaby.id,
				date: moment(currentDate).format("YYYY-MM-DD"),
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
		let list = growth.growthListing || [];
		console.log({growth})
		list = list.sort(function compare(a, b) {
			var dateA = new Date(a.date);
			var dateB = new Date(b.date);
			return dateA - dateB;
		  });
		  
		// const heightList = [];
		// const weightList = [];
		// const graphItems = [];
		// const graphItemMonths = [];

		const monthListings = [];
		const itemsHeightWithMonths = [];
		const itemsWeightWithMonths = [];
		const itemsWeightLBSWithMonths = [];


		const _itemHeight = [];
		const _itemWeightWithLBS = [];
		const _itemWeightWithOZ = [];

		// Last 4 Months 
		for(let i=4;i>=1; i--) {
			let startMonth = moment().subtract(i, 'months').startOf("month");
			let endMonth = moment().subtract(i, 'months').endOf("month");
			console.log(">>>>>>>")
			_itemHeight.push({
				month: moment().subtract(i, 'months').startOf("month").format("MMM"),
				number: Number(moment().subtract(i, 'months').startOf("month").format("M")),
				values: []
			})
			_itemWeightWithLBS.push({
				month: moment().subtract(i, 'months').startOf("month").format("MMM"),
				number: Number(moment().subtract(i, 'months').startOf("month").format("M")),
				values: []
			})
			_itemWeightWithOZ.push({
				month: moment().subtract(i, 'months').startOf("month").format("MMM"),
				number: Number(moment().subtract(i, 'months').startOf("month").format("M")),
				values: []
			})

			const index = _itemHeight.findIndex((x) => x.month === moment().subtract(i, 'months').startOf("month").format("MMM"));
			for(let j in list) {
				
				if((moment(list[j].date).isAfter(startMonth) && moment(list[j].date).isBefore(endMonth)) || moment(list[j].date).isSame(endMonth) || moment(list[j].date).isSame(startMonth)) {
					
					_itemHeight[index].values.push(Number(list[j].height));
					_itemWeightWithLBS[index].values.push(Number(list[j].weight_lb));
					_itemWeightWithOZ[index].values.push(Number(list[j].weight_oz));

					// OLD
					itemsHeightWithMonths.push(Number(list[j].height));
					itemsWeightWithMonths.push(Number(list[j].weight_oz));
					itemsWeightLBSWithMonths.push(Number(list[j].weight_lb));
				}
			}
			monthListings.push(moment().subtract(i, 'months').startOf("month").format("MMM"));
		}
		

		// CURRENT MONTH
		monthListings.push(moment().format("MMM"));
		let startMonth = moment().startOf("month");
		let endMonth = moment().endOf("month");

		_itemHeight.push({
			month: moment().startOf("month").format("MMM"),
			number: Number(moment().startOf("month").format("M")),
			values: []
		})
		_itemWeightWithLBS.push({
			month: moment().startOf("month").format("MMM"),
			number: Number(moment().startOf("month").format("M")),
			values: []
		})
		_itemWeightWithOZ.push({
			month: moment().startOf("month").format("MMM"),
			number: Number(moment().startOf("month").format("M")),
			values: []
		})
		const index = _itemHeight.findIndex((x) => x.month === moment().startOf("month").format("MMM"));
		for(let j in list) {
			if((moment(list[j].date).isAfter(startMonth) && moment(list[j].date).isBefore(endMonth)) || moment(list[j].date).isSame(endMonth) || moment(list[j].date).isSame(startMonth)) {
				

				const startOfWeek = moment().startOf('month').week();
				const endOfWeek = moment().endOf('month').week();
				const currentWeek = moment().week();
				console.log(">>>>>>>>>>>>>", list[j].date, moment(list[j].date).week(), currentWeek)
				// for(let i = startOfWeek; i<=currentWeek; i++) {
					
					if(moment(list[j].date).week() == currentWeek) {
						console.log({currentWeek});
						_itemHeight[index].values.push(Number(list[j].height));
						_itemWeightWithLBS[index].values.push(Number(list[j].weight_lb));
						_itemWeightWithOZ[index].values.push(Number(list[j].weight_oz));
					} else if(moment(list[j].date).week() < currentWeek){
						console.log("NOT MARCH")
						console.log(_itemHeight[index-1].values[_itemHeight[index-1].values.length-1])
						// _itemHeight[index].values.push(_itemHeight[index-1].values[_itemHeight[index-1].values.length-1]);
					}
				// }
				console.log({startOfWeek, endOfWeek, currentWeek})
				// for()

				// const dateWeek = moment(list[j].date).startOf().week();
				// const startOfWeek = moment().startOf().week()

				// // if(dateWeek > startOfWeek && )

				// console.log("WEK", moment(list[j].date).startOf().week())
				// console.log("CURRENT ", moment().startOf('month').week());
				// console.log("LAST  CURRENT ", moment().endOf('month').week());

				// console.log(" Last WEK", moment(list[j].date).endOf().week())
				// console.log("LAST  CURRENT ", moment().endOf().week());

				/// OLD
				itemsHeightWithMonths.push(Number(list[j].height));
				itemsWeightWithMonths.push(Number(list[j].weight_oz));
				itemsWeightLBSWithMonths.push(Number(list[j].weight_lb));
				// /// NEW
				// _itemHeight[index].values.push(Number(list[j].height));
				// _itemWeightWithLBS[index].values.push(Number(list[j].weight_lb));
				// _itemWeightWithOZ[index].values.push(Number(list[j].weight_oz));
			}
		}

		const _itemsListForGraph = [];
		const _itemsListForGraphWeightOZ = [];

		/// height Graph
		for(let i in _itemHeight) {
			if(_itemHeight[i].values.length != 4) {
				for(let j=0; j<4; j++) {
					if(_itemHeight[i].values[j]) {
						_itemsListForGraph.push(_itemHeight[i].values[j])
					} else {
						_itemsListForGraph.push(_itemsListForGraph[_itemsListForGraph.length-1] || 0);
					}
				}
			} else {
				for(let j=0; j<4; j++) {
					if(_itemHeight[i].values[j]) {
						_itemsListForGraph.push(_itemHeight[i].values[j])
					} else {
						_itemsListForGraph.push(_itemsListForGraph[_itemsListForGraph.length-1] || 0);
					}
				}
			}
		}
		// Weight Graph
		for(let i in _itemWeightWithOZ) {
			if(_itemWeightWithOZ[i].values.length != 4) {
				for(let j=0; j<4; j++) {
					if(_itemWeightWithOZ[i].values[j]) {
						_itemsListForGraphWeightOZ.push(_itemWeightWithOZ[i].values[j])
					} else {
						_itemsListForGraphWeightOZ.push(_itemsListForGraphWeightOZ[_itemsListForGraphWeightOZ.length-1] || 0);
					}
				}
			} else {
				for(let j=0; j<4; j++) {
					if(_itemWeightWithOZ[i].values[j]) {
						_itemsListForGraphWeightOZ.push(_itemWeightWithOZ[i].values[j])
					} else {
						_itemsListForGraphWeightOZ.push(_itemsListForGraphWeightOZ[_itemsListForGraphWeightOZ.length-1] || 0);
					}
				}
			}
		}

		const { selectedPoint, from, isModalOpen } = this.state;
	
		const currentHeight = (list.length > 0) ? list[list.length - 1].height : 0;
		const currentWeight = (list.length > 0) ? list[list.length - 1].weight_lb : 0;
		
		console.log({_itemHeight})
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
					
					<View style={styles.graphTitle}>
						<Text style={styles.graphTitleText}>Current Height:</Text>
						<Text style={styles.graphTitleSelect}>
							{currentHeight}
							{" "}
							in
						</Text>
					</View>
					{
						itemsHeightWithMonths.length > 0 && (
							<View>
								<LineChart
									data={{
										labels: monthListings,
										datasets: [
										{
											data: _itemsListForGraph
										},
										],
									}}
									width={Dimensions.get('window').width - 5} // from react-native
									height={230}
									chartConfig={{
										backgroundColor: '#fff',
										backgroundGradientFrom: '#fff',
										backgroundGradientTo: '#fff',
										decimalPlaces: 0, // optional, defaults to 2dp
										color: (opacity = 1) => `rgba(243, 146, 31, ${opacity})`,
      									labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
									}}
									bezier={false}
									style={{
										marginVertical: 20,
										marginLeft: -30
									}}
									/>
							</View>
						)
					}

					<View style={styles.graphTitle}>
						<Text style={styles.graphTitleText}>Current Weight:</Text>
						<Text style={styles.graphTitleSelect}>
							{currentWeight}
							{" "}
							lbs
						</Text>
					</View>
					{
						itemsWeightWithMonths.length > 0 && (
							<View>
								<LineChart
									data={{
										labels: monthListings,
										datasets: [
										{
											data: _itemsListForGraphWeightOZ
										},
										],
									}}
									width={Dimensions.get('window').width - 5} // from react-native
									height={230}
									chartConfig={{
										backgroundColor: '#fff',
										backgroundGradientFrom: '#fff',
										backgroundGradientTo: '#fff',
										decimalPlaces: 0, // optional, defaults to 2dp
										color: (opacity = 1) => `rgba(243, 146, 31, ${opacity})`,
      									labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
									}}
									bezier={false}
									style={{
										marginVertical: 20,
										marginLeft: -30
									}}
									/>
							</View>
						)
					}
					{/* <Svg width={400} height={300} viewBox="0 0 400 300" style={{ width: "100%", height: "auto" }}>
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
					</Svg> */}
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
	activeBaby: getActiveBaby(state),
	tabReducer: state.tabReducer,
	track: state.trackReducer
});

const mapDispatchToProps = {
	dispatchGrowthListing: (data) => growthActions.handleGrowthListing(data),
	dispatchResetAuthState: () => authActions.resetAuthState()
};

export default connect(mapStateToProps, mapDispatchToProps)(GrowthCards);