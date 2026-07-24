import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type Contact = {
  _id: string;

  name: string;

  email: string;

  phone: string;

  relationship: string;

  initial: string;
};

type ContactCardProps = {
  item: Contact;

  onPress: () => void;
};

export default function ContactCard({ item, onPress }: ContactCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.left}>
        {/* Avatar */}

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.initial}</Text>
        </View>

        {/* Contact Details */}

        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>

          <Text style={styles.subtitle}>
            {item.relationship} • {item.phone}
          </Text>

          <Text style={styles.email}>{item.email}</Text>
        </View>
      </View>

      {/* Call Button */}

      <TouchableOpacity style={styles.callButton}>
        <Ionicons name="call" size={18} color="#006a61" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    backgroundColor: "#ffffff",

    borderRadius: 12,

    padding: 16,

    marginBottom: 12,

    shadowColor: "#000",

    shadowOpacity: 0.05,

    shadowRadius: 12,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 2,
  },

  left: {
    flexDirection: "row",

    alignItems: "center",

    flex: 1,
  },

  avatar: {
    width: 48,

    height: 48,

    borderRadius: 24,

    backgroundColor: "#dde9ff",

    alignItems: "center",

    justifyContent: "center",

    marginRight: 16,
  },

  avatarText: {
    fontWeight: "600",

    fontSize: 20,

    color: "#45474c",
  },

  info: {
    flex: 1,
  },

  name: {
    fontWeight: "600",

    fontSize: 18,

    color: "#0d1c2f",
  },

  subtitle: {
    color: "#45474c",

    marginTop: 3,

    fontSize: 14,
  },

  email: {
    color: "#6b7280",

    marginTop: 3,

    fontSize: 13,
  },

  callButton: {
    width: 40,

    height: 40,

    borderRadius: 20,

    backgroundColor: "#e6eeff",

    alignItems: "center",

    justifyContent: "center",

    marginLeft: 8,
  },
});
