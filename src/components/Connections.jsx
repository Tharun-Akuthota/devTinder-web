import axios from "axios";
import BASE_URL from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections); // getting data from the store
  const dispatch = useDispatch(); // dispatching actions to the store

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections || connections.length === 0) {
    return <h2 className="flex justify-center my-10">No connections</h2>;
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, about, age, gender, photoUrl } =
          connection;

        return (
          <div
            className="flex m-4 p-4 bg-base-200 rounded-lg w-1/2 mx-auto"
            key={_id}
          >
            <div>
              <img
                src={photoUrl}
                className="w-20 h-30 rounded-full"
                alt="user photo"
              />
            </div>
            <div className=" text-left ml-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
