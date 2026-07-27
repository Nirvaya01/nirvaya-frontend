import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { triggerSOS } from "../api/sosApi";
import { useAuth } from "../Context/AuthContext";

import CurrentLocationMap from "../components/dashboard/CurrentLocationMap";
import { useCurrentLocation } from "../hooks/useCurrentLocation";

const COUNTDOWN_SECONDS = 5;

export default function SosConfirmation() {
  const { status, coords, errorMessage } = useCurrentLocation();

  const { token } = useAuth();

  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);

  const [sending, setSending] = useState(false);

  const [sendError, setSendError] = useState<string | null>(null);

  const [sent, setSent] = useState(false);

  const cancelledRef = useRef(false);

  // =========================
  // COUNTDOWN TIMER
  // =========================

  useEffect(() => {
    if (sent || cancelledRef.current) return;

    if (secondsLeft <= 0) {
      handleSend();

      return;
    }

    const timer = setTimeout(
      () => setSecondsLeft((previous) => previous - 1),
      1000,
    );

    return () => clearTimeout(timer);
  }, [secondsLeft]);

  // =========================
  // SEND SOS
  // =========================

  async function handleSend() {
    if (sending || sent || cancelledRef.current) {
      return;
    }

    if (!coords) {
      setSendError("Still finding your location — try again in a moment.");

      return;
    }

    if (!token) {
      setSendError("Authentication expired. Please login again.");

      return;
    }

    setSending(true);

    setSendError(null);

    try {
      const googleMapsUrl = `https://maps.google.com/?q=${coords.latitude},${coords.longitude}`;

      await triggerSOS(
        token,

        coords.latitude,

        coords.longitude,

        googleMapsUrl,
      );

      setSent(true);
    } catch (error: any) {
      setSendError(error?.message ?? "Failed to send SOS. Please try again.");
    } finally {
      setSending(false);
    }
  }

  // =========================
  // CANCEL SOS
  // =========================

  function handleCancel() {
    cancelledRef.current = true;

    router.back();
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.topBar} />

        <Text style={styles.title}>{sent ? "SOS Sent" : "Sending SOS"}</Text>

        <Text style={styles.subtitle}>
          {sent
            ? "Your emergency contacts and local authorities have been notified."
            : "Alerting emergency contacts in…"}
        </Text>

        {!sent && (
          <View style={styles.countdownWrap}>
            <Text style={styles.countdownNumber}>
              {secondsLeft > 0 ? secondsLeft : 0}
            </Text>
          </View>
        )}

        <CurrentLocationMap
          status={status}
          coords={coords}
          errorMessage={errorMessage}
        />

        <Text style={styles.locationCaption}>
          Sharing location with your trusted contacts & local authorities.
        </Text>

        {sendError && <Text style={styles.errorText}>{sendError}</Text>}

        {!sent && (
          <>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={handleCancel}
              disabled={sending}
            >
              <Text style={styles.cancelBtnText}>Cancel Alert</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.sendBtn, sending && styles.sendBtnDisabled]}
              onPress={handleSend}
              disabled={sending}
            >
              {sending ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Ionicons name="send" size={16} color="#fff" />

                  <Text style={styles.sendBtnText}>Send Now</Text>
                </>
              )}
            </TouchableOpacity>
          </>
        )}

        {sent && (
          <TouchableOpacity
            style={styles.doneBtn}
            onPress={() => router.back()}
          >
            <Text style={styles.doneBtnText}>Done</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#5b6472",

    alignItems: "center",

    justifyContent: "center",

    padding: 20,
  },

  card: {
    width: "100%",

    backgroundColor: "#fff",

    borderRadius: 24,

    padding: 24,

    overflow: "hidden",
  },

  topBar: {
    position: "absolute",

    top: 0,

    left: 0,

    right: 0,

    height: 6,

    backgroundColor: "#e15347",
  },

  title: {
    fontSize: 26,

    fontWeight: "800",

    color: "#0d1c2f",

    textAlign: "center",

    marginTop: 12,
  },

  subtitle: {
    fontSize: 15,

    color: "#45474c",

    textAlign: "center",

    marginTop: 8,
  },

  countdownWrap: {
    alignSelf: "center",

    width: 140,

    height: 140,

    borderRadius: 70,

    borderWidth: 6,

    borderColor: "#fbdfdc",

    alignItems: "center",

    justifyContent: "center",

    marginVertical: 24,
  },

  countdownNumber: {
    fontSize: 40,

    fontWeight: "800",

    color: "#e15347",
  },

  locationCaption: {
    fontSize: 13,

    color: "#45474c",

    marginTop: 12,

    marginBottom: 8,
  },

  errorText: {
    color: "#ba1a1a",

    fontSize: 13,

    fontWeight: "600",

    marginTop: 8,

    textAlign: "center",
  },

  cancelBtn: {
    borderWidth: 1.5,

    borderColor: "#0d1c2f",

    borderRadius: 999,

    paddingVertical: 14,

    alignItems: "center",

    marginTop: 16,
  },

  cancelBtnText: {
    fontWeight: "700",

    color: "#0d1c2f",

    fontSize: 15,
  },

  sendBtn: {
    flexDirection: "row",

    gap: 8,

    backgroundColor: "#e15347",

    borderRadius: 999,

    paddingVertical: 14,

    alignItems: "center",

    justifyContent: "center",

    marginTop: 12,
  },

  sendBtnDisabled: {
    opacity: 0.7,
  },

  sendBtnText: {
    color: "#fff",

    fontWeight: "800",

    fontSize: 15,
  },

  doneBtn: {
    backgroundColor: "#0f6e4f",

    borderRadius: 999,

    paddingVertical: 14,

    alignItems: "center",

    marginTop: 20,
  },

  doneBtnText: {
    color: "#fff",

    fontWeight: "800",
  },
});
