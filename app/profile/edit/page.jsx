import { getUserAndAvatar } from "@/app/actions/auth";
import EditProfileCard from "@/components/profile/edit-profile-card";

export const metadata = {
  title: "Edit Profile",
};

export default async function EditProfilePage() {
  const user = await getUserAndAvatar();

  return (
    <section className="grid place-items-center px-3 xs:px-4 sm:px-6 2xl:px-0 py-16">
      <EditProfileCard user={user} />
    </section>
  );
}
