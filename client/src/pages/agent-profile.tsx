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
//  console.log(dataArray);

  const myProfile: ProfileProps | [] = dataArray.find((item:PropertyProps) => item._id === userId);

    if (isLoading) return <div>loading...</div>;
    if (isError) return <div>error...</div>;

    return (
        <Profile
            type="Agent"
            name={myProfile.name}
            email={myProfile.email}
            avatar={myProfile.avatar}
            //properties={myProfile.allProperties}
        />
    );
};

export default AgentProfile;