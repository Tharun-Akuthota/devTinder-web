import axios from "axios";
import BASE_URL from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests); // getting data from the store
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id)); // dispatching the action to remove the data from the store
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data?.connectionRequests)); // dispatching the action to add the data to the store
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  console.log(requests);

  // if (!requests || requests.length === 0) {
  //   return <h2>No requests</h2>;
  // }
  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="flex justify-center my-10"> No Requests Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Requests Received</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, about, age, gender, photoUrl } =
          request.fromUserId;

        return (
          <div
            className="flex justify-between items-center m-4 p-4 bg-base-200 rounded-lg w-1/3 mx-auto"
            key={_id}
          >
            <div>
              <img
                src={photoUrl}
                className="w-20 h-30 rounded-full"
                alt="user photo"
              />
            </div>

            <div className=" text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>

            <div className="flex justify-center items-center">
              <button
                className="btn btn-success mx-2"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
              <button
                className="btn btn-error mx-2"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
