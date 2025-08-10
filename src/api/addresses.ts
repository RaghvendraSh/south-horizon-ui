import { authorizedApiCall } from "./apiClient";

export interface Address {
  id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
  type: "home" | "work" | "other";
}

export interface CreateAddressRequest {
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
  type: "home" | "work" | "other";
}

export interface UpdateAddressRequest extends CreateAddressRequest {
  id: string;
}

// Get User Addresses
export const getUserAddresses = (): Promise<Address[]> => {
  return authorizedApiCall("/api/profile/addresses", undefined, "GET", {
    error: "Failed to fetch addresses.",
  });
};

// Create Address
export const createAddress = (data: CreateAddressRequest): Promise<Address> => {
  return authorizedApiCall("/api/profile/addresses", data, "POST", {
    success: "Address added successfully!",
    error: "Failed to add address.",
  });
};

// Update Address
export const updateAddress = (data: UpdateAddressRequest): Promise<Address> => {
  return authorizedApiCall(`/api/addresses/${data.id}`, data, "PUT", {
    success: "Address updated successfully!",
    error: "Failed to update address.",
  });
};

// Delete Address
export const deleteAddress = (id: string): Promise<void> => {
  return authorizedApiCall(
    `/api/profile/addresses/${id}`,
    undefined,
    "DELETE",
    {
      success: "Address deleted successfully!",
      error: "Failed to delete address.",
    }
  );
};

// Set Default Address
export const setDefaultAddress = (id: string): Promise<Address> => {
  return authorizedApiCall(
    `/api/profile/addresses/${id}/default`,
    undefined,
    "PATCH",
    {
      success: "Default address updated!",
      error: "Failed to update default address.",
    }
  );
};
