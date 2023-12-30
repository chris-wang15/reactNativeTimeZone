import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {RootSiblingParent} from "react-native-root-siblings";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CountriesPage, {CountriesPageName} from "./src/component/CountriesPage";

export type PageParamList = {
    FollowingPage: undefined,
    CountriesPage: undefined
}

const Stack = createNativeStackNavigator<PageParamList>()
export default function App() {
  return (
      <SafeAreaProvider>
          <RootSiblingParent>
              <NavigationContainer>
                  <Stack.Navigator>
                      <Stack.Screen
                      name={CountriesPageName}
                      component={CountriesPage}
                      options={{headerShown: false, orientation: 'portrait'}}/>
                  </Stack.Navigator>
              </NavigationContainer>
          </RootSiblingParent>
      </SafeAreaProvider>
  );
}
