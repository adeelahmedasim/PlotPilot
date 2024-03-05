
import { useGetIdentity, useList } from "@refinedev/core";

import { Profile } from "../components";
import { PropertyProps } from '../interfaces/common';

export interface ProfileProps {
  type: string;
  name: string;
  avatar: string;
  email: string;
  //properties: Array<any> | undefined; // Uncomment and correct this if needed
}

const MyProfile = () => {
  const { data: user } = useGetIdentity();
  const userId = (user as any)?.userid;
  const { data, isLoading, isError } = useList({
    resource: "users",
  });
  const dataArray = data ? Object.values(data)[0] : [];
  console.log(dataArray);

  const myProfile = dataArray.find((item: PropertyProps) => item._id === userId) as ProfileProps | undefined;
  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error..</div>;
  if (!myProfile) return <div>Profile not found</div>; // Ensure myProfile is not undefined

  return (
    <Profile
      type="My"
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
      //properties={myProfile.allProperties}
      />
  );
};

export default MyProfile;