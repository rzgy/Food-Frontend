import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { myProfile, upDateProfile } from "../api/auth";

const Profile = () => {
  const queryClient = useQueryClient();
  const [userInfo, setUserInfo] = useState({});
  const { data: user } = useQuery({
    queryKey: ["profile"],
    queryFn: () => myProfile(),
  });
  console.log(userInfo);

  useEffect(() => {
    setUserInfo(user);
  }, [user]);

  const { mutate } = useMutation({
    mutationKey: ["updateprofile"],
    mutationFn: (updatedInfo) => upDateProfile(updatedInfo),
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
    },
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.files[0] });
    } else {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // Object.keys(userInfo).forEach((key) => {
    //   formData.append(key, userInfo[key]);
    // });
    // mutate(formData);
    mutate(userInfo);
  };

  return (
    <div className="bg-slate-800 w-full h-[100vh] font-bold">
      <div className="w-full h-[100vh] p-[20px]">
        <h1 className="text-3xl font-bold p-4 text-white">My Profile</h1>
        <div className="bg-gray-500 w-full h-[80vh] flex justify-start items-start gap-12 p-4 border-2 rounded-3xl border-gray-700">
          <h1 className="text-3xl font-bold text-white">{user?.username}</h1>
          <div className="w-[90%] h-[80%] lg:h-[480px] rounded-3xl p-4 wrap flex flex-col justify-center items-start text-center gap-6">
            <div className="text-3xl font-bold flex gap-4 justify-start items-center">
              <label className="block text-sm font-medium leading-6 text-white">
                Profile image
              </label>
              <img
                src={`http://localhost:8000/${user?.image}`}
                alt="userimage"
                className="w-[70px] h-[70px] rounded-full mr-2"
              />
              <div>
                <label
                  htmlFor="image"
                  className="block text-black text-sm font-medium mb-2"
                >
                  Upload a Profile Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>
            <div className="w-full flex justify-start gap-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-white"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  defaultValue={user?.username}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <button
              onClick={handleFormSubmit}
              className="hover:bg-orange-500 hover:text-gray-300 font-bold py-2 px-4 rounded text-md font-bold sm:text-sm border-2 border-gray-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import React, { useState } from "react";
// import { myProfile, upDateProfile } from "../api/auth";

// const Profile = () => {
//   const [image, setImage] = useState();
//   const queryClient = useQueryClient();
//   const [userInfo, setUserInfo] = useState({});

//   const { data: user } = useQuery({
//     queryKey: ["profile"],
//     queryFn: async () => myProfile(),
//   });

//   const { mutate } = useMutation({
//     mutationKey: ["updateprofile"],
//     mutationFn: () => upDateProfile(image),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["profile"]);
//     },
//   });

//   const handleChange = (e) => {
//     // setImage(e.target.files[0]);
//     if (e.target.name === "image") {
//       setUserInfo({ ...userInfo, [e.target.name]: e.target.files[0] });
//     } else {
//       setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
//     }
//   };

//   const handleFormSubmit = async (e) => {
//     console.log(userInfo);
//     e.preventDefault();
//     mutate();
//   };

//   return (
//     <div className="bg-slate-800 w-full h-[100vh]  font-bold">
//       <div className=" w-full h-[100vh] p-[20px]">
//         <h1 className="text-3xl font-bold p-4 text-white">My Profile</h1>
//         <div className="bg-gray-500  w-full h-[80vh]  flex justify-start items-starrt gap-12 p-4 border-2 rounded-3xl border-gray-700">
//           <div className=" w-[90%] h-[80%]  lg:h-[480px]  rounded-3xl p-4 wrap flex flex-col justify-center items-start text-center gap-6 ">
//             <div className="text-3xl font-bold flex gap-4 justify-start items-center">
//               <label className="block text-sm font-medium leading-6 text-white">
//                 Profile image
//               </label>
//               <img
//                 src={`http://localhost:8000/${user?.image}`}
//                 alt="userimage"
//                 className="w-[70px] h-[70px] rounded-full mr-2"
//               />

//               <div>
//                 <label
//                   htmlFor="image"
//                   className="block text-black text-sm font-medium mb-2"
//                 >
//                   UpLoad a Profile Image
//                 </label>
//                 <input
//                   type="file"
//                   id="image"
//                   name="image"
//                   onChange={handleChange}
//                   className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="w-full flex justify-start gap-4">
//               <label
//                 htmlFor="Username"
//                 className="block text-sm font-medium leading-6 text-white"
//               >
//                 Username
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="username"
//                   name="username"
//                   type="username"
//                   autoComplete="username"
//                   value={user?.username}
//                   onChange={handleChange}
//                   required
//                   className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 />
//               </div>
//             </div>
//             <button
//               onClick={handleFormSubmit}
//               className=" hover:bg-orange-500  hover:text-gray-300 font-bold py-2 px-4 rounded text-md font-bold sm:text-sm border-2 border-gray-700"
//             >
//               save
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
