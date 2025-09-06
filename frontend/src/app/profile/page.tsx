import ProfileClient from "@/app/profile/profile-client";
import { Suspense } from "react";

export default function ProfilePage() {
  return (
    <Suspense fallback={<p>Đang tải...</p>}>
      <ProfileClient />
    </Suspense>
  )
}
