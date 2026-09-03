import { useEffect, useRef, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { adminAPI } from "../../services/api";
import {
  FiPlus, FiEdit2, FiTrash2, FiX, FiCheck,
  FiUpload, FiSearch, FiPackage, FiAlertTriangle,
} from "react-icons/fi";

/* ── Badge map ── */
const BADGES = ["", "New", "Best Seller", "Trending", "Limited", "Sale"];
const SIZES  = ["XS", "S", "M", "L", "XL", "XXL"];
const COLORS = ["Black", "White", "Blue", "Olive", "Beige", "Gray", "Cream", "Charcoal"];

/* ── Empty form state ── */
const emptyForm = {
  name: "", description: "", price: "", oldPrice: "",
  stock: "", badge: "", image: "",
  sizes: [], colors: [], categoryId: "",
};

/* ── Modal ── */
const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/50" onClick={onClose} />
    <div className="relative z-10 w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl max-h-[90vh]">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <h3 className="text-lg font-black text-gray-900">{title}</h3>
        <button onClick={onClose} className="text-gray-400 transition hover:text-black">
          <FiX size={20} />
        </button>
      </div>
      <div className="p-6">{children}</div>
    </div>
  </div>
);

/* ── Confirm delete dialog ── */
const ConfirmDelete = ({ name, onConfirm, onCancel }) => (
  <Modal title="Delete Product" onClose={onCancel}>
    <div className="text-center py-4">
      <FiAlertTriangle size={40} className="mx-auto text-red-500" />
      <p className="mt-4 text-lg font-semibold text-gray-900">Are you sure?</p>
      <p className="mt-2 text-sm text-gray-500">
        This will permanently delete <strong>{name}</strong> from your catalogue.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <button onClick={onCancel} className="rounded-xl border border-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-gray-900">
          Cancel
        </button>
        <button onClick={onConfirm} className="rounded-xl bg-red-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700">
          Delete Product
        </button>
      </div>
    </div>
  </Modal>
);

