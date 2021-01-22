import React from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import { Tabs, ScrollableTab } from "native-base";
import * as authActions from "src/redux/actions/authActions";
import LanguageSwitcher from "src/components/LanguageSwitcher";
import HeaderComponent from "src/components/HeaderComponent";
import { translate } from "src/locales/i18n";
import styles from "./styles";
import BreastpumpsCards from "./breastpumps";
import SuppliesCards from "./supplies";
import ArticlesCards from "./articles";
import ContactusCards from "./contactus";
import { getActiveIndex } from "./tab-menu";

function TabFirstComponent({ child }) {
	return (
		<View style={{ flex: 1, flexGrow: 1 }}>
			{ child }
		</View>
	);
}

class TrackScreen extends React.Component {
	static navigationOptions = ({ navigation, screenProps: { i18n, insets } }) => {
		return {
			title: translate("trackScreen.headerTitle"),
			headerRight: (
				<LanguageSwitcher navigation={navigation} i18n={i18n} insets={insets} />
			)
		};
	};

	constructor(props) {
		super();
		const { navigation } = props;
		const initialTab = navigation.getParam("activeTab") || "Breastpumps";
		this.state = {
			activeIndex: getActiveIndex(initialTab),
		};
	}

	static navigationOptions = {
		header: <HeaderComponent />
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
				<View style={styles.supportHeader}>
					<Text style={styles.supportheaderTitle}>Support</Text>
				</View>
				<View style={{ flex: 1, flexGrow: 1, marginTop: 10 }}>
					<Tabs
						page={activeIndex}
						ref={(ref) => this._tabRef = ref}
						initialPage={activeIndex}
						renderTabBar={() => <ScrollableTab style={{ height: 25, backgroundColor: "#fff", borderWidth: 0, }} />}
						tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
						tabBgColor={{ backgroundColor: "#fff", paddingLeft: 0, paddingRight: 0 }}
						tabStyle={{ backgroundColor: "#fff", borderBottomWidth: 0, paddingLeft: 0, paddingRight: 0 }}
						tabContainerStyle={{ elevation: 0, backgroundColor: "#fff", borderBottomWidth: 0, paddingLeft: 0, paddingRight: 0 }}

					>
						<TabFirstComponent
							heading="Breastpumps"
							tabStyle={styles.tabStyle}
							textStyle={styles.tabTextStyle}
							activeTabStyle={styles.activeTabStyle}
							activeTextStyle={styles.activeTextStyle}
							child={<BreastpumpsCards navigation={navigation} onTabChange={(tab, lengthValue) => this.tabClick(tab, lengthValue)} />}
						/>
						<TabFirstComponent
							heading="Supplies"
							tabStyle={styles.tabStyle}
							textStyle={styles.tabTextStyle}
							activeTabStyle={styles.activeTabStyle}
							activeTextStyle={styles.activeTextStyle}
							child={<SuppliesCards navigation={navigation} onTabChange={(tab, lengthValue) => this.tabClick(tab, lengthValue)} />}
						/>
						<TabFirstComponent
							heading="Articles"
							tabStyle={styles.tabStyle}
							textStyle={styles.tabTextStyle}
							activeTabStyle={styles.activeTabStyle}
							activeTextStyle={styles.activeTextStyle}
							child={<ArticlesCards navigation={navigation} onTabChange={(tab, lengthValue) => this.tabClick(tab, lengthValue)} />}
						/>
						<TabFirstComponent
							heading="Contact Us"
							tabStyle={styles.tabStyle}
							textStyle={styles.tabTextStyle}
							activeTabStyle={styles.activeTabStyle}
							activeTextStyle={styles.activeTextStyle}
							child={<ContactusCards navigation={navigation} onTabChange={(tab, lengthValue) => this.tabClick(tab, lengthValue)} />}
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