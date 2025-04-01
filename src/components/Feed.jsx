import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";

const Feed = () => {
  const feed = useSelector((store) => store.feed); // useSelector is a hook that allows you to extract data from the Redux store state, using a selector function.
  const dispatch = useDispatch(); // useDispatch is a hook that returns a reference to the dispatch function from the Redux store.

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res?.data?.data)); // here dispatch is used to dispatch an action to the Redux store.
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;

  if (feed.length <= 0) {
    return <p className="flex justify-center my-10">No users to show</p>;
  }
  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
