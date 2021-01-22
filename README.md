# React Native #

### How do I get set up? ###

* `brew install node`
* `brew install watchman`
* `sudo npm install -g react-native-cli`

## Configuration

* Create a `.env` file in root folder and copy the code from `.env-sample` paste into `.env` file.
* For install required dependency go to root folder of project and run command `npm install`.

### `react-native run-android`

* For an android run command (Android simulater/Virtual device should be running).

### `react-native run-ios`

* For ios install required dependency got to ios folder and run command `pod install`
* For an ios run command `react-native run-ios`
* For live reload `npm run start` after successfully excute `react-native run-android` or `react-native run-ios`.

### Deployment

* Generating Signed APK `cd android && ./gradlew assembleRelease`
* Generating Release IPA (TBD)
