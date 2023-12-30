import AsyncStorage from "@react-native-async-storage/async-storage";
import {logE} from "../utils/LogUtils";

const STORAGE_KEY = "FOLLOWED_COUNTIES_STORAGE_KEY"
export const getStorage = async (): Promise<string[]> => {
    try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY)
        if (storedData) {
            return JSON.parse(storedData)
        } else {
            return []
        }
    } catch (error) {
        logE('Failed to get storage data', error)
        return []
    }
}

export const changeStorage = async (countries: string[]): Promise<void> => {
    try {
        const serializedArray = JSON.stringify(Array.from(countries));
        await AsyncStorage.setItem(STORAGE_KEY, serializedArray);
    } catch (error) {
        logE('Error storing data in AsyncStorage:', error)
    }
};