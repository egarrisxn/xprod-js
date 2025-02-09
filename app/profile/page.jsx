import { getUserAndAvatar } from "@/app/actions/auth";
import ProfileCard from "@/components/profile/profile-card";

export const metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const user = await getUserAndAvatar();

  return (
    <section className="grid place-items-center px-3 xs:px-4 sm:px-6 2xl:px-0 py-16">
      <ProfileCard user={user} />
    </section>
  );
}
