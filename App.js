import React, { useEffect } from "react";
import { YellowBox, StyleSheet, View } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import { StyleProvider, Root } from "native-base";
import { Provider } from "react-redux";
import SplashScreen from "react-native-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import App from "./src/index";
import { store, persistor } from "./src/redux/store";
import getTheme from "./native-base-theme/components";
import LoadingIndicator from "./src/components/LoadingIndicator";
import { MenuProvider } from 'react-native-popup-menu';
import './src/locales/i18n';

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

const AppContainer = () => {

	useEffect(() => {
		SplashScreen.hide();
	}, []);

	return (
		<Provider store={store}>
			<PersistGate persistor={persistor} loading={<LoadingIndicator isLoading={true} />}>
				<StyleProvider style={getTheme()}>
					<Root>
						<SafeAreaProvider>
							<View style={styles.container}>
								<MenuProvider><App /></MenuProvider>
							</View>
						</SafeAreaProvider>
					</Root>
				</StyleProvider>
			</PersistGate>
		</Provider>
	);
}

export default AppContainer;