import AsyncStorage from "@react-native-async-storage/async-storage";
import {logE} from "../utils/LogUtils";

const STORAGE_KEY = "FOLLOWED_COUNTIES_STORAGE_KEY"
export const getStorage = async (): Promise<Set<string> | null> => {
    try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY)
        if (storedData) {
            return new Set(JSON.parse(storedData))
        } else {
            return null
        }
    } catch (error) {
        logE('Failed to get storage data', error)
        return null
    }
}

export const changeStorage = async (countries: Set<string>): Promise<void> => {
    try {
        const serializedArray = JSON.stringify(Array.from(countries));
        await AsyncStorage.setItem(STORAGE_KEY, serializedArray);
    } catch (error) {
        logE('Error storing data in AsyncStorage:', error)
    }
};