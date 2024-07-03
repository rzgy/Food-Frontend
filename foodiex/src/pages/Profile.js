import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { myProfile, upDateProfile } from "../api/auth";

const Profile = () => {
  const [image, setImage] = useState();
  const queryClient = useQueryClient();
  const [userInfo, setUserInfo] = useState({});

  const { data: user } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => myProfile(),
  });

  const { mutate } = useMutation({
    mutationKey: ["updateprofile"],
    mutationFn: () => upDateProfile(image),
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
    },
  });

  const handleChange = (e) => {
    setImage(e.target.files[0]);
    // if (e.target.name === "image") {
    //   setUserInfo({ ...userInfo, [e.target.name]: e.target.files[0] });
    // } else {
    //   setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    // }
  };

  const handleFormSubmit = async (e) => {
    console.log(userInfo);
    e.preventDefault();
    mutate();
  };

  return (
    <div className="bg-slate-800 w-full h-[100vh]  font-bold">
      <div>
        <h1 className="text-3xl font-bold p-4">My Profile</h1>
        <div className="  w-full h-[80vh]  flex justify-center items-center gap-12 p-4">
          <div className=" w-[90%] h-[80%]  lg:h-[480px]  rounded-3xl p-4 wrap flex flex-col justify-center items-center text-center gap-6 ">
            <div className="text-3xl font-bold flex gap-4 justify-start items-center">
              <img
                src={`http://localhost:8000/${user?.image}`}
                alt="userimage"
                className="w-[300px] h-[300px] rounded-full mr-2"
              />

              <div>
                <label
                  htmlFor="image"
                  className="block text-black text-sm font-medium mb-2"
                >
                  UpLoad a Profile Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                  required
                />
              </div>
            </div>

            <p className="text-xl">{user?.username}</p>

            <button
              onClick={handleFormSubmit}
              className=" hover:bg-green-700  hover:text-white font-bold py-2 px-4 rounded text-md font-bold sm:text-sm"
            >
              save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
