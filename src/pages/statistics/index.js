import React from "react";
import { connect } from "react-redux";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import HeaderComponent from "src/components/HeaderComponent";
import { VictoryBar, VictoryAxis, VictoryStack, VictoryChart, VictoryLine, VictoryScatter, VictoryGroup } from "victory-native";
import { Images } from "src/assets/images";
import moment from "moment";
import { getActiveBaby, getActiveScreen } from "src/redux/selectors";
import { isEmptyObject } from "src/utils/native";
import styles from "./styles";
import { getStatistics } from "../../redux/selectors/statistics";
import * as statisticsAction from "../../redux/actions/statisticsAction";

class StatisticsScreen extends React.Component {
	static navigationOptions = ({ screenProps: { insets } }) => {
		return {
			headerTitle: <HeaderComponent insets={insets} />,
			headerStyle: { borderBottomWidth: 0, elevation: 0, paddingTop: 10 },
			headerLeft: null
		};
	};



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
				console.log("callingpi", this.state.currentDate)
				let startDate = moment(this.state.currentDate).subtract(6,'d').format('YYYY-MM-DD');;
				let endDate = moment(this.state.currentDate).format('YYYY-MM-DD');
				
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
		let startDate = moment().subtract(6,'d').format('YYYY-MM-DD');;
		let endDate = moment().format('YYYY-MM-DD');
		
		let data = new FormData();
		const { activeBaby } = this.props;