/* ── Product Form ── */
const ProductForm = ({ initial, categories, onSave, onClose }) => {
  const [form, setForm]         = useState(initial || emptyForm);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState("");
  const fileRef                 = useRef();

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const toggleArr = (field, val) =>
    setForm((f) => ({
      ...f,
      [field]: f[field].includes(val)
        ? f[field].filter((v) => v !== val)
        : [...f[field], val],
    }));

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await adminAPI.uploadImage(file);
      setForm((f) => ({ ...f, image: res.path }));
    } catch (err) {
      setError("Image upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.categoryId) {
      setError("Name, price and category are required."); return;
    }
    setSaving(true); setError("");
    try {
      const payload = {
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        oldPrice: form.oldPrice ? parseFloat(form.oldPrice) : null,
        stock: parseInt(form.stock) || 0,
        image: form.image,
        badge: form.badge,
        sizes: form.sizes,
        colors: form.colors,
        categoryId: parseInt(form.categoryId),
      };
      if (initial?.id) {
        await adminAPI.updateProduct(initial.id, payload);
      } else {
        await adminAPI.createProduct(payload);
      }
      onSave();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Image */}
      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-600">
          Product Image
        </label>
        <div className="flex items-center gap-4">
          {form.image && (
            <img src={form.image} alt="preview" className="h-20 w-20 rounded-xl object-cover border" />
          )}
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 rounded-xl border-2 border-dashed border-gray-300 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:border-black hover:text-black disabled:opacity-50"
          >
            <FiUpload size={16} />
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </div>
        <p className="mt-1.5 text-[10px] text-gray-400">
          Or paste a URL:{" "}
          <input
            name="image"
            value={form.image}
            onChange={change}
            placeholder="/images/products/hoodies/my-hoodie.jpg"
            className="ml-1 rounded border border-gray-200 px-2 py-0.5 text-xs outline-none focus:border-black w-64"
          />
        </p>
      </div>

      {/* Name + Description */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-600">Name *</label>
          <input name="name" value={form.name} onChange={change} required
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-black" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-600">Category *</label>
          <select name="categoryId" value={form.categoryId} onChange={change} required
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-black bg-white">
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-600">Description</label>
        <textarea name="description" value={form.description} onChange={change} rows={3}
          className="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-black"
          placeholder="Describe the product..." />
      </div>

      {/* Price + OldPrice + Stock + Badge */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { name: "price",    label: "Price (₹) *", placeholder: "1799" },
          { name: "oldPrice", label: "Old Price (₹)", placeholder: "2299" },
          { name: "stock",    label: "Stock",         placeholder: "50"   },
        ].map((f) => (
          <div key={f.name}>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-600">{f.label}</label>
            <input name={f.name} type="number" value={form[f.name]} onChange={change}
              placeholder={f.placeholder} required={f.name === "price"}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-black" />
          </div>
        ))}
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-600">Badge</label>
          <select name="badge" value={form.badge} onChange={change}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-black bg-white">
            {BADGES.map((b) => <option key={b} value={b}>{b || "None"}</option>)}
          </select>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-600">Sizes</label>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button key={s} type="button"
              onClick={() => toggleArr("sizes", s)}
              className={`rounded-xl border px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                form.sizes.includes(s) ? "border-black bg-black text-white" : "border-gray-200 text-gray-600 hover:border-gray-900"
              }`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-600">Colors</label>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <button key={c} type="button"
              onClick={() => toggleArr("colors", c)}
              className={`rounded-xl border px-4 py-2 text-xs font-semibold transition ${
                form.colors.includes(c) ? "border-black bg-black text-white" : "border-gray-200 text-gray-600 hover:border-gray-900"
              }`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-3 border-t pt-5">
        <button type="button" onClick={onClose}
          className="rounded-xl border border-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-gray-900">
          Cancel
        </button>
        <button type="submit" disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-black px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-500 disabled:opacity-60">
          {saving ? "Saving..." : <><FiCheck size={15} /> {initial?.id ? "Update Product" : "Add Product"}</>}
        </button>
      </div>
    </form>
  );
};

/* ── Main page ── */
const AdminProducts = () => {
  const [products,    setProducts]    = useState([]);
  const [categories,  setCategories]  = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [search,      setSearch]      = useState("");
  const [modal,       setModal]       = useState(null); // null | "add" | {product}
  const [deleteTarget,setDeleteTarget]= useState(null);

  const load = () => {
    setLoading(true);
    Promise.all([adminAPI.getProducts({ limit: 100 }), adminAPI.getCategories()])
      .then(([pRes, cRes]) => {
        setProducts(pRes.products || []);
        setCategories(cRes.categories || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async () => {
    try {
      await adminAPI.deleteProduct(deleteTarget.id);
      setDeleteTarget(null);
      load();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-black text-gray-900">Products</h2>
            <p className="mt-1 text-sm text-gray-500">{products.length} products in catalogue</p>
          </div>
          <button
            onClick={() => setModal("add")}
            className="flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-500"
          >
            <FiPlus size={16} /> Add Product
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <FiSearch size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-black"
          />
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <FiPackage size={36} className="text-gray-300" />
              <p className="mt-3 font-semibold text-gray-600">No products found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    {["Product", "Category", "Price", "Stock", "Badge", "Actions"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                            {p.image && <img src={p.image} alt={p.name} className="h-full w-full object-cover" />}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 leading-snug">{p.name}</p>
                            <p className="text-xs text-gray-400">ID: {p.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-600">{p.category?.name}</td>
                      <td className="px-5 py-4">
                        <p className="font-black text-gray-900">₹{p.price}</p>
                        {p.oldPrice && <p className="text-xs text-gray-400 line-through">₹{p.oldPrice}</p>}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                          p.stock === 0 ? "bg-red-100 text-red-600" :
                          p.stock <= 5  ? "bg-orange-100 text-orange-600" :
                          "bg-green-100 text-green-700"
                        }`}>
                          {p.stock === 0 ? "Out of stock" : `${p.stock} in stock`}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        {p.badge ? (
                          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                            {p.badge}
                          </span>
                        ) : <span className="text-gray-300">—</span>}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setModal({
                              ...p,
                              sizes:  p.sizes  ? JSON.parse(p.sizes)  : [],
                              colors: p.colors ? JSON.parse(p.colors) : [],
                            })}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-black hover:bg-black hover:text-white"
                          >
                            <FiEdit2 size={13} />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(p)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-red-500 hover:text-red-500"
                          >
                            <FiTrash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit modal */}
      {modal && (
        <Modal
          title={modal === "add" ? "Add New Product" : `Edit: ${modal.name}`}
          onClose={() => setModal(null)}
        >
          <ProductForm
            initial={modal === "add" ? null : modal}
            categories={categories}
            onSave={() => { setModal(null); load(); }}
            onClose={() => setModal(null)}
          />
        </Modal>
      )}

      {/* Delete confirm */}
      {deleteTarget && (
        <ConfirmDelete
          name={deleteTarget.name}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </AdminLayout>
  );
};

export default AdminProducts;
