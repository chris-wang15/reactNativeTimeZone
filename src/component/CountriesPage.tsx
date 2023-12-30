import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {PageParamList} from "../../App";
import {Button, StyleSheet, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../state/store";
import {asyncRefresh, follow} from "../state/CountryFollowState";
import {useEffect} from "react";

type CountriesPageProps = NativeStackScreenProps<PageParamList, 'CountriesPage'>
export const countriesPageName = 'CountriesPage'
export default function CountriesPage({route, navigation}: CountriesPageProps) {
    const followedCountrySet: string[] = useSelector(
        (state: RootState) => state.follow.value
    )
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(asyncRefresh())
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <Text>{`followedCountrySet size: ${followedCountrySet.length}`}</Text>
            <Button title={'Test'} onPress={() => dispatch(follow(`${123}`))}/>
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