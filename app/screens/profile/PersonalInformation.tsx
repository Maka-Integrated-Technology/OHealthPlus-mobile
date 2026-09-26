import Avatar, { AvatarFallback } from "@/components/Avatar";
import Button from "@/components/Button";
import DetailHeader from "@/components/DetailHeader";
import { FormInputField } from "@/components/forms";
import Screen from "@/components/Screen";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { useGetMe, useUpdateProfile } from "@/features/auth/hooks/useAuth";
import { splitFullName } from "@/features/auth/validationSchema";
import {
  PersonalInfoValues,
  personalInfoSchema,
} from "@/features/profile/validationSchema";
import { getApiErrorMessage } from "@/utils/apiError";
import { getNameInitials } from "@/utils/avatar";
import { toFormikValidate } from "@/utils/formikZod";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function PersonalInformationScreen() {
  const { data: user, isLoading, isError, refetch } = useGetMe();
  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const initialValues: PersonalInfoValues = {
    full_name: [user?.first_name, user?.last_name]
      .filter(Boolean)
      .join(" ")
      .trim(),
    email: user?.email ?? "",
  };

  if (isLoading) {
    return (
      <Screen>
        <DetailHeader title="Personal Information" />
        <View style={styles.center}>
          <ActivityIndicator color={Colors.primary} />
        </View>
      </Screen>
    );
  }

  if (isError) {
    return (
      <Screen>
        <DetailHeader title="Personal Information" />
        <View style={styles.center}>
          <Text weight="regular" style={styles.errorText}>
            Failed to load profile.
          </Text>
          <Text
            weight="medium"
            style={styles.retryText}
            onPress={() => refetch()}
          >
            Tap to retry
          </Text>
        </View>
      </Screen>
    );
  }

  const handleEditPhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Photo access needed",
        "Please allow photo library access to update your profile photo."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
      mediaTypes: ["images"],
      quality: 0.6,
    });

    if (result.canceled) return;

    const asset = result.assets[0];
    if (!asset?.base64) {
      Alert.alert("Photo update failed", "Please choose another image.");
      return;
    }

    const mimeType = asset.mimeType ?? "image/jpeg";
    const image = `data:${mimeType};base64,${asset.base64}`;

    try {
      setPhotoPreview(asset.uri);
      await updateProfile({ image });
      Alert.alert("Photo updated", "Your profile photo has been saved.");
    } catch (err) {
      setPhotoPreview(null);
      Alert.alert(
        "Couldn't save photo",
        getApiErrorMessage(
          err,
          "We couldn't update your profile photo. Please try again."
        )
      );
    }
  };

  const profileImage = photoPreview ?? user?.image;

  return (
    <Screen>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <DetailHeader title="Personal Information" />

        <Formik<PersonalInfoValues>
          initialValues={initialValues}
          enableReinitialize
          validate={toFormikValidate(personalInfoSchema)}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const parts = splitFullName(values.full_name);
              if (!parts) {
                Alert.alert(
                  "Update name",
                  "Please enter your first and last name."
                );
                return;
              }
              await updateProfile({
                first_name: parts.first_name,
                last_name: parts.last_name,
              });
              Alert.alert(
                "Profile updated",
                "Your personal information has been saved."
              );
            } catch (err) {
              Alert.alert(
                "Couldn't save",
                getApiErrorMessage(
                  err,
                  "We couldn't reach the server. Please try again."
                )
              );
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* Profile photo */}
              <View style={styles.photoSection}>
                <View style={styles.avatarWrapper}>
                  <Avatar
                    imageUrl={profileImage}
                    size="4xl"
                    rounded="full"
                    accessibilityLabel={`${user?.first_name ?? ""} ${
                      user?.last_name ?? ""
                    }`.trim()}
                  >
                    <AvatarFallback size="4xl" rounded="full">
                      {getNameInitials(
                        [user?.first_name, user?.last_name]
                          .filter(Boolean)
                          .join(" ")
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <Pressable
                    style={styles.editPhotoBadge}
                    onPress={handleEditPhoto}
                    disabled={isPending}
                    accessibilityRole="button"
                    accessibilityLabel="Edit profile photo"
                  >
                    {isPending ? (
                      <ActivityIndicator size="small" color="white" />
                    ) : (
                      <Ionicons name="pencil" size={14} color="white" />
                    )}
                  </Pressable>
                </View>
                <Text weight="medium" style={styles.photoHint}>
                  {profileImage ? "Tap to change photo" : "Add a profile photo"}
                </Text>
              </View>

              {/* Form */}
              <View style={styles.form}>
                <FormInputField
                  name="full_name"
                  label="Full Name"
                  icon="name"
                  placeholder="Full Name"
                  autoCapitalize="words"
                  placeholderTextColor="#9CA3AF"
                />

                <FormInputField
                  name="email"
                  label="Email Address"
                  icon="email"
                  placeholder="Email Address"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={false}
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              {/* Save button */}
              <View style={styles.buttonWrapper}>
                <Button
                  onPress={() => handleSubmit()}
                  isLoading={isPending || isSubmitting}
                  loadingText="Saving…"
                >
                  Save Changes
                </Button>
                <Text weight="regular" style={styles.unavailableNote}>
                  Email cannot be changed from the app.
                </Text>
              </View>
            </ScrollView>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  errorText: {
    fontSize: 14,
    color: Colors.neutral,
    textAlign: "center",
  },
  retryText: {
    fontSize: 14,
    color: Colors.primary,
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 40,
    gap: 16,
  },
  photoSection: {
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
  },
  avatarWrapper: {
    position: "relative",
  },
  editPhotoBadge: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  photoHint: {
    fontSize: 13,
    color: Colors.neutral400,
  },
  form: {
    gap: 16,
  },
  buttonWrapper: {
    marginTop: 8,
    gap: 8,
  },
  unavailableNote: {
    fontSize: 13,
    lineHeight: 18,
    color: Colors.neutral400,
    textAlign: "center",
  },
});
