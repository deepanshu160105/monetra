import { View, Text } from "react-native";
import React from "react";
import { SettingsView } from "@/types/settings";
import { useRouter } from "expo-router";
import { useAuthSession, useSignOut } from "@/hooks/use-auth-session";
import MonetraProfileCard from "@/components/containers/settings/monetra-profile-card";
import SectionLabel from "@/components/base/settings/seccion-label";
import MonetraSettingsMenuItem from "@/components/base/settings/monetra-settings-menu-item";
import { User } from "@/components/ui/icons/User";
import { GeneralNotificat } from "@/components/ui/icons/GeneralNotificat";
import { GeneralSliders } from "@/components/ui/icons/GeneralSliders";
import { GeneralExplore } from "@/components/ui/icons/GeneralExplore";
import { GeneralWallet } from "@/components/ui/icons/GeneralWallet";
import { GeneralBook } from "@/components/ui/icons/GeneralBook";
import { GeneralReport } from "@/components/ui/icons/GeneralReport";
import { GeneralSummary } from "@/components/ui/icons/GeneralSummary";
import { GeneralHelp } from "@/components/ui/icons/GeneralHelp";
import { GeneralFaq } from "@/components/ui/icons/GeneralFaq";
import { GeneralSecurity } from "@/components/ui/icons/GeneralSecurity";
import { MonetraButton } from "@/components/ui/monetra-button";
import { GeneralLogout } from "@/components/ui/icons/GeneralLogout";

export default function SettingsOverview({
  onNavigate,
  iconColor,
}: {
  onNavigate: (view: SettingsView) => void;
  iconColor: string;
}) {
  const router = useRouter();
  const { mutate: signOut, isPending } = useSignOut();
  const { data: session } = useAuthSession();
  const user = session?.data?.user;
  return (
    <View className="flex-col gap-y-5">
      {/* Profile Card */}
      <MonetraProfileCard
        name={user?.name || "User"}
        email={user?.email || "No email"}
        onPress={() => onNavigate("account")}
      />

      {/* General Section */}
      <View className="flex-col gap-y-2.5">
        <SectionLabel label="General" />
        <MonetraSettingsMenuItem
          label="Account"
          icon={<User color={iconColor} width={18} height={18} />}
          onPress={() => onNavigate("account")}
        />
        <MonetraSettingsMenuItem
          label="Notification"
          icon={<GeneralNotificat color={iconColor} width={18} height={18} />}
          onPress={() => onNavigate("notification")}
        />
        <MonetraSettingsMenuItem
          label="Preference"
          icon={<GeneralSliders color={iconColor} width={18} height={18} />}
        />
        <MonetraSettingsMenuItem
          label="Language"
          icon={<GeneralExplore color={iconColor} width={18} height={18} />}
        />
      </View>

      {/* Main App Section */}
      <View className="flex-col gap-y-2.5">
        <SectionLabel label="Main App" />
        <MonetraSettingsMenuItem
          label="Transaction"
          icon={<GeneralWallet color={iconColor} width={18} height={18} />}
          onPress={() => router.push("/transactions")}
        />
        <MonetraSettingsMenuItem
          label="Category"
          icon={<GeneralBook color={iconColor} width={18} height={18} />}
          onPress={() => router.push("/category")}
        />
        <MonetraSettingsMenuItem
          label="Wallet"
          icon={<GeneralWallet color={iconColor} width={18} height={18} />}
          onPress={() => router.push("/wallet")}
        />
        <MonetraSettingsMenuItem
          label="Insight"
          icon={<GeneralReport color={iconColor} width={18} height={18} />}
        />
        <MonetraSettingsMenuItem
          label="My Overview"
          icon={<GeneralSummary color={iconColor} width={18} height={18} />}
        />
        <MonetraSettingsMenuItem
          label="Document"
          icon={<GeneralBook color={iconColor} width={18} height={18} />}
        />
      </View>

      {/* Support Section */}
      <View className="flex-col gap-y-2.5">
        <SectionLabel label="Support" />
        <MonetraSettingsMenuItem
          label="Help Center"
          icon={<GeneralHelp color={iconColor} width={18} height={18} />}
        />
        <MonetraSettingsMenuItem
          label="FAQ"
          icon={<GeneralFaq color={iconColor} width={18} height={18} />}
        />
        <MonetraSettingsMenuItem
          label="Privacy Policy"
          icon={<GeneralSecurity color={iconColor} width={18} height={18} />}
        />
      </View>

      {/* Action Section */}
      <View className="flex-col gap-y-2.5 mt-2">
        <MonetraButton
          variant="solid"
          color="danger"
          fullWidth
          isLoading={isPending}
          onPress={() => {
            signOut(undefined, {
              onSuccess: () => {
                router.replace("/sign-in");
              },
            });
          }}
          className="rounded-[15px]"
        >
          <View className="flex-row items-center justify-center gap-x-2">
            <GeneralLogout color="#FFFFFF" width={20} height={20} />
            <Text
              className="text-[#FFFFFF] text-[16px] leading-5"
              style={{ fontFamily: "PlusJakartaSans_700Bold" }}
            >
              Sign Out
            </Text>
          </View>
        </MonetraButton>
      </View>
    </View>
  );
}
