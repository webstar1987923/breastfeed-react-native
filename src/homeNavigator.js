import React from "react";
import { Easing, Animated } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { AppTheme } from "./utils/appTheme";
import { isIOS } from "./utils/native";
/* PAGES */
import TabBar from "./components/TabBar";
import HomeScreen from "./pages/home";
import TrackScreen from "./pages/track";
import AccountScreen from "./pages/account";
import SearchScreen from "./pages/search";
import DashboardScreen from "./pages/dashboard";
import OrderScreen from "./pages/order";
import StatisticsScreen from "./pages/statistics";
import EditProfileScreen from "./pages/editprofile";
import AddProfileScreen from "./pages/addprofile";
import SettingsScreen from "./pages/settings";
import AddBreastfeedEntryScreen from "./pages/add-breastfeed-entry";
import EditBreastfeedScreen from "./pages/edit-breastfeed";
import BreastfeedEntryDetailsScreen from "./pages/breastfeed-entry-details";
import SupportScreen from "./pages/support";
import ProductSupportScreen from "./pages/product-support";
import TechSupportScreen from "./pages/tech-support";
import AddPumpEntryScreen from "./pages/add-pump-entry";
import EditPumpScreen from "./pages/edit-pump";
import AddBottleScreen from "./pages/add-bottle";
import EditBottleScreen from "./pages/edit-bottle";
import AddDiaperScreen from "./pages/add-diaper";
import EditDiaperScreen from "./pages/edit-diaper";
import AddGrowthScreen from "./pages/add-growth";
import ChangePasswordScreen from "./pages/change-password";

const transitionSlideConfig = () => {
	return {
		transitionSpec: {
			duration: 500,
			easing: Easing.out(Easing.poly(4)),
			timing: Animated.timing,
			useNativeDriver: true,
		},
		screenInterpolator: (sceneProps) => {
			const { layout, position, scene } = sceneProps;

			const thisSceneIndex = scene.index;
			const width = layout.initWidth;

			const translateX = position.interpolate({
				inputRange: [thisSceneIndex - 1, thisSceneIndex],
				outputRange: [width, 0],
			});

			return { transform: [{ translateX }] };
		}
	};
};

const stackHeaderStyle = {
	backgroundColor: AppTheme.primaryColor,
	shadowOpacity: 0,
	shadowOffset: {
		height: 0,
	},
	shadowRadius: 0,
	borderBottomWidth: 0,
	elevation: 0
};

const stackHeaderTitleStyle = {
	color: "white",
	fontWeight: "400",
	marginLeft: isIOS() ? 0 : 20,
	marginRight: 0,
	textAlign: isIOS() ? "center" : "left",
	width: "100%"
};
/* HOME STACK */
const homeRouteConfig = {
	Home: { screen: HomeScreen }
};

const HomeTabStack = createStackNavigator(homeRouteConfig, {
	defaultNavigationOptions: {
		headerStyle: stackHeaderStyle,
		headerTitleStyle: stackHeaderTitleStyle,
		headerTintColor: "white",
		// headerForceInset: { top: "never", bottom: "never" }
	},
	initialRouteParams: { transition: "fade" },
	transitionConfig: transitionSlideConfig,
});

/* TRACK STACK */
const trackRouteConfig = {
	Track: { screen: TrackScreen },
	AddBreastfeedEntry: { screen: AddBreastfeedEntryScreen },
	EditBreastfeed: { screen: EditBreastfeedScreen },
	BreastfeedEntryDetails: { screen: BreastfeedEntryDetailsScreen },
	AddPumpEntry: { screen: AddPumpEntryScreen },
	EditPump: { screen: EditPumpScreen },
	AddBottle: { screen: AddBottleScreen },
	EditBottle: { screen: EditBottleScreen },
	AddDiaper: { screen: AddDiaperScreen },
	EditDiaper: { screen: EditDiaperScreen },
	AddGrowth: { screen: AddGrowthScreen },
};

const TrackTabStack = createStackNavigator(trackRouteConfig, {
	defaultNavigationOptions: {
		headerStyle: stackHeaderStyle,
		headerTitleStyle: stackHeaderTitleStyle,
		headerTintColor: "white",
		// headerForceInset: { top: "never", bottom: "never" }
	},
	initialRouteParams: { transition: "fade" },
	transitionConfig: transitionSlideConfig,
});

TrackTabStack.navigationOptions = ({ navigation }) => {
	let tabBarVisible = true;
	if(navigation.state.index > 0) {
	  const currentScreen = getActiveRouteName(navigation.state);
	  if(currentScreen === "AddBreastfeedEntry" || currentScreen === "BreastfeedEntryDetails" || currentScreen === "AddPumpEntry" || currentScreen === "AddBottle" || currentScreen === "AddDiaper" || currentScreen === "AddGrowth") {
			tabBarVisible = false;
	  }
	}
	return {
	  tabBarVisible,
	};
};
/* SUPPORT STACK */
const supportRouteConfig = {
	Support: { screen: SupportScreen },
	ProductSupport: { screen: ProductSupportScreen },
	TechSupport: { screen: TechSupportScreen }
};

