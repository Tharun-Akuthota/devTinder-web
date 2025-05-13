import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(user.skills || []);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about, skills },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.error("PATCH REQUEST FAILED", err.response?.data || err.message);
      setError(
        err.response?.data?.message || err.message || "Something went wrong"
      );
    }
  };

  return (
    <>
      <div className="flex justify-center items-center gap-40">
        <div className="flex justify-center items-center h-screen">
          <div className="card bg-gray-300 text-primary-content w-96">
            <div className="card-body">
              <h2 className="card-title bold text-black justify-center">
                Edit Profile
              </h2>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">First Name</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  value={firstName}
                  className="bg-white input input-bordered w-full max-w-xs"
                  onChange={(e) => setFirstName(e.target.value)} // binding the state variable to the UI and updating the state variable
                  required
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Last Name</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  value={lastName}
                  className="bg-white input input-bordered w-full max-w-xs"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Photo URL</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  value={photoUrl}
                  className="bg-white input input-bordered w-full max-w-xs"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Age</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  value={age}
                  className="bg-white input input-bordered w-full max-w-xs"
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Gender</span>
                </div>
                <select
                  className="bg-white select select-bordered w-full max-w-xs"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">About</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  value={about}
                  className="bg-white input input-bordered w-full max-w-xs"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Skills</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  value={Array.isArray(skills) ? skills.join(", ") : skills}
                  className="bg-white input input-bordered w-full max-w-xs"
                  onChange={(e) =>
                    setSkills(
                      e.target.value.split(",").map((skill) => skill.trim())
                    )
                  }
                />
              </label>

              {error && (
                <div className="alert alert-error shadow-lg mt-4">
                  <div>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              <div className="card-actions justify-end">
                <button
                  className="btn hover:bg-gray-800 "
                  onClick={saveProfile}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>

        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about, skills }}
        />
      </div>

      {showToast && (
        <div className="toast toast-top toast-center m-4">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
