const ProfileAvatar = ({ user }) => {
  return (
    <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-gray-100">
      {user.avatar ? (
        <img
          src={user.avatar}
          alt={user.name}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="text-4xl font-bold text-gray-500">
          {user.name?.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
};

export default ProfileAvatar;