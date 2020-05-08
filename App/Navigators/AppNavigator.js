import { createAppContainer, createStackNavigator } from 'react-navigation'
import NoPermissionsScreen from '../Containers/NoPermissionsScreen/NoPermissionsScreen'
import SplashScreen from '../Containers/SplashScreen/SplashScreen'
import ScanningScreen from '../Containers/ScanningScreen/ScanningScreen'

/**
 * The root screen contains the application's navigation.
 *
 * @see https://reactnavigation.org/docs/en/hello-react-navigation.html#creating-a-stack-navigator
 */
const StackNavigator = createStackNavigator(
  {
    // Create the application routes here (the key is the route name, the value is the target screen)
    SplashScreen: SplashScreen,
    // Make main screen is ScanningScreen
    MainScreen: ScanningScreen,
    NoPermissionsScreen,
  },
  {
    // By default the application will show the splash screen
    initialRouteName: 'SplashScreen',
    // See https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig
    headerMode: 'none',
  }
)

export default createAppContainer(StackNavigator)
