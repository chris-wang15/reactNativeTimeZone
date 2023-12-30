import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {PageParamList} from "../../App";
import {Button, StyleSheet, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../state/store";
import {follow} from "../state/CountryFollowState";

type CountriesPageProps = NativeStackScreenProps<PageParamList, 'CountriesPage'>
export const countriesPageName = 'CountriesPage'
export default function CountriesPage({route, navigation}: CountriesPageProps) {
    const followedCountrySet: Set<string> = useSelector(
        (state: RootState) => state.follow.value
    )
    const dispatch = useDispatch<AppDispatch>()
    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <Text>Open up App.tsx to start working on your app!</Text>
            <Button title={'Test'} onPress={() => dispatch(follow("actionName"))}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});