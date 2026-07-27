import AsyncStorage from "@react-native-async-storage/async-storage";

const PROFILE_KEY = "user_profile";

export async function saveProfile(profile: any) {
  await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export async function getProfile() {
  const data = await AsyncStorage.getItem(PROFILE_KEY);

  if (data) {
    return JSON.parse(data);
  }

  return null;
}