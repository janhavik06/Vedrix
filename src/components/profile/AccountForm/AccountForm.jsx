import FormField from "./FormField";
import FormActions from "./FormActions";

const AccountForm = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border bg-white p-6 shadow-sm"
    >
      <h2 className="mb-6 text-2xl font-bold">
        Personal Information
      </h2>

      <div className="grid gap-5 md:grid-cols-2">
        <FormField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={onChange}
        />

        <FormField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={onChange}
        />

        <FormField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
        />

        <FormField
          label="Phone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={onChange}
        />
      </div>

      <FormActions
        onCancel={onCancel}
      />
    </form>
  );
};

export default AccountForm;