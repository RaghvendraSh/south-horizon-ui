import { useState, useEffect } from "react";
import {
  getUserAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../../../api";
import type { Address, CreateAddressRequest } from "../../../api/addresses";
import { showToast } from "../../../utils/toastService";
import "./AddressManager.scss";

const AddressManager: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState<Omit<Address, "id">>({
    name: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: false,
    type: "home",
  });

  // Fetch addresses on component mount
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const fetchedAddresses = await getUserAddresses();
      setAddresses(fetchedAddresses);
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
      showToast("Failed to load addresses", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAddress = async () => {
    try {
      setLoading(true);
      if (editingAddress) {
        // Update existing address
        const updatedAddress = await updateAddress({
          ...formData,
          id: editingAddress.id,
        });
        setAddresses((prev) =>
          prev.map((addr) =>
            addr.id === editingAddress.id ? updatedAddress : addr
          )
        );
        showToast("Address updated successfully!", "success");
      } else {
        // Create new address
        const newAddress = await createAddress(
          formData as CreateAddressRequest
        );
        setAddresses((prev) => [...prev, newAddress]);
        showToast("Address added successfully!", "success");
      }
      resetForm();
    } catch (error) {
      console.error("Failed to save address:", error);
      showToast("Failed to save address", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    try {
      setLoading(true);
      await deleteAddress(id);
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
      showToast("Address deleted successfully!", "success");
    } catch (error) {
      console.error("Failed to delete address:", error);
      showToast("Failed to delete address", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      setLoading(true);
      await setDefaultAddress(id);
      setAddresses((prev) =>
        prev.map((addr) => ({ ...addr, isDefault: addr.id === id }))
      );
      showToast("Default address updated!", "success");
    } catch (error) {
      console.error("Failed to set default address:", error);
      showToast("Failed to update default address", "error");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      isDefault: false,
      type: "home",
    });
    setShowAddForm(false);
    setEditingAddress(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSaveAddress();
  };

  const handleEdit = (address: Address) => {
    setFormData({
      name: address.name,
      phone: address.phone,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || "",
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      isDefault: address.isDefault,
      type: address.type,
    });
    setEditingAddress(address);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    handleDeleteAddress(id);
  };

  const handleSetDefaultClick = (id: string) => {
    handleSetDefault(id);
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      isDefault: false,
      type: "home",
    });
    setShowAddForm(false);
    setEditingAddress(null);
  };

  return (
    <div className="address-manager">
      <div className="address-manager__header">
        <h2 className="address-manager__title">Saved Addresses</h2>
        <button
          className="address-manager__add-btn"
          onClick={() => setShowAddForm(true)}
        >
          Add New Address
        </button>
      </div>

      {showAddForm && (
        <div className="address-manager__form-container">
          <h3 className="address-manager__form-title">
            {editingAddress ? "Edit Address" : "Add New Address"}
          </h3>
          <form className="address-manager__form" onSubmit={handleSubmit}>
            <div className="address-manager__row">
              <div className="address-manager__field">
                <label className="address-manager__label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="address-manager__input"
                />
              </div>
              <div className="address-manager__field">
                <label className="address-manager__label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="address-manager__input"
                />
              </div>
            </div>

            <div className="address-manager__field">
              <label className="address-manager__label">Address Line 1</label>
              <input
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleInputChange}
                required
                className="address-manager__input"
                placeholder="House/Flat no, Building name, Street"
              />
            </div>

            <div className="address-manager__field">
              <label className="address-manager__label">
                Address Line 2 (Optional)
              </label>
              <input
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleInputChange}
                className="address-manager__input"
                placeholder="Landmark, Area"
              />
            </div>

            <div className="address-manager__row">
              <div className="address-manager__field">
                <label className="address-manager__label">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="address-manager__input"
                />
              </div>
              <div className="address-manager__field">
                <label className="address-manager__label">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="address-manager__input"
                />
              </div>
              <div className="address-manager__field">
                <label className="address-manager__label">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  required
                  className="address-manager__input"
                />
              </div>
            </div>

            <div className="address-manager__row">
              <div className="address-manager__field">
                <label className="address-manager__label">Address Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="address-manager__select"
                >
                  <option value="home">Home</option>
                  <option value="work">Work</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="address-manager__field">
                <label className="address-manager__checkbox">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleInputChange}
                  />
                  <span className="address-manager__checkbox-mark"></span>
                  Set as default address
                </label>
              </div>
            </div>

            <div className="address-manager__form-actions">
              <button
                type="button"
                className="address-manager__cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button type="submit" className="address-manager__save">
                {editingAddress ? "Update Address" : "Save Address"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="address-manager__list">
        {loading ? (
          <div className="address-manager__loading">
            <p>Loading addresses...</p>
          </div>
        ) : addresses.length === 0 ? (
          <div className="address-manager__no-data">
            <p>No addresses found. Add your first address to get started!</p>
          </div>
        ) : (
          addresses.map((address) => (
            <div key={address.id} className="address-manager__item">
              <div className="address-manager__item-header">
                <div className="address-manager__item-type">
                  <span className="address-manager__type-badge">
                    {address.type.toUpperCase()}
                  </span>
                  {address.isDefault && (
                    <span className="address-manager__default-badge">
                      DEFAULT
                    </span>
                  )}
                </div>
                <div className="address-manager__item-actions">
                  <button
                    className="address-manager__action-btn"
                    onClick={() => handleEdit(address)}
                  >
                    Edit
                  </button>
                  <button
                    className="address-manager__action-btn delete"
                    onClick={() => handleDelete(address.id)}
                  >
                    Delete
                  </button>
                  {!address.isDefault && (
                    <button
                      className="address-manager__action-btn"
                      onClick={() => handleSetDefaultClick(address.id)}
                    >
                      Set Default
                    </button>
                  )}
                </div>
              </div>
              <div className="address-manager__item-content">
                <p className="address-manager__name">{address.name}</p>
                <p className="address-manager__address">
                  {address.addressLine1}
                  {address.addressLine2 && `, ${address.addressLine2}`}
                </p>
                <p className="address-manager__location">
                  {address.city}, {address.state} - {address.pincode}
                </p>
                <p className="address-manager__phone">{address.phone}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AddressManager;
