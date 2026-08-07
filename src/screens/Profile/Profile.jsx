import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import UserSidebar from '../../components/UserSidebar/UserSidebar';
import Loader from '../../components/Loader/Loader';
import axiosClient from '../../axios-client';
import DummyImage from '../../components/DummyImage/DummyImage';
import LocationOnIcon from "@mui/icons-material/LocationOn";

const S = {
  wrap: { padding: "24px", minHeight: "100vh" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" },
  pageTitle: { fontSize: "24px", fontWeight: 600, color: "#1a1a2e" },
  editBtn: { padding: "8px 16px", borderRadius: "8px", background: "#1a1a2e", color: "#fff", border: "none", fontSize: "13px", cursor: "pointer", fontWeight: 500 },
  editBtnCancel: { background: "#f5f4f0", color: "#1a1a2e", border: "0.5px solid #e0dfd8" },
  contentGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" },
  card: { background: "#fff", borderRadius: "14px", border: "0.5px solid #e0dfd8", padding: "24px", overflow: "hidden" },
  profileSection: { gridColumn: 1 },
  addressSection: { gridColumn: 2 },
  avatarWrapper: { position: "relative", width: 100, height: 100, marginBottom: "20px" },
  avatar: { width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", display: "block" },
  avatarEdit: { position: "absolute", bottom: 0, right: 0, width: 32, height: 32, background: "#1a1a2e", borderRadius: "50%", border: "3px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", cursor: "pointer", fontSize: "14px", transition: "all 0.2s" },
  profileName: { fontSize: "20px", fontWeight: 600, color: "#1a1a2e", marginBottom: "20px" },
  infoGroup: { marginBottom: "16px" },
  infoLabel: { fontSize: "11px", color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px", display: "block" },
  infoValue: { fontSize: "14px", color: "#1a1a2e", fontWeight: 500 },
  formGrid: { display: "grid", gridTemplateColumns: "1fr", gap: "12px", marginBottom: "12px" },
  formLabel: { fontSize: "12px", color: "#555", marginBottom: "6px", display: "block", fontWeight: 500 },
  formInput: { width: "100%", padding: "10px 12px", border: "0.5px solid #e0dfd8", borderRadius: "8px", fontSize: "13px", color: "#1a1a2e", fontFamily: "sans-serif" },
  submitBtn: { padding: "10px 20px", background: "#1a1a2e", color: "#fff", border: "none", borderRadius: "8px", fontSize: "13px", cursor: "pointer", fontWeight: 500, width: "100%", marginTop: "12px" },
  addressList: { display: "flex", flexDirection: "column", gap: "12px" },
  addressCard: { border: "0.5px solid #e0dfd8", borderRadius: "12px", padding: "16px", display: "flex", gap: "12px", cursor: "pointer", transition: "all 0.2s" },
  addressIcon: { width: 44, height: 44, borderRadius: "10px", background: "#f0efe8", display: "flex", alignItems: "center", justifyContent: "center", color: "#1a1a2e", fontSize: "20px", flexShrink: 0 },
  addressContent: { flex: 1, minWidth: 0 },
  addressType: { fontSize: "13px", fontWeight: 600, color: "#1a1a2e", marginBottom: "4px" },
  addressValue: { fontSize: "12px", color: "#888", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modal: { background: "#fff", borderRadius: "14px", width: "90%", maxWidth: 400, padding: "24px" },
  modalTitle: { fontSize: "16px", fontWeight: 600, color: "#1a1a2e", marginBottom: "16px" },
  modalInput: { width: "100%", padding: "10px 12px", border: "0.5px solid #e0dfd8", borderRadius: "8px", fontSize: "13px", marginBottom: "16px", fontFamily: "sans-serif" },
  modalActions: { display: "flex", gap: "8px" },
  modalBtn: { flex: 1, padding: "10px", borderRadius: "8px", border: "none", fontSize: "13px", cursor: "pointer", fontWeight: 500 },
  modalBtnPrimary: { background: "#1a1a2e", color: "#fff" },
  modalBtnSecondary: { background: "#f5f4f0", color: "#1a1a2e", border: "0.5px solid #e0dfd8" },
};

function ProfilePage() {
  const { user, login, token } = useAuth();
  const fileInputRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressType, setAddressType] = useState('home');
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [location, setLocation] = useState("");

  const [formData, setFormData] = useState({
    name: "", phoneNumber: "", dateOfBirth: "", gender: "",
  });

  useEffect(() => {
    fetchUserDetails();
  }, [user.id]);

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.username || "",
        phoneNumber: userData.user_info?.phone_number || "",
        dateOfBirth: userData.user_info?.dob || "",
        gender: userData.user_info?.gender || "",
      });
    }
  }, [userData]);

  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(`/getUserDetail/${user.id}`);
      setUserData(data.user);
    } catch (error) {
      console.error('Error fetching user details', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      setFormData((prev) => ({ ...prev, [name]: value.replace(/\D/g, "") }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        username: formData.name,
        phoneNumber: formData.phoneNumber,
        dob: formData.dateOfBirth,
        gender: formData.gender,
      };
      const { data } = await axiosClient.post(`/updateUserInfo/${user.id}`, payload);
      login(data.user, token);
      setUserData(data.user);
      setShowForm(false);
    } catch (err) {
      console.error('error updating profile', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setImgLoading(true);
      try {
        const formDataImg = new FormData();
        formDataImg.append('profile_image', file);
        const { data } = await axiosClient.post(`/updateUserProfileImg/${user.id}`, formDataImg, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        let tempUser = JSON.parse(localStorage.getItem("AUTH_USER"));
        tempUser = { ...tempUser, user_info: { ...tempUser.user_info, profile_image: data.profile_image } };
        localStorage.setItem("AUTH_USER", JSON.stringify(tempUser));
        login(tempUser, token);
      } catch (err) {
        console.error('Error updating profile img', err);
      } finally {
        setImgLoading(false);
      }
    }
  };

  const handleSubmitAddressForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosClient.post(`/addUserAddress/${user.id}`, { address: location, address_type: addressType });
      setLocation('');
      fetchUserDetails();
      setShowAddressModal(false);
    } catch (error) {
      console.error('Error adding address', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarClick = () => fileInputRef.current?.click();
  const openAddressModal = (type) => {
    setAddressType(type);
    setLocation('');
    setShowAddressModal(true);
  };

  return (
    <div className="profile" style={{ display: "flex" }}>
      <div className="container">
        <div style={{ display: "flex", flex: 1 }}>
        <UserSidebar />
        <div className="content" style={{ flex: 1 }}>
          {loading && <Loader />}

          <div style={S.wrap}>
            <div style={S.header}>
              <h1 style={S.pageTitle}>Profile</h1>
              <button
                style={{ ...S.editBtn, ...(showForm ? S.editBtnCancel : {}) }}
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            <div style={S.contentGrid}>
              {/* Profile Card */}
              <div style={S.card}>
                <div style={S.avatarWrapper}>
                  {user?.user_info?.profile_image ? (
                    user.user_info.signup_platform === 'manual' ? (
                      <img style={S.avatar} src={`${process.env.REACT_APP_IMG_URL}/${user.user_info.profile_image}`} alt="Profile" />
                    ) : (
                      <img style={S.avatar} src={user.user_info.profile_image} alt="Profile" />
                    )
                  ) : (
                    <DummyImage username={user.username} width='100' height='100' />
                  )}
                  <div style={S.avatarEdit} onClick={handleAvatarClick} title="Change photo">
                    📷
                  </div>
                  <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
                  {imgLoading && <Loader />}
                </div>

                <div style={S.profileName}>{userData.username}</div>

                {!showForm ? (
                  <div>
                    <div style={S.infoGroup}>
                      <span style={S.infoLabel}>Name</span>
                      <span style={S.infoValue}>{userData.username}</span>
                    </div>
                    <div style={S.infoGroup}>
                      <span style={S.infoLabel}>Email</span>
                      <span style={S.infoValue}>{userData.email}</span>
                    </div>
                    <div style={S.infoGroup}>
                      <span style={S.infoLabel}>Mobile Number</span>
                      <span style={S.infoValue}>{userData.user_info?.phone_number ?? '—'}</span>
                    </div>
                    <div style={S.infoGroup}>
                      <span style={S.infoLabel}>Date of Birth</span>
                      <span style={S.infoValue}>{userData.user_info?.dob ?? '—'}</span>
                    </div>
                    <div style={S.infoGroup}>
                      <span style={S.infoLabel}>Gender</span>
                      <span style={{ ...S.infoValue, textTransform: "capitalize" }}>{userData.user_info?.gender ?? '—'}</span>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div style={S.formGrid}>
                      <label style={S.formLabel}>Name</label>
                      <input style={S.formInput} type="text" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div style={S.formGrid}>
                      <label style={S.formLabel}>Email</label>
                      <input style={{ ...S.formInput, background: "#f5f4f0", cursor: "not-allowed" }} type="email" value={userData.email} disabled />
                    </div>
                    <div style={S.formGrid}>
                      <label style={S.formLabel}>Mobile Number</label>
                      <input style={S.formInput} type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} maxLength="15" />
                    </div>
                    <div style={S.formGrid}>
                      <label style={S.formLabel}>Date of Birth</label>
                      <input style={S.formInput} type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} max={new Date().toISOString().split("T")[0]} />
                    </div>
                    <div style={S.formGrid}>
                      <label style={S.formLabel}>Gender</label>
                      <select style={S.formInput} name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <button type="submit" style={S.submitBtn}>Save Changes</button>
                  </form>
                )}
              </div>

              {/* Address Card */}
              <div style={S.card}>
                <h2 style={{ ...S.pageTitle, fontSize: "16px", marginBottom: "16px" }}>My Addresses</h2>
                <div style={S.addressList}>
                  <div
                    style={{ ...S.addressCard, ...(userData.user_info?.home_address ? {} : { borderStyle: "dashed", color: "#aaa" }) }}
                    onClick={() => openAddressModal('home')}
                  >
                    <div style={S.addressIcon}>🏠</div>
                    <div style={S.addressContent}>
                      <div style={S.addressType}>Home</div>
                      <div style={{ ...S.addressValue, ...(userData.user_info?.home_address ? {} : { fontStyle: "italic", color: "#aaa" }) }}>
                        {userData.user_info?.home_address || 'Add a home address'}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{ ...S.addressCard, ...(userData.user_info?.work_address ? {} : { borderStyle: "dashed", color: "#aaa" }) }}
                    onClick={() => openAddressModal('work')}
                  >
                    <div style={S.addressIcon}>💼</div>
                    <div style={S.addressContent}>
                      <div style={S.addressType}>Work</div>
                      <div style={{ ...S.addressValue, ...(userData.user_info?.work_address ? {} : { fontStyle: "italic", color: "#aaa" }) }}>
                        {userData.user_info?.work_address || 'Add a work address'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Address Modal */}
          {showAddressModal && (
            <div style={S.modalOverlay} onClick={() => setShowAddressModal(false)}>
              <div style={S.modal} onClick={(e) => e.stopPropagation()}>
                <h2 style={S.modalTitle}>Add <span style={{ textTransform: "capitalize" }}>{addressType}</span> Address</h2>
                <form onSubmit={handleSubmitAddressForm}>
                  <input
                    style={S.modalInput}
                    type="text"
                    placeholder="Enter your address"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                  <div style={S.modalActions}>
                    <button
                      type="button"
                      style={{ ...S.modalBtn, ...S.modalBtnSecondary }}
                      onClick={() => setShowAddressModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      style={{ ...S.modalBtn, ...S.modalBtnPrimary }}
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}

export default ProfilePage;