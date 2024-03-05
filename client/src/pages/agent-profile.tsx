import { useList, useGetIdentity } from "@refinedev/core";
import { useParams } from "react-router-dom";

import { ProfileProps, PropertyProps } from "../interfaces/common";

import { Profile } from "../components";

const AgentProfile = () => {
  const {data:user}= useGetIdentity();
  const userId = (user as any)?.userid;
  const {data, isLoading, isError}= useList({
    resource: "users",
  });
  
  const dataArray = data ? Object.values(data)[0] : [];
  // console.log(dataArray);

  const myProfile: ProfileProps | null = dataArray.find((item: PropertyProps) => item._id === userId) || null;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred</div>;
  if (!myProfile) return <div>Profile not found</div>;

  return (
    <Profile
      type="Agent"
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
    />
  );
};

export default AgentProfile;