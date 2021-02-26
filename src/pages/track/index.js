import React from "react";
import { connect } from "react-redux";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { Tabs, ScrollableTab } from "native-base";
import * as authActions from "src/redux/actions/authActions";
import moment from "moment";
import HeaderComponent from "src/components/HeaderComponent";
import { Images } from "src/assets/images";
import styles from "./styles";
import BreastfeedCards from "./breastfeed";
import PumpCards from "./pump";
import BottlesCards from "./bottles";
import DiapersCards from "./diapers";
import GrowthCards from "./growth";
import { getActiveIndex } from "./tab-menu";
import { act } from "react-test-renderer";

function TabFirstComponent({ child }) {
	return (
		<View style={{ flex: 1, flexGrow: 1 }}>
			{ child }
		</View>
	);
}

class TrackScreen extends React.Component {
	static navigationOptions = {
		headerTitle: <HeaderComponent />,
		headerStyle: { borderBottomWidth: 0, elevation: 0, paddingTop: 10 },
		headerLeft: null
	}

	constructor(props) {
		super();
		const { navigation } = props;
		const initialTab = navigation.getParam("activeTab") || "Breastfeed";
		this.state = {
			selectedTab: initialTab,
			activeIndex: getActiveIndex(initialTab),
			currentDate: moment().format("MMMM DD, YYYY"),
		};
	}

	componentDidUpdate(prevProps) {
		const { navigation } = this.props;
		if(prevProps.navigation.getParam("activeTab") !== navigation.getParam("activeTab")) {
			const initialTab = navigation.getParam("activeTab") || "Breastfeed";
			this.setState({
				activeIndex: getActiveIndex(initialTab)
			});
		}
	}

	tabClick(tab) {
		// console.log("ON TABVL CLICK");
		if(this._tabRef) {
			this._tabRef.goToPage(getActiveIndex(tab));
		}
	}

	getStyle(tab) {
		const { selectedTab } = this.state;
		return [
			styles.categoryTitle,
			(selectedTab === tab) ? styles.activeCategoryTitle : undefined
		];
	}

	onSwipe(way) {
		const { selectedTab } = this.state;
		const endAt = (tabs.length - 1);
		const i = tabs.findIndex((x) => x.id === selectedTab);
		// console.warn(`index is ${i} and way is ${way}`)
		if(way === "left" && i !== endAt) {
			const next = tabs[i == tabs.length - 1 ? 0 : i + 1];
			this.tabClick(next.id, next.width);
		} else if(i !== 0) {
			const previous = tabs[i == 0 ? tabs.length - 1 : i - 1];
			this.tabClick(previous.id, previous.width);
		}
	}

	prevClick(currentDate) {
		this.setState({ currentDate: moment(currentDate).subtract(1, "days").format("MMMM DD, YYYY") });
	}

	nextClick(currentDate) {
		this.setState({ currentDate: moment(currentDate).add(1, "days").format("MMMM DD, YYYY") });
	}

	render() {
		const { activeIndex, currentDate, selectedTab } = this.state;
		const { navigation } = this.props;
		// console.log(this.state);
		return (
			<View style={styles.container}>
				<View style={styles.TrackHeader}>
					<TouchableOpacity style={styles.prevArrow} onPress={() => { this.prevClick(currentDate); }}>
						<Image
							source={Images.Track.prevIcon}
							style={styles.ArrowIcon}
						/>
					</TouchableOpacity>
					<Text style={styles.trackTitle}>
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
							: 							(
								<TouchableOpacity style={styles.nextArrow} onPress={() => { this.nextClick(currentDate); }}>
									<Image
										source={Images.Track.nextIcon}
										style={styles.ArrowIcon}
									/>
								</TouchableOpacity>
							)
					}
				</View>
				<View style={{ flex: 1, flexGrow: 1, marginTop: 10 }}>
					<Tabs
						page={activeIndex}
						ref={(ref) => this._tabRef = ref}
						initialPage={activeIndex}
						onChangeTab={({ i, ref, from}) => {
							// console.log({ i, ref, from});

							// if(i === this.state.activeIndex) {
							// 	return;
							// }
							// this.setState({
							// 	activeIndex: i
							// })
						}}
						renderTabBar={() => <ScrollableTab style={{ height: 30, backgroundColor: "#fff", borderWidth: 0, }} />}
						tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
						tabBgColor={{ backgroundColor: "#fff", paddingLeft: 0, paddingRight: 0 }}
						tabStyle={{ backgroundColor: "#fff", borderBottomWidth: 0, paddingLeft: 0, paddingRight: 0 }}
						tabContainerStyle={{ elevation: 0, backgroundColor: "#fff", borderBottomWidth: 0, paddingLeft: 0, paddingRight: 0 }}

					>
						<TabFirstComponent
							heading="Breastfeed"
							tabStyle={styles.tabStyle}
							textStyle={styles.tabTextStyle}
							activeTabStyle={styles.activeTabStyle}
							activeTextStyle={styles.activeTextStyle}
							child={<BreastfeedCards navigation={navigation} currentDate={currentDate} onTabChange={(tab, lengthValue) => {
								console.log("tavl cahnge");
								this.tabClick(tab, lengthValue);
							}} />}
						/>
						<TabFirstComponent
							heading="Pump"
							tabStyle={styles.tabStyle}
							textStyle={styles.tabTextStyle}
							activeTabStyle={styles.activeTabStyle}
							activeTextStyle={styles.activeTextStyle}
							child={<PumpCards navigation={navigation} currentDate={currentDate} onTabChange={(tab, lengthValue) => this.tabClick(tab, lengthValue)} />}
						/>
						<TabFirstComponent
							heading="Bottles"
							tabStyle={styles.tabStyle}
							textStyle={styles.tabTextStyle}
							activeTabStyle={styles.activeTabStyle}
							activeTextStyle={styles.activeTextStyle}
							child={<BottlesCards navigation={navigation} currentDate={currentDate} onTabChange={(tab, lengthValue) => this.tabClick(tab, lengthValue)} />}
						/>
						<TabFirstComponent
							heading="Diapers"
							tabStyle={styles.tabStyle}
							textStyle={styles.tabTextStyle}
							activeTabStyle={styles.activeTabStyle}
							activeTextStyle={styles.activeTextStyle}
							child={<DiapersCards navigation={navigation} currentDate={currentDate} onTabChange={(tab, lengthValue) => this.tabClick(tab, lengthValue)} />}
						/>
						<TabFirstComponent
							heading="Growth"
							tabStyle={styles.tabStyle}
							textStyle={styles.tabTextStyle}
							activeTabStyle={styles.activeTabStyle}
							activeTextStyle={styles.activeTextStyle}
							child={<GrowthCards navigation={navigation} currentDate={currentDate}  onTabChange={(tab, lengthValue) => this.tabClick(tab, lengthValue)} />}
						/>
					</Tabs>
				</View>
			</View>
		);
	}
}

const mapDispatchToProps = {
	dispatchResetAuthState: () => authActions.resetAuthState()
};

export default connect(null, mapDispatchToProps)(TrackScreen);