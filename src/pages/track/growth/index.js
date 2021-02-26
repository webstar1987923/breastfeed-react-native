import React from "react";
import { connect } from "react-redux";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import * as authActions from "src/redux/actions/authActions";
import { VictoryChart, VictoryLine, VictoryTheme, VictoryGroup, VictoryScatter, VictoryAxis, VictoryCursorContainer } from "victory-native";
import * as growthActions from "src/redux/actions/growthActions";
import { Images } from "src/assets/images";
import { isEmptyObject } from "src/utils/native";
import { getActiveBaby } from "src/redux/selectors";

import styles from "./styles";
let temp = [];
class GrowthCards extends React.Component {
	componentDidMount() {
		const { currentDate, activeBaby } = this.props;
		this.growthFunction(currentDate, activeBaby);
	}

	componentDidUpdate(prevProps) {
		const { currentDate, activeBaby } = this.props;
		if(currentDate !== prevProps.currentDate || prevProps.activeBaby && activeBaby && prevProps.activeBaby.id !== activeBaby.id) {
			this.growthFunction(currentDate, activeBaby);
		}
	}

	growthFunction(currentDate, activeBaby) {
		console.log("activeBaby", activeBaby);
		// console.
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

	checkMonth(date) {
		let month = "";
		
		// console.log("dasdasd",date);
		if(date >= 1 && date <2) {
			month = "Jan"
		}
		if(date >= 2 && date <3) {
			month = "Feb"
		}
		if(date >= 3 && date < 4) {
			month = "March"
		}

		// const index = temp.findIndex((x) => x === month);
		// console.log("INDEX", index);
		// if(index > -1) {
		// 	return ""
		// } else {
		// 	temp.push(month);
		// }


		return month;
	}

	render() {
		temp = [];
		const { growth } = this.props;
		const list = growth.growthListing || [];

		const heightList = [];
		const widthList = [];

		let maxHeight = 0;
		let maxWidth = 0

		let minHeight = null;
		let minWidth = null;

		console.log("list", list);

		for(let i in list) {
			const index = heightList.findIndex((x) => x.x === list[i].date);
			if(index == -1) {
				heightList.push({
					x: list[i].date,
					y: Number(list[i].height)
				})

				maxHeight = maxHeight < Number(list[i].height) ? Number(list[i].height) : maxHeight;

				if(!minHeight) {
					minHeight = Number(list[i].height);
				}

				minHeight = minHeight > Number(list[i].height) ? Number(list[i].height) : minHeight;
			}

			const indexW = widthList.findIndex((x) => x.x === list[i].date);
			if(indexW == -1) {
				widthList.push({
					x:  list[i].date,
					y: Number(list[i].weight)
				})

				if(!minWidth) {
					minWidth = Number(list[i].weight);
				}

				maxWidth = maxWidth < Number(list[i].weight) ? Number(list[i].weight) : maxWidth;
				minWidth = minWidth > Number(list[i].weight) ? Number(list[i].weight) : minWidth
			}
		}


		// console.log({heightList, widthList})

		// if(minHeight === maxHeight) {
		// 	minHeight = minHeight - 1;
		// 	maxHeight = maxHeight + 1;
		// }

		// if(minWidth === maxWidth) {
		// 	minWidth = minWidth - 1;
		// 	maxWidth = maxWidth + 1;
		// }
		
		// console.log({maxHeight,maxWidth, minWidth, minHeight });


		return (
			<View style={styles.container}>
				<ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 70 }}>
					<View style={styles.graphTitle}>
						<Text style={styles.graphTitleText}>Current Height:</Text>
						<Text style={styles.graphTitleSelect}>65.9 in</Text>
					</View>
					
					<VictoryChart minDomain={{y: minHeight-1}}  maxDomain={{y: maxHeight+1}}>
						<VictoryGroup data={heightList}>
							<VictoryLine style={{
								data: { stroke: "#E4B167" },
								parent: { border: "1px solid #F0F0F0" }
							}}  />
							<VictoryScatter style={{ data: { fill: "#E4B167" } }} size={5}/>
						</VictoryGroup>
						<VictoryAxis/>
  						<VictoryAxis dependentAxis tickFormat={(x) => (`${Number(x)} in`)}/>
					</VictoryChart>
					
					
					<View style={styles.graphTitle}>
						<Text style={styles.graphTitleText}>Current Weight:</Text>
						<Text style={styles.graphTitleSelect}>16.1 lbs</Text>
					</View>

					<VictoryChart  minDomain={{y: minWidth-1}}  maxDomain={{y: maxWidth+1}}>
						<VictoryGroup data={widthList}>
							<VictoryLine style={{
								data: { stroke: "#E4B167" },
								parent: { border: "1px solid #F0F0F0" }
							}}  />
							<VictoryScatter style={{ data: { fill: "#E4B167" } }} size={5}/>
						</VictoryGroup>
						<VictoryAxis/>
  						<VictoryAxis dependentAxis tickFormat={(x) => (`${Number(x)} oz`)}/>
					</VictoryChart>
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