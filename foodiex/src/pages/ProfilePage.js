import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { fetchOneUser, updateUser, getRecipesByUser } from "../api/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
  const [user, setUser] = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const fileInputRef = React.createRef();

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const profileData = await fetchOneUser();
          console.log("profile data", profileData);
          setProfile(profileData);
          const userRecipes = await getRecipesByUser(profileData._id);
          console.log("recipes", userRecipes);
          setRecipes(userRecipes);
        } catch (error) {
          console.error("Failed to fetch profile or recipes", error);
        }
      }
    };
    fetchProfile();
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleClear = () => {
    setProfileImage(null);
    setPreviewImage(null);
    fileInputRef.current.value = null;
  };

  const handleSave = () => {
    if (profileImage) {
      const formData = new FormData();
      formData.append("image", profileImage);
      updateUser(formData)
        .then((updatedUser) => {
          setProfile((prevProfile) => ({
            ...prevProfile,
            image: updatedUser.image,
          }));
          handleClear();
          toast.success("Profile updated successfully");
        })
        .catch(() => {
          toast.error("Failed to update profile");
        });
    }
  };

  return (
    <div className="min-h-screen bg-[#252526] text-white font-serif">
      <main className="flex flex-col items-center p-6 w-full">
        <div className="w-full max-w-3xl">
          <div className="flex flex-col items-center">
            <div className="w-full flex flex-col items-center mb-6">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Profile Preview"
                  className="w-48 h-48 rounded-full mb-4"
                />
              ) : profile.image ? (
                <img
                  src={`http://localhost:8000/${profile.image}`}
                  alt="Profile"
                  className="w-48 h-48 rounded-full mb-4"
                />
              ) : (
                <div className="w-48 h-48 rounded-full mb-4 bg-gray-300" />
              )}
              <h2 className="text-2xl mb-2">{profile.username}</h2>
              <div className="mt-4 flex flex-col items-center">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Upload Profile Picture
                </label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100"
                />
              </div>
              <div className="mt-4 flex justify-between w-full max-w-sm">
                <button
                  onClick={handleSave}
                  className={`w-full py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none mr-2 ${
                    !previewImage ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={!previewImage}
                >
                  Save
                </button>
                {previewImage && (
                  <button
                    onClick={handleClear}
                    className="w-full py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none ml-2"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
            <div className="w-full mt-6">
              <h3 className="text-2xl font-bold mb-4">My Recipes</h3>
              <div className="flex flex-wrap justify-center gap-6">
                {recipes.length > 0 ? (
                  recipes.map((recipe) => (
                    <div>
                      <div
                        key={recipe._id}
                        className="bg-white text-black p-4 rounded-lg shadow-md w-60 h-60"
                      >
                        <img
                          src={`http://localhost:8000/${recipe.image}`}
                          alt={recipe.title}
                          className="w-full h-full rounded-lg object-cover mb-5"
                        />
                      </div>
                      <p className="text-lg font-medium text-center mt-3">
                        {recipe.title}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-lg text-center text-gray-400">
                    No recipes found
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default ProfilePage;
