import {SafeAreaProvider} from "react-native-safe-area-context";
import {RootSiblingParent} from "react-native-root-siblings";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CountriesPage, {countriesPageName} from "./src/component/CountriesPage";
import {Provider} from "react-redux";
import {store} from "./src/state/store";
import FollowingPage, {followingPageName} from "./src/component/FollowingPage";
import {GestureHandlerRootView} from "react-native-gesture-handler";

export type PageParamList = {
    FollowingPage: undefined,
    CountriesPage: { disableSummerWinterTime: boolean }
}

const Stack = createNativeStackNavigator<PageParamList>()
export default function App() {
  return (
      <Provider store={store}>
          <GestureHandlerRootView style={{ flex: 1 }}>
              <SafeAreaProvider>
                  <RootSiblingParent>
                      <NavigationContainer>
                          <Stack.Navigator>
                              <Stack.Screen
                                  name={followingPageName}
                                  component={FollowingPage}
                                  options={{headerShown: false, orientation: 'portrait'}}/>
                              <Stack.Screen
                                  name={countriesPageName}
                                  component={CountriesPage}
                                  options={{headerShown: false, orientation: 'portrait'}}/>
                          </Stack.Navigator>
                      </NavigationContainer>
                  </RootSiblingParent>
              </SafeAreaProvider>
          </GestureHandlerRootView>
      </Provider>
  )
}
