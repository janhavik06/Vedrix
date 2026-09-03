import ProfileAvatar from "./ProfileAvatar";
import ProfileInfo from "./ProfileInfo";
import ProfileActions from "./ProfileActions";

const ProfileCard = ({
  user,
  onEditProfile,
}) => {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col items-center gap-6 md:flex-row">
        <ProfileAvatar user={user} />

        <div className="flex-1">
          <ProfileInfo user={user} />
        </div>

        <ProfileActions
          onEditProfile={onEditProfile}
        />
      </div>
    </div>
  );
};

export default ProfileCard;