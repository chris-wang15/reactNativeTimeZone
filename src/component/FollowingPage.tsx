import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {PageParamList} from "../../App";
import {Button, FlatList, Image, Pressable, StyleSheet, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../state/store";
import {asyncRefresh, unfollow} from "../state/CountryFollowState";
import {useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {t_current_time, t_followed_zones} from "../res/values/strings";
import {c_black, c_gray, c_white} from "../res/values/colors"
import {DateInfo, getTimeByZoneName} from "../utils/DateUtils";
import {countriesPageName} from "./CountriesPage";

type FollowingPageProps = NativeStackScreenProps<PageParamList, 'FollowingPage'>

export const followingPageName = 'FollowingPage'

export default function FollowingPage({route, navigation}: FollowingPageProps) {
    const followedItems: string[] = useSelector(
        (state: RootState) => state.follow.value
    )
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(asyncRefresh())
    }, [])

    // TODO @liwei mock test
    const followedItemsMock = ['Africa/Accra', 'Europe/Amsterdam']
    return (
        <View style={styles.fullScreenBg}>
            <StatusBar style="light" backgroundColor={c_black}/>
            <SafeAreaView style={styles.container}>
                <Text style={styles.fgTitle}>{t_followed_zones}</Text>
                <View style={styles.listContainer}>
                    <FlatList
                        data={followedItemsMock}
                        renderItem={
                            ({item}) => <TimeZoneItem
                                country={item}
                                onUnfollow={() => dispatch(unfollow(item))}/>
                        }/>
                </View>
                <Pressable style={styles.floatingButton} onPress={
                    () => navigation.navigate(countriesPageName, {disableSummerWinterTime: false})
                }>
                    <Image style={styles.navigationImg} source={require('../../assets/tune.png')}/>
                </Pressable>
            </SafeAreaView>
        </View>
    )
}

// TODO @liwei unfollow function
function TimeZoneItem(
    props: { country: string, onUnfollow: () => void }
) {
    const [currentTime, setCurrentTime] = useState<DateInfo>(
        {
            time: '',
            date: ''
        }
    );

    useEffect(() => {
        const intervalId = setInterval(() => {
            getTimeByZoneName(props.country).then(
                (date) => setCurrentTime(date)
            )

        }, 1000)
        return () => clearInterval(intervalId);
    }, [])

    return (
        <View style={styles.timeZoneContainer}>
            <View style={styles.zoneHeader}>
                <Text style={styles.zoneCountry}>{props.country}</Text>
                <Text style={styles.zoneCurrentTime}>{t_current_time}</Text>
            </View>
            <Text style={styles.zoneTimeDetail}>{currentTime.time}</Text>
            <Text style={styles.zoneDateDetail}>{currentTime.date}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    fullScreenBg: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: c_white,
        flexDirection: 'column'
    },
    fgTitle: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 24,
        height: 56,
        width: '100%',
        backgroundColor: c_black,
        color: c_white,
    },
    listContainer: {
        flex: 1,
        marginTop: 8,
        marginStart: 4,
        marginEnd: 4,
    },
    timeZoneContainer: {
        flex: 1,
        flexDirection: 'column',
        margin: 4,
    },
    zoneHeader: {
        flex: 1,
        marginTop: 8,
        alignSelf: "center",
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    zoneCountry: {
        fontSize: 16,
        color: c_black,
        fontWeight: 'bold',
    },
    zoneCurrentTime: {
        fontSize: 16,
        color: c_black,
    },
    zoneTimeDetail: {
        flex: 1,
        fontSize: 56,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: c_black,
        fontWeight: 'bold',
    },
    zoneDateDetail: {
        flex: 1,
        textAlign: 'center',
        fontSize: 21,
        color: c_black,
        marginBottom: 8,
    },
    floatingButton: {
        position: 'absolute',
        borderRadius: 10,
        padding: 4,
        backgroundColor: 'rgba(128, 128, 128, 0.4)',
        width: 44,
        height: 44,
        right: 36,
        bottom: 36,
    },
    navigationImg: {
        width: '100%',
        height: '100%',
    }
});