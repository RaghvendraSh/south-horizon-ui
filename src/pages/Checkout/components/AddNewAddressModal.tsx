import { useState } from "react";
import { createAddress } from "../../../api/addresses";
import type { CreateAddressRequest } from "../../../api/addresses";
import { showToast } from "../../../utils/toastService";
import "./AddNewAddressModal.scss";

interface AddNewAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddressAdded: () => void; // Callback to refresh addresses list
}

const AddNewAddressModal: React.FC<AddNewAddressModalProps> = ({
  isOpen,
  onClose,
  onAddressAdded,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateAddressRequest>({
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

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.addressLine1.trim() ||
      !formData.city.trim() ||
      !formData.state.trim() ||
      !formData.pincode.trim()
    ) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    try {
      setLoading(true);
      await createAddress(formData);
      showToast("Address added successfully!", "success");

      // Reset form
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

      onAddressAdded(); // Refresh addresses list
      onClose();
    } catch (error) {
      console.error("Failed to add address:", error);
      showToast("Failed to add address", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form
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
    onClose();
  };

  return (
    <div className="add-address-modal-overlay" onClick={handleOverlayClick}>
      <div className="add-address-modal">
        <div className="add-address-modal-header">
          <h2>Add New Address</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="add-address-modal-content">
          <form className="address-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="Enter full name"
                />
              </div>
              <div className="form-field">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">Address Line 1 *</label>
              <input
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleInputChange}
                required
                className="form-input"
                placeholder="House/Flat no, Building name, Street"
              />
            </div>

            <div className="form-field">
              <label className="form-label">Address Line 2 (Optional)</label>
              <input
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Landmark, Area"
              />
            </div>

            <div className="form-row">
              <div className="form-field">
                <label className="form-label">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="Enter city"
                />
              </div>
              <div className="form-field">
                <label className="form-label">State *</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="Enter state"
                />
              </div>
              <div className="form-field">
                <label className="form-label">Pincode *</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="Enter pincode"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label className="form-label">Address Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="home">🏠 Home</option>
                  <option value="work">🏢 Work</option>
                  <option value="other">📍 Other</option>
                </select>
              </div>
              <div className="form-field checkbox-field">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleInputChange}
                  />
                  <span className="checkbox-mark"></span>
                  Set as default address
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Adding..." : "Add Address"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewAddressModal;
