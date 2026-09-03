import Button from "../../common/Button";

const ProfileActions = ({
  onEditProfile,
}) => {
  return (
    <Button
      variant="outline"
      onClick={onEditProfile}
    >
      Edit Profile
    </Button>
  );
};

export default ProfileActions;