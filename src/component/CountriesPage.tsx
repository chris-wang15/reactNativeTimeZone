import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {PageParamList} from "../../App";
import {Image, Pressable, StyleSheet, Switch, Text, TextInput, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../state/store";
import {asyncRefresh, follow, unfollow} from "../state/CountryFollowState";
import {useEffect, useState} from "react";
import {c_20_gray, c_black, c_white} from "../res/values/colors";
import {SafeAreaView} from "react-native-safe-area-context";
import {t_follow, t_search_for_country, t_time_zone_country} from "../res/values/strings";
import {countryList} from "../utils/CountryInfo";
import {FlashList} from "@shopify/flash-list";
import {logI} from "../utils/LogUtils";

type CountriesPageProps = NativeStackScreenProps<PageParamList, 'CountriesPage'>
export const countriesPageName = 'CountriesPage'

export default function CountriesPage({route, navigation}: CountriesPageProps) {
    const followedItems: string[] = useSelector(
        (state: RootState) => state.follow.value
    )
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(asyncRefresh())
    }, [])

    const disableWinterSummerTime = route.params.disableSummerWinterTime
    if (disableWinterSummerTime) logI('disable summer winter time not support yet')

    const followedSet = new Set(followedItems)

    const [searchKey, setSearchKey] = useState<string>('')
    const [sortedCountryList, setSortedCountryList] = useState(
        countryList
    )
    const searchCountryByName = async () => {
        if (!searchKey) {
            setSortedCountryList(countryList)
        } else {
            const filteredList = countryList.filter(
                (item) => item.name.toLowerCase().includes(
                    searchKey.toLowerCase()
                )
            )
            setSortedCountryList(filteredList)
        }
    }

    const clearSearchKey = () => {
        setSearchKey('')
        setSortedCountryList(countryList)
    }

    return (
        <View style={styles.fullScreenBg}>
            <StatusBar style="light" backgroundColor={c_black}/>
            <SafeAreaView style={styles.container}>
                {/* fragment title */}
                <View style={styles.fgTitleContainer}>
                    <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Image
                            style={styles.image}
                            resizeMode='contain'
                            source={require('../../assets/back.png')}/>
                    </Pressable>
                    <Text style={styles.fgTitle}>{t_time_zone_country}</Text>
                </View>
                {/* search area */}
                <View style={styles.insSearchContainer}>
                    {/* search icon */}
                    <Image
                        resizeMode='contain'
                        style={styles.searchIcon}
                        source={require('../../assets/search.png')}/>
                    <TextInput
                        style={styles.insSearch}
                        value={searchKey}
                        onChangeText={text => setSearchKey(text)}
                        placeholder={t_search_for_country}
                        placeholderTextColor='#646464'
                        autoFocus={false}
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType='default'
                        returnKeyType='go'
                        onSubmitEditing={searchCountryByName}
                        blurOnSubmit={true}
                    />
                    {/* clear icon */}
                    <Pressable
                        style={styles.tuneIcon}
                        onPress={clearSearchKey}>
                        <Image
                            resizeMode='contain'
                            style={styles.image}
                            source={require('../../assets/close.png')}/>
                    </Pressable>
                </View>
                {/* list area */}
                <View style={styles.listContainer}>
                    <FlashList
                        data={sortedCountryList}
                        estimatedItemSize={47}
                        renderItem={
                            ({item}) =>
                                <CountryItem
                                    key={item.id}
                                    country={item.name}
                                    followState={followedSet.has(item.name)}
                                    onFollow={() => dispatch(follow(item.name))}
                                    onUnfollow={() => dispatch(unfollow(item.name))}/>
                        }/>
                </View>
            </SafeAreaView>
        </View>
    )
}

function CountryItem(
    props: {
        country: string,
        followState: boolean,
        onFollow: () => void,
        onUnfollow: () => void,
    }
) {
    const [switchOnState, setSwitchOnState] = useState(
        props.followState
    )
    return (
        <View style={styles.countryItemContainer}>
            <Text style={styles.countryItemName}>{props.country}</Text>
            <View style={styles.switchContainer}>
                <Text style={styles.switchTitle}>{t_follow}</Text>
                <Switch
                    style={styles.switch}
                    trackColor={{false: '#D3D3D3', true: '#767577'}}
                    thumbColor={props.followState ? '#f4f3f4' : '#f4f3f4'}
                    onValueChange={(switchOn) => {
                        if (switchOn) {
                            props.onFollow()
                            setSwitchOnState(true)
                        } else {
                            props.onUnfollow()
                            setSwitchOnState(false)
                        }
                    }}
                    value={switchOnState}
                />
            </View>
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
    fgTitleContainer: {
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: c_black,
    },
    backButton: {
        width: 40,
        height: 40,
        margin: 8,
    },
    fgTitle: {
        alignItems: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 24,
        height: 56,
        backgroundColor: c_black,
        color: c_white,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    listContainer: {
        flex: 1,
        marginTop: 4,
        marginStart: 4,
        marginEnd: 4,
    },
    countryItemContainer: {
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    countryItemName: {
        textAlignVertical: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: c_black,
        maxWidth: '70%',
    },
    switchContainer: {
        flexDirection: 'row',
    },
    switchTitle: {
        textAlignVertical: 'center',
        fontSize: 16,
        color: c_black,
        marginEnd: 4,
    },
    switch: {
        marginEnd: 4,
    },
    insSearchContainer: {
        flexDirection: 'row',
        height: 44,
        marginStart: 8,
        marginEnd: 8,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 16,
        backgroundColor: c_20_gray,
    },
    searchIcon: {
        alignSelf: 'center',
        marginStart: 16,
        width: 16,
        height: 16,
    },
    insSearch: {
        flex: 1,
        flexDirection: 'row',
        fontSize: 14,
        paddingHorizontal: 16,
    },
    tuneIcon: {
        alignSelf: 'center',
        marginStart: 16,
        marginEnd: 16,
        width: 16,
        height: 16,
    },
})