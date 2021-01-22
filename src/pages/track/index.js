import React from "react";
import { connect } from "react-redux";
import { View, Text, Image } from "react-native";

import { Tabs, ScrollableTab } from "native-base";
import * as authActions from "src/redux/actions/authActions";
import LanguageSwitcher from "src/components/LanguageSwitcher";
import { translate } from "src/locales/i18n";
import HeaderComponent from "src/components/HeaderComponent";
import { Images } from "src/assets/images";
import styles from "./styles";
import BreastfeedCards from "./breastfeed";
import PumpCards from "./pump";
import BottlesCards from "./bottles";
import DiapersCards from "./diapers";
import GrowthCards from "./growth";
import { getActiveIndex } from "./tab-menu";

function TabFirstComponent({ child }) {
	return (
		<View style={{ flex: 1, flexGrow: 1 }}>
			{ child }
		</View>
	);
}

class TrackScreen extends React.Component {
	static navigationOptions = {
		header: <HeaderComponent />
	}

	constructor(props) {
		super();
		const { navigation } = props;
		const initialTab = navigation.getParam("activeTab") || "Breastfeed";
		this.state = {
			activeIndex: getActiveIndex(initialTab),
		};
	}

	componentDidMount() {
	}

	tabClick(tab) {
		// console.log("INDEX FOR NEXT", getActiveIndex(tab), tab);
		// this.setState({ selectedTab: tab });
		if(this._tabRef) {
			this._tabRef.goToPage(getActiveIndex(tab));
		}
	}

	render() {
		const { activeIndex } = this.state;
		const { navigation } = this.props;
		return (
			<View style={styles.container}>
				<View style={styles.TrackHeader}>
					<View style={styles.prevArrow}>
						<Image
							source={Images.Track.prevIcon}
							style={styles.ArrowIcon}
						/>
					</View>
					<Text style={styles.trackTitle}>Today</Text>
					<View style={styles.nextArrow}>
						<Image
							source={Images.Track.nextIcon}
							style={styles.Disable}
						/>
					</View>
				</View>
				<View style={{ flex: 1, flexGrow: 1, marginTop: 10 }}>
					<Tabs
						page={activeIndex}
						ref={(ref) => this._tabRef = ref}
						initialPage={activeIndex}
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
							child={<BreastfeedCards navigation={navigation} onTabChange={(tab, lengthValue) => this.tabClick(tab, lengthValue)} />}
						/>
						<TabFirstComponent
							heading="Pump"
							tabStyle={styles.tabStyle}
							textStyle={styles.tabTextStyle}
							activeTabStyle={styles.activeTabStyle}
							activeTextStyle={styles.activeTextStyle}
							child={<PumpCards navigation={navigation} onTabChange={(tab, lengthValue) => this.tabClick(tab, lengthValue)} />}
						/>
						<TabFirstComponent
							heading="Bottles"
							tabStyle={styles.tabStyle}
							textStyle={styles.tabTextStyle}
							activeTabStyle={styles.activeTabStyle}
							activeTextStyle={styles.activeTextStyle}
							child={<BottlesCards navigation={navigation} onTabChange={(tab, lengthValue) => this.tabClick(tab, lengthValue)} />}
						/>
						<TabFirstComponent
							heading="Diapers"
							tabStyle={styles.tabStyle}
							textStyle={styles.tabTextStyle}
							activeTabStyle={styles.activeTabStyle}
							activeTextStyle={styles.activeTextStyle}
							child={<DiapersCards navigation={navigation} onTabChange={(tab, lengthValue) => this.tabClick(tab, lengthValue)} />}
						/>
						<TabFirstComponent
							heading="Growth"
							tabStyle={styles.tabStyle}
							textStyle={styles.tabTextStyle}
							activeTabStyle={styles.activeTabStyle}
							activeTextStyle={styles.activeTextStyle}
							child={<GrowthCards navigation={navigation} onTabChange={(tab, lengthValue) => this.tabClick(tab, lengthValue)} />}
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