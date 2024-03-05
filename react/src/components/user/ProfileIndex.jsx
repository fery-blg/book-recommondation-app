import { Auth } from "../layouts/routing/User";
import Profile from "./Profile"

function ProfileIndex() {
  return (
    <Auth>
        <Profile />
    </Auth>
  );
}

export default ProfileIndex;