		if(activeBaby && activeBaby.id) {
			data.append("babyprofile_id", activeBaby.id);
			data.append("from_date", startDate);
			data.append("to_date", endDate);

			this.props.dispatchGetStatisticsList(data);
		}
 	}


	toHHMMSS = (secs) => {
		let time =  moment().startOf('day')
		 .seconds(secs)
		 .format('H:m:ss');

		let newTime = time.split(":");
		let str = ``;

		if(Number(newTime[0]) > 0) {
			if(Number(newTime[0]) > 1) {
				str += `${newTime[0]} hours `
			} else {
				str += `${newTime[0]} hour `
			}
		}

		if(Number(newTime[1]) > 0) {
			if(Number(newTime[1]) > 1) {
				str += `${newTime[1]} minutes`
			} else {
				str += `${newTime[1]} minutes`
			}
		}
		return str;
	}
	
	convertToSecound(hms) {
		if(!hms) {
			return '0 minute';
		}
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
		let startDate = moment(this.state.currentDate).subtract(6,'d').format('YYYY-MM-DD');;
		let endDate = moment(this.state.currentDate).format('YYYY-MM-DD');
		// console.log({startDate});
		let data = new FormData();
		const activeBaby = this.props.activeBaby;

		data.append("babyprofile_id", activeBaby.id);
		data.append("from_date", startDate);
		data.append("to_date", endDate);

		this.props.dispatchGetStatisticsList(data);
	}

	getRange(startDate, endDate, type) {
		let fromDate = moment(startDate)
		let toDate = moment(endDate)
		let diff = toDate.diff(fromDate, type)
		let range = []
		for (let i = 0; i < diff; i++) {
		  range.push(moment(startDate).add(i, type))
		}
		return range
	}

	getDaysArray(start, end) {
		for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
			arr.push(new Date(dt));
		}
		return arr;
	};

	render() {
		// console.log(this.props);
		const { statistics } = this.props;

		let breastfeeds = null;
		let breastfeedsItems = {
			left: [],
			right: []
		};
		let breastfeeds_total_time_avg;
		let breastfeeds_total_session_avg;

		let pumps = null;
		let pumpItems = {
			left: [],
			right: []
		};
		let pumps_total_time_avg;
		let pump_total_session_avg;
		let total_ounces_avg;

		let bottles = null;
		let bottleItems = []
		let bottle_total_ounces_avg;

		let diaper = null;
		let daily_average_poop;
		let daily_average_pee;
		const both = [];
		const pee = [];
		const poop = [];
		// const diaperLabels = [];
		let startDate = moment(this.state.currentDate).subtract(6,'d').format('YYYY-MM-DD');;
		let endDate = moment(this.state.currentDate).format('YYYY-MM-DD');

		// var range = moment().range(startDate, endDate);
		// var diff = range.diff('days');
		const tmpDateRanges = this.getDaysArray(new Date(startDate),new Date(endDate));
		const dateRange = [];
		for(let i in tmpDateRanges) {
			let name = moment(tmpDateRanges[i]).format('ddd');
			dateRange.push(name);
		
			breastfeedsItems.left.push({
				x: name,
				y: 0
			})
			breastfeedsItems.right.push({
				x: name,
				y: 0
			})	
			
			pumpItems.left.push({
				x: name,
				y: 0
			})
			pumpItems.right.push({
				x: name,
				y: 0
			})	

			bottleItems.push({
				x: name,
				y: 0
			})

			pee.push({
				x: name,
				y: 0
			})
			poop.push({
				x: name,
				y: 0
			})
			both.push({
				x: name,
				y: 0
			})
			
			
		}

		/// BreastFeet Default value assign


		// console.log({dateRange});
		if(statistics && statistics.Breastfeeds && statistics.Breastfeeds.Breastfeeds && statistics.Breastfeeds.Breastfeeds.length > 0) {
			breastfeeds = statistics.Breastfeeds;
			// const todayItems = breastfeeds.Breastfeeds.filter((x) => moment(x.created_at).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD"));
			const todayItems = breastfeeds.Breastfeeds;
			// console.log({todayItems});
			if(todayItems.length > 0) {
				let totalMin = 0;
				let totalSec = 0;

				for(let i in todayItems) {
					const _tmp = todayItems[i].total_time.split(":");
					totalMin += Number(_tmp[0]);
					totalSec += Number(_tmp[1]);
				}
				let _tmpTotal = (totalMin*60) + totalSec
				if(_tmpTotal < 60) {
					breastfeeds_total_time_avg = `${_tmpTotal}`
					breastfeeds_total_session_avg = `${Math.round((_tmpTotal/7))}`

					if(breastfeeds_total_time_avg > 1) {
						breastfeeds_total_time_avg = `${breastfeeds_total_time_avg}`
					} else {
						breastfeeds_total_time_avg = `${breastfeeds_total_time_avg}`
					}

					if(breastfeeds_total_session_avg > 1) {
						breastfeeds_total_session_avg = `${breastfeeds_total_session_avg}`
					} else {
						breastfeeds_total_session_avg = `${breastfeeds_total_session_avg}`
					}


				} else {
					breastfeeds_total_time_avg = `${Math.round(_tmpTotal/60)}`;
					breastfeeds_total_session_avg = `${Math.round((_tmpTotal/7)/60)}`;

					if(breastfeeds_total_time_avg > 1) {
						breastfeeds_total_time_avg = `${breastfeeds_total_time_avg}`
					} else {
						breastfeeds_total_time_avg = `${breastfeeds_total_time_avg}`
					}

					if(breastfeeds_total_session_avg > 1) {
						breastfeeds_total_session_avg = `${breastfeeds_total_session_avg}`
					} else {
						breastfeeds_total_session_avg = `${breastfeeds_total_session_avg}`
					}
				}
			}

			const left = JSON.parse(JSON.stringify(breastfeedsItems.left));
			const right = JSON.parse(JSON.stringify(breastfeedsItems.right));

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
				}
			}
			breastfeedsItems = {
				left,
				right
			};
		}

		if(statistics && statistics.pumps && statistics.pumps.pumps && statistics.pumps.pumps.length > 0) {
			pumps = statistics.pumps;
			// const todayItems = pumps.pumps.filter((x) => moment(x.created_at).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD"));
			const todayItems = pumps.pumps;

			if(todayItems.length > 0) {
				let totalMin = 0;
				let totalSec = 0;
				let totalOz = 0;

				for(let i in todayItems) {
					const _tmp = todayItems[i].total_time.split(":");
					totalMin += Number(_tmp[0]);
					totalSec += Number(_tmp[1]);
					totalOz += (Number(todayItems[i].total_amount));
				}
				let _tmpTotal = (totalMin*60) + totalSec

				if(_tmpTotal < 60) {
					pumps_total_time_avg = `${_tmpTotal}`
					pump_total_session_avg = `${Math.round((_tmpTotal/7))}`
					if(pumps_total_time_avg > 1) {
						pumps_total_time_avg = `${pumps_total_time_avg}`
					} else {
						pumps_total_time_avg = `${pumps_total_time_avg}`
					}

					if(pump_total_session_avg > 1) {
						pump_total_session_avg = `${pump_total_session_avg}`
					} else {
						pump_total_session_avg = `${pump_total_session_avg}`
					}
				} else {
					pumps_total_time_avg = `${Math.round(_tmpTotal/60)}`;
					pump_total_session_avg = `${Math.round((_tmpTotal/7)/60)}`;

					if(pumps_total_time_avg > 1) {
						pumps_total_time_avg = `${pumps_total_time_avg}`
					} else {
						pumps_total_time_avg = `${pumps_total_time_avg}`
					}

					if(pump_total_session_avg > 1) {
						pump_total_session_avg = `${pump_total_session_avg}`
					} else {
						pump_total_session_avg = `${pump_total_session_avg}`
					}
				}
				total_ounces_avg = totalOz;
			}

			const left = JSON.parse(JSON.stringify(pumpItems.left));
			const right = JSON.parse(JSON.stringify(pumpItems.right));

			for(let i in pumps.pumps) {
				const index = left.findIndex((x) => x.x === moment(pumps.pumps[i].created_at).format("ddd"));

				if(index > -1) {
					// Need to add in prev recorf
					let tmpLeft = Number(pumps.pumps[i].total_amount) + left[index].y;

					left[index] = {
						x: moment(pumps.pumps[i].created_at).format("ddd"),
						y: tmpLeft
					};
				}
			}
			pumpItems = {
				left,
				right
			};
		}

		if(statistics && statistics.bottles && statistics.bottles.bottles && statistics.bottles.bottles.length > 0) {
			bottles = statistics.bottles;
			bottle_total_ounces_avg;
			// const todayItems = bottles.bottles.filter((x) => moment(x.created_at).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD"));
			const todayItems = bottles.bottles;
			if(todayItems.length > 0) {
				let totalOz = 0;

				for(let i in todayItems) {
					totalOz += (Number(todayItems[i].amount))
				}

				bottle_total_ounces_avg = Math.round(totalOz/7);
			}
			const items = JSON.parse(JSON.stringify(bottleItems));

			for(let i in bottles.bottles) {
				const index = items.findIndex((x) => x.x === moment(bottles.bottles[i].created_at).format("ddd"));
				if(index > -1) {
					// Need to add in prev record
					let tmpLeft = Number(bottles.bottles[i].amount) + items[index].y;
					items[index] = {
						x: moment(bottles.bottles[i].created_at).format("ddd"),
						y: tmpLeft
					};
				}
			}
			bottleItems = items;
		}

		if(statistics && statistics.Diaper && statistics.Diaper.Diaper && statistics.Diaper.Diaper.length > 0) {
			diaper = statistics.Diaper;
			console.log({diaper})
			// const todayItemsPoop = diaper.Diaper.filter((x) => moment(x.created_at).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD") && x.type_of_diaper == 'Poop');
			// const todayItemsPee = diaper.Diaper.filter((x) => moment(x.created_at).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD") && x.type_of_diaper == 'Pee');
			daily_average_pee = Number(diaper.daily_average_pee).toFixed(2);
			daily_average_poop = Number(diaper.daily_average_poop).toFixed(2);
			const todayItemsPoop = diaper.Diaper.filter((x) => x.type_of_diaper == 'Poop');
			const todayItemsPee = diaper.Diaper.filter((x) => x.type_of_diaper == 'Pee');
			// console.log({todayItemsPoop});
			// console.log({todayItemsPee})
			
			// if(todayItemsPoop.length > 0) {
			// 	let totalPee = 0;
			// 	for(let i in todayItemsPoop) {
			// 		totalPee += 1
			// 	}
			// 	daily_average_poop = Math.round(totalPee/7);
			// }

			// if(todayItemsPee.length > 0) {
			// 	let totalPee = 0;
			// 	for(let i in todayItemsPee) {
			// 		totalPee += 1
			// 	}
			// 	daily_average_pee = Math.round(totalPee/7);
			// }

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
		}
		
		const { currentDate } = this.state;

		console.log({breastfeeds_total_session_avg})
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
				
					{/* 1 */}

					<View style={styles.statisticsgraphBox}>
						<Text style={styles.statisticsgraphTitle}>Breastfeeding:</Text>
						<View style={styles.statisticsgraphContent}>
							<Text style={styles.statisticsgraphText}>Daily Average Session Time:</Text>
							<Text style={styles.statisticsgraphTextOrange}>{( this.toHHMMSS(Number(breastfeeds_total_session_avg || 0) * 60) || "0 minute")}</Text>
						</View>
						<View style={styles.statisticsgraphContent}>
							<Text style={styles.statisticsgraphText}>Daily Average Total Time:</Text>
							<Text style={styles.statisticsgraphTextOrange}>{( this.toHHMMSS(Number(breastfeeds_total_time_avg || 0) * 60) || "0 minute")}</Text>
						</View>
						<View style={styles.statisticsgraphchart}>
							<View style={styles.statisticsVictoryStack}>
								<VictoryChart
									height={160}
									domainPadding={10}
								>
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
												return `${datum._y1}m`;
											}}
											style={{ labels: { fill: "#000", padding: 2.5, margin: 0, fontSize: 12, lineHeight: 16, letterSpacing: 0.4 } }}
											data={breastfeedsItems.right}
										/>
										
									</VictoryStack>
									<VictoryAxis
										tickValues={[1, 2, 3, 4, 5, 6, 7]}
										tickFormat={dateRange}
										style={{
											axis: { stroke: "#fff"},
											tickLabels: { fontSize: 12 }
										}}
									/>
								</VictoryChart>
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
							<Text style={styles.statisticsgraphTextOrange}>
								{total_ounces_avg || 0}
								{" "}
								{total_ounces_avg && total_ounces_avg > 1 ? 'ounces' : 'ounce'}
							</Text>
						</View>
						<View style={styles.statisticsgraphContent}>
							<Text style={styles.statisticsgraphText}>Daily Average Session Time:</Text>
							<Text style={styles.statisticsgraphTextOrange}>
								{(this.toHHMMSS(Number(pump_total_session_avg || 0)*60) || '0 minute')}
							</Text>
						</View>
						<View style={styles.statisticsgraphContent}>
							<Text style={styles.statisticsgraphText}>Daily Average Total Time:</Text>
							<Text style={styles.statisticsgraphTextOrange}>{(this.toHHMMSS(Number(pumps_total_time_avg || 0) * 60) || '0 minute')}</Text>
						</View>
						<View style={styles.statisticsgraphchart}>
							<View style={styles.statisticsVictoryStack}>
								<VictoryChart
									height={160}
									domainPadding={10}
								>
									<VictoryStack
										colorScale={["#E4B167", "#E4B167"]}
										height={160}
									>
										<VictoryBar
											barRatio={1}
											data={pumpItems.left}
										/>
										{/* <VictoryBar
											barRatio={1}
											labels={({ datum }) => `${datum._y1} oz`}
											style={{ labels: { fill: "#000", padding: 2.5, margin: 0, fontSize: 12, lineHeight: 16, letterSpacing: 0.4 } }}
											data={pumpItems.right}
										/> */}
									</VictoryStack>
									<VictoryAxis
										tickValues={[1, 2, 3, 4, 5, 6, 7]}
										tickFormat={dateRange}
										style={{
											axis: { stroke: "#fff"},
											tickLabels: { fontSize: 12 }
										}}
									/>
								</VictoryChart>
							</View>
							{/* <View style={styles.maincolorscaleStatic}>
								<View style={styles.colorscaleStatic}>
									<View style={styles.colorscaleblue} />
									<Text style={styles.statisticsgraphcolorTitle}>Breast</Text>
								</View>
								<View style={styles.colorscaleStatic}>
									<View style={styles.colorscaleorange} />
									<Text style={styles.statisticsgraphcolorTitle}>Right Breast</Text>
								</View>
							</View> */}
						</View>
					</View>
				

					{/* 3 */}
					
							<View style={styles.statisticsgraphBox}>
								<Text style={styles.statisticsgraphTitle}>Bottles:</Text>
								<View style={styles.statisticsgraphContent}>
									<Text style={styles.statisticsgraphText}>Daily Average Ounces:</Text>
									<Text style={styles.statisticsgraphTextOrange}>
									{bottle_total_ounces_avg || 0} {bottle_total_ounces_avg && bottle_total_ounces_avg > 1 ? 'ounces' : 'ounce'}
									</Text>
								</View>
								<View style={styles.statisticsgraphchart}>
									<VictoryChart
										domainPadding={30}
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
												size={5}
												data={bottleItems}
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
							<Text style={styles.statisticsgraphTextOrange}>
								{Math.ceil(daily_average_pee) || 0}
								{" "}
								{daily_average_pee && daily_average_pee > 1 ? 'diapers' : 'diaper'}
							</Text>
						</View>
						<View style={styles.statisticsgraphContent}>
							<Text style={styles.statisticsgraphText}>Daily Average of Poop:</Text>
							<Text style={styles.statisticsgraphTextOrange}>
								{Math.ceil(daily_average_poop) || 0}
								{" "}
								
								{daily_average_poop && daily_average_poop > 1 ? 'diapers' : 'diaper'}
							</Text>
						</View>
						<View style={styles.statisticsgraphchart}>
							<View style={styles.statisticsVictoryStack}>
								<VictoryChart
									height={260}
								>
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
									</VictoryStack>
									<VictoryAxis
										tickValues={[1, 2, 3, 4, 5, 6, 7]}
										tickFormat={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", ""]}
										style={{
											axis: { stroke: "#fff"},
											tickLabels: { fontSize: 12 }
										}}
									/>
								</VictoryChart>
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