import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {PageParamList} from "../../App";
import {StyleSheet, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";

type CountriesPageProps = NativeStackScreenProps<PageParamList, 'CountriesPage'>
export const CountriesPageName = 'CountriesPage'
export default function CountriesPage({route, navigation}: CountriesPageProps) {
    return (
        <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app!</Text>
            <StatusBar style="auto" />
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