const SupportTabStack = createStackNavigator(supportRouteConfig, {
	defaultNavigationOptions: {
		headerStyle: stackHeaderStyle,
		headerTitleStyle: stackHeaderTitleStyle,
		headerTintColor: "white",
		// headerForceInset: { top: "never", bottom: "never" }
	},
	initialRouteParams: { transition: "fade" },
	transitionConfig: transitionSlideConfig,
});

/* ORDER STACK */
const orderRouteConfig = {
	Order: { screen: OrderScreen }
};

const OrderTabStack = createStackNavigator(orderRouteConfig, {
	defaultNavigationOptions: {
		headerStyle: stackHeaderStyle,
		headerTitleStyle: stackHeaderTitleStyle,
		headerTintColor: "white",
		// headerForceInset: { top: "never", bottom: "never" }
	},
	initialRouteParams: { transition: "fade" },
	transitionConfig: transitionSlideConfig,
});

/* SEARCH STACK */
const searchRouteConfig = {
	Search: { screen: SearchScreen }
};

const SearchTabStack = createStackNavigator(searchRouteConfig, {
	defaultNavigationOptions: {
		headerStyle: stackHeaderStyle,
		headerTitleStyle: stackHeaderTitleStyle,
		headerTintColor: "white",
		// headerForceInset: { top: "never", bottom: "never" }
	},
	initialRouteParams: { transition: "fade" },
	transitionConfig: transitionSlideConfig,
});

/* ACCOUNT STACK */
const accountRouteConfig = {
	Account: { screen: AccountScreen },
};

const AccountTabStack = createStackNavigator(accountRouteConfig, {
	defaultNavigationOptions: {
		headerStyle: stackHeaderStyle,
		headerTitleStyle: stackHeaderTitleStyle,
		headerTintColor: "white",
		// headerForceInset: { top: "never", bottom: "never" }
	},
	initialRouteParams: { transition: "fade" },
	transitionConfig: transitionSlideConfig,
});

/* DASHBOARD STACK */
const dashboardRouteConfig = {
	Dashboard: { screen: DashboardScreen },
	EditProfile: { screen: EditProfileScreen },
	AddProfile: { screen: AddProfileScreen },
	Settings: { screen: SettingsScreen },
	ChangePassword: { screen: ChangePasswordScreen },
};

const DashboardTabStack = createStackNavigator(dashboardRouteConfig, {
	defaultNavigationOptions: {
		headerStyle: stackHeaderStyle,
		headerTitleStyle: stackHeaderTitleStyle,
		headerTintColor: "white",
		// headerForceInset: { top: "never", bottom: "never" }
	},
	initialRouteParams: { transition: "fade" },
	transitionConfig: transitionSlideConfig,
});

/* STATISTICS STACK */
const statisticsRouteConfig = {
	Statistics: { screen: StatisticsScreen },
};

const StatisticsTabStack = createStackNavigator(statisticsRouteConfig, {
	defaultNavigationOptions: {
		headerStyle: stackHeaderStyle,
		headerTitleStyle: stackHeaderTitleStyle,
		headerTintColor: "white",
		// headerForceInset: { top: "never", bottom: "never" }
	},
	initialRouteParams: { transition: "fade" },
	transitionConfig: transitionSlideConfig,
});

function getActiveRouteName(navigationState) {
	if(!navigationState) {
		return null;
	}
	const route = navigationState.routes[navigationState.index];
	// dive into nested navigators
	if(route.routes) {
		return this.getActiveRouteName(route);
	}
	return route.routeName;
}

DashboardTabStack.navigationOptions = ({ navigation }) => {
	let tabBarVisible = true;
	if(navigation.state.index > 0) {
	  const currentScreen = getActiveRouteName(navigation.state);
	  if(currentScreen === "EditProfile" || currentScreen === "Settings" || currentScreen === "ChangePassword" || currentScreen === "AddProfile") {
			tabBarVisible = false;
	  }
	}
	return {
	  tabBarVisible,
	};
};

/* BOTTOM TAB NAVIGATOR */
const TabNavigator = createBottomTabNavigator({
	Dashboard: {
		screen: DashboardTabStack
	},
	Home: {
		screen: HomeTabStack
	},
	Track: {
		screen: TrackTabStack
	},
	Order: {
		screen: OrderTabStack
	},
	Statistics: {
		screen: StatisticsTabStack
	},
	Support: {
		screen: SupportTabStack
	},
	Search: {
		screen: SearchTabStack
	},
	Account: {
		screen: AccountTabStack
	}
},
{
	tabBarComponent: ({ navigation, screenProps: { t } }) => <TabBar navigation={navigation} t={t} />,
	tabBarOptions: {
		activeTintColor: "white",
		inactiveTintColor: "rgba(255,255,255,0.38)",
		style: {
			backgroundColor: AppTheme.primaryColor,
			height: isIOS() ? 60 : 75,
		},
		labelStyle: {
			marginTop: isIOS() ? 10 : 0,
			margin: 0,
			padding: 0,
			fontSize: 12,
			letterSpacing: 0.4
		},
		iconStyle: {
			marginTop: isIOS() ? 10 : 0,
			margin: 0,
			padding: 0
		}
	}
});

const RootStack = createStackNavigator(
	{
		Dashboard: TabNavigator
	},
	{
		initialRouteName: "Dashboard",
		/* The header config from HomeScreen is now here */
		defaultNavigationOptions: {
			header: null
		},
	}
);

export default createAppContainer(RootStack);