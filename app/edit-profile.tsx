import Header from "@/components/Header";
import ProfileImage from "@/components/ProfileImage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
import { getProfile, saveProfile } from "../utils/profileStorage";

import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function EditProfile() {
  const [name, setName] = useState("Sarah");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState(
  "I need help. Please track my location."
);
const [showDatePicker, setShowDatePicker] = useState(false);
 const handleSave = async () => {
  if (!name.trim()) {
    Alert.alert("Error", "Please enter your full name.");
    return;
  }

  if (!email.trim()) {
    Alert.alert("Error", "Please enter your email.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    Alert.alert("Error", "Please enter a valid email address.");
    return;
  }

  if (!phone.trim()) {
    Alert.alert("Error", "Please enter your phone number.");
    return;
  }

  if (!/^\d{10}$/.test(phone)) {
    Alert.alert("Error", "Phone number must contain exactly 10 digits.");
    return;
  }

  try {
    await saveProfile({
      name,
      phone,
      email,
      dob,
      address,
      message,
    });

    Alert.alert("Success", "Profile updated successfully!");
  } catch (error) {
    Alert.alert("Error", "Failed to save profile.");
    console.error(error);
  }
};
useEffect(() => {
  const loadProfile = async () => {
    const profile = await getProfile();

  if (profile) {
  setName(profile.name || "");
  setPhone(profile.phone || "");
  setEmail(profile.email || "");
  setDob(profile.dob || "");
  setAddress(profile.address || "");
  setMessage(profile.message || "");
}  
  };

  loadProfile();
}, []);

  return (
    <ScrollView
  style={styles.container}
  contentContainerStyle={{ paddingBottom: 40 }}
  showsVerticalScrollIndicator={false}
>
      <Header
        title="Edit Profile"
        onBack={() => router.back()}
      />
<ProfileImage />
      <View style={styles.form}>
        <Text style={styles.label}>Full Name</Text>

        <TextInput
  placeholder="Enter your full name"
  value={name}
  onChangeText={setName}
  style={styles.input}
/>

        <Text style={styles.label}>Email</Text>

<TextInput
  placeholder="Enter your email"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
  autoCapitalize="none"
  style={styles.input}
/>
<Text style={styles.label}>Date of Birth</Text>

<TouchableOpacity
  style={styles.input}
  onPress={() => setShowDatePicker(true)}
>
  <Text>{dob || "Select Date of Birth"}</Text>
</TouchableOpacity>

{showDatePicker && (
  <DateTimePicker
    value={dob ? new Date(dob) : new Date()}
    mode="date"
    display={Platform.OS === "ios" ? "spinner" : "default"}
    maximumDate={new Date()}
    onChange={(event, selectedDate) => {
      setShowDatePicker(false);

      if (selectedDate) {
        const formatted = selectedDate.toLocaleDateString("en-GB");
        setDob(formatted);
      }
    }}
  />
)}
<Text style={styles.label}>Address</Text>


<TextInput
  placeholder="Enter your address"
  value={address}
  onChangeText={setAddress}
  style={styles.input}
/>
        <Text style={styles.label}>Phone Number</Text>

        <TextInput
  placeholder="98XXXXXXXX"
  value={phone}
  onChangeText={setPhone}
  keyboardType="phone-pad"
  style={styles.input}
/>
        <Text style={styles.label}>Emergency Message</Text>

<TextInput
  placeholder="Enter your emergency message"
  value={message}
  onChangeText={setMessage}
  multiline
  numberOfLines={4}
  style={[styles.input, { height: 110 }]}
/>

<TouchableOpacity
  style={styles.button}
  onPress={handleSave}
>
  
          <Text style={styles.buttonText}>
            Save Changes
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FF",
  },

  form: {
    padding: 20,
  },

  label: {
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 15,
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
  },

 button: {
  backgroundColor: "#006A61",
  marginTop: 30,
  padding: 16,
  borderRadius: 14,
  alignItems: "center",

  elevation: 5, // Android
  shadowColor: "#000", // iOS
  shadowOpacity: 0.2,
  shadowRadius: 5,
  shadowOffset: {
    width: 0,
    height: 3,
  },
},

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});