import OnboardingForm from "@/components/authenticate/onboarding-form";
import { auth, signOut } from "@/server/auth";
import { redirect } from "next/navigation";

const Onboarding = async () => {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-6 h-screen flex items-center justify-center">
      <OnboardingForm session={session} />
    </div>
  );
};

export default Onboarding;
