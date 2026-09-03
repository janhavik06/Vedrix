import { FiMail, FiPhone } from "react-icons/fi";

const ProfileInfo = ({ user }) => {
  return (
    <>
      <h2 className="text-2xl font-bold">
        {user.name}
      </h2>

      <div className="mt-4 space-y-3 text-gray-600">

        <div className="flex items-center gap-2">
          <FiMail />
          <span>{user.email}</span>
        </div>

        <div className="flex items-center gap-2">
          <FiPhone />
          <span>{user.phone}</span>
        </div>

      </div>
    </>
  );
};

export default ProfileInfo;