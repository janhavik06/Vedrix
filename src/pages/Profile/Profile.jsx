import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Footer } from "../../components/layout";
import { ProfileSidebar } from "../../components/profile";
import { useAuth } from "../../context";
import { profileAPI } from "../../services/api";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import {
  FiUser, FiMail, FiPhone, FiMapPin,
  FiEdit2, FiTrash2, FiPlus, FiCheck, FiX,
} from "react-icons/fi";

/* ── Profile Card ─────────────────────────────────────────── */
const ProfileCard = ({ user, onEdit }) => (
  <div className="rounded-3xl border bg-white p-6 shadow-sm">
    <div className="flex flex-col items-center gap-6 sm:flex-row">
      <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-black text-3xl font-black text-white">
        {user.name?.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1">
        <h2 className="text-2xl font-black">{user.name}</h2>
        <div className="mt-3 space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2"><FiMail size={14} />{user.email}</div>
          {user.phone && <div className="flex items-center gap-2"><FiPhone size={14} />{user.phone}</div>}
        </div>
        <span className="mt-3 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-600">
          {user.role}
        </span>
      </div>
      <Button variant="outline" onClick={onEdit} leftIcon={<FiEdit2 size={14} />}>
        Edit Profile
      </Button>
    </div>
  </div>
);

/* ── Edit Profile Form ────────────────────────────────────── */
const EditProfileForm = ({ user, onSave, onCancel }) => {
  const [form, setForm]     = useState({ name: user.name || "", phone: user.phone || "" });
  const [loading, setLoading] = useState(false);
  const { updateProfile }   = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(form);
      onSave();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">Edit Profile</h2>
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      </div>
      <div className="mt-6 flex gap-3">
        <Button type="submit" loading={loading} leftIcon={<FiCheck size={14} />}>Save Changes</Button>
        <Button variant="outline" type="button" onClick={onCancel} leftIcon={<FiX size={14} />}>Cancel</Button>
      </div>
    </form>
  );
};

/* ── Address Card ─────────────────────────────────────────── */
const AddressItem = ({ address, onDelete, onSetDefault }) => (
  <div className={`rounded-2xl border p-5 transition ${address.isDefault ? "border-black" : "border-gray-200"}`}>
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-1 text-sm">
        <div className="flex items-center gap-2">
          <p className="font-bold">{address.firstName} {address.lastName}</p>
          {address.isDefault && (
            <span className="rounded-full bg-black px-2.5 py-0.5 text-[10px] font-bold text-white">Default</span>
          )}
        </div>
        <p className="text-gray-600">{address.address}</p>
        <p className="text-gray-600">{address.city}, {address.state} – {address.pincode}</p>
        <p className="text-gray-500">{address.phone}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {!address.isDefault && (
          <button onClick={() => onSetDefault(address.id)} className="text-xs font-semibold text-gray-500 underline hover:text-black transition">
            Set default
          </button>
        )}
        <button onClick={() => onDelete(address.id)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-red-500 hover:text-red-500">
          <FiTrash2 size={13} />
        </button>
      </div>
    </div>
  </div>
);

/* ── Add Address Form ─────────────────────────────────────── */
const AddAddressForm = ({ onSaved, onCancel }) => {
  const [form, setForm] = useState({
    label: "Home", firstName: "", lastName: "", phone: "",
    address: "", city: "", state: "", pincode: "", isDefault: false,
  });
  const [loading, setLoading] = useState(false);
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await profileAPI.addAddress(form);
      onSaved();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 rounded-2xl border border-dashed bg-gray-50 p-5">
      <h3 className="mb-5 font-bold">New Address</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="First Name" name="firstName" value={form.firstName} onChange={change} required />
        <Input label="Last Name"  name="lastName"  value={form.lastName}  onChange={change} required />
        <Input label="Phone"      name="phone"      type="tel" value={form.phone}  onChange={change} required />
        <Input label="Label"      name="label"      value={form.label}    onChange={change} />
        <div className="sm:col-span-2">
          <Input label="Address"  name="address"    value={form.address}  onChange={change} required />
        </div>
        <Input label="City"       name="city"       value={form.city}     onChange={change} required />
        <Input label="State"      name="state"      value={form.state}    onChange={change} required />
        <Input label="Pincode"    name="pincode"    value={form.pincode}  onChange={change} required />
      </div>
      <label className="mt-4 flex items-center gap-2 text-sm">
        <input type="checkbox" checked={form.isDefault} onChange={(e) => setForm({ ...form, isDefault: e.target.checked })} />
        Set as default address
      </label>
      <div className="mt-5 flex gap-3">
        <Button type="submit" loading={loading} size="sm">Save Address</Button>
        <Button variant="outline" type="button" size="sm" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
};

/* ── Main Page ────────────────────────────────────────────── */
const Profile = () => {
  const { user } = useAuth();
  const [editing, setEditing]       = useState(false);
  const [addresses, setAddresses]   = useState([]);
  const [addingAddr, setAddingAddr] = useState(false);
  const [addrLoading, setAddrLoading] = useState(true);

  const fetchAddresses = () => {
    if (!user) return;
    profileAPI.getAddresses()
      .then((res) => setAddresses(res.addresses || []))
      .catch(console.error)
      .finally(() => setAddrLoading(false));
  };

  useEffect(() => { fetchAddresses(); }, [user]);

  const handleDeleteAddress = async (id) => {
    await profileAPI.deleteAddress(id);
    fetchAddresses();
  };

  const handleSetDefault = async (id) => {
    await profileAPI.updateAddress(id, { isDefault: true });
    fetchAddresses();
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <main className="pt-[72px] flex min-h-[60vh] items-center justify-center px-6">
          <div className="text-center">
            <FiUser size={40} className="mx-auto text-gray-300" />
            <p className="mt-4 text-lg font-bold">Please log in to view your profile.</p>
            <Link to="/login" className="mt-5 inline-block rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500">
              Login
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-[72px] mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-4">
          <aside><ProfileSidebar activeItem="profile" /></aside>

          <section className="space-y-8 lg:col-span-3">
            {/* Profile card / edit form */}
            {editing ? (
              <EditProfileForm user={user} onSave={() => setEditing(false)} onCancel={() => setEditing(false)} />
            ) : (
              <ProfileCard user={user} onEdit={() => setEditing(true)} />
            )}

            {/* Addresses */}
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black">Saved Addresses</h2>
                {!addingAddr && (
                  <button
                    onClick={() => setAddingAddr(true)}
                    className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold transition hover:border-black hover:bg-black hover:text-white"
                  >
                    <FiPlus size={14} /> Add Address
                  </button>
                )}
              </div>

              {addrLoading ? (
                <p className="text-sm text-gray-400">Loading addresses...</p>
              ) : addresses.length === 0 && !addingAddr ? (
                <div className="rounded-2xl border border-dashed py-10 text-center">
                  <FiMapPin size={28} className="mx-auto text-gray-300" />
                  <p className="mt-3 text-sm text-gray-500">No saved addresses yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {addresses.map((a) => (
                    <AddressItem key={a.id} address={a} onDelete={handleDeleteAddress} onSetDefault={handleSetDefault} />
                  ))}
                </div>
              )}

              {addingAddr && (
                <AddAddressForm
                  onSaved={() => { setAddingAddr(false); fetchAddresses(); }}
                  onCancel={() => setAddingAddr(false)}
                />
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Profile;
