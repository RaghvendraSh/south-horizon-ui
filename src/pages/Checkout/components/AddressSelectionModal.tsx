import { useState } from "react";
import type { Address } from "../../../api/addresses";
import AddNewAddressModal from "./AddNewAddressModal";
import "./AddressSelectionModal.scss";

interface AddressSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  addresses: Address[];
  selectedAddress: Address | null;
  onAddressSelect: (address: Address) => void;
  onAddressAdded: () => void; // Callback to refresh addresses
}

const AddressSelectionModal: React.FC<AddressSelectionModalProps> = ({
  isOpen,
  onClose,
  addresses,
  selectedAddress,
  onAddressSelect,
  onAddressAdded,
}) => {
  const [tempSelectedAddress, setTempSelectedAddress] =
    useState<Address | null>(selectedAddress);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    if (tempSelectedAddress) {
      onAddressSelect(tempSelectedAddress);
    }
  };

  const getAddressTypeIcon = (type: string) => {
    switch (type) {
      case "home":
        return "🏠";
      case "work":
        return "🏢";
      default:
        return "📍";
    }
  };

  const handleAddressAdded = () => {
    setShowAddAddressModal(false);
    onAddressAdded(); // Refresh addresses in parent component
  };

  return (
    <>
      <div className="address-modal-overlay" onClick={handleOverlayClick}>
        <div className="address-modal">
          <div className="address-modal-header">
            <h2>Select Delivery Address</h2>
            <button className="close-btn" onClick={onClose}>
              ✕
            </button>
          </div>

          <div className="address-modal-content">
            <div className="add-address-section">
              <button
                className="add-address-btn"
                onClick={() => setShowAddAddressModal(true)}
              >
                + Add New Address
              </button>
            </div>

            {addresses.length === 0 ? (
              <div className="no-addresses">
                <p>
                  No addresses found. Add your first address to get started!
                </p>
              </div>
            ) : (
              <div className="addresses-list">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`address-card ${
                      tempSelectedAddress?.id === address.id ? "selected" : ""
                    }`}
                    onClick={() => setTempSelectedAddress(address)}
                  >
                    <div className="address-radio">
                      <input
                        type="radio"
                        name="address"
                        checked={tempSelectedAddress?.id === address.id}
                        onChange={() => setTempSelectedAddress(address)}
                      />
                    </div>

                    <div className="address-info">
                      <div className="address-header">
                        <span className="address-name">{address.name}</span>
                        <div className="address-badges">
                          <span className="address-type">
                            {getAddressTypeIcon(address.type)} {address.type}
                          </span>
                          {address.isDefault && (
                            <span className="default-badge">Default</span>
                          )}
                        </div>
                      </div>

                      <div className="address-details">
                        <p>{address.addressLine1}</p>
                        {address.addressLine2 && <p>{address.addressLine2}</p>}
                        <p>
                          {address.city}, {address.state} {address.pincode}
                        </p>
                        <p className="address-phone">Phone: {address.phone}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="address-modal-footer">
            <button className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn-primary"
              onClick={handleConfirm}
              disabled={!tempSelectedAddress}
            >
              Use This Address
            </button>
          </div>
        </div>
      </div>

      <AddNewAddressModal
        isOpen={showAddAddressModal}
        onClose={() => setShowAddAddressModal(false)}
        onAddressAdded={handleAddressAdded}
      />
    </>
  );
};

export default AddressSelectionModal;
