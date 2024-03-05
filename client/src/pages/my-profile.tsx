import { useGetIdentity, useList  } from "@refinedev/core";

import { Profile } from "../components";
import { ProfileProps, PropertyProps } from '../interfaces/common';



const MyProfile = () => {
  const {data:user}= useGetIdentity();
  const userId = (user as any)?.userid;
  const {data, isLoading, isError}= useList({
    resource: "users",
  });
  const dataArray = data ? Object.values(data)[0] : [];
  console.log(dataArray);

  const myProfile: ProfileProps | [] = dataArray.find((item:PropertyProps) => item._id === userId);
  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error..</div>

  return(
    <Profile


          type="My"
            name={myProfile.name}
            email={myProfile.email}
            avatar={myProfile.avatar}
            //properties={myProfile.allProperties}
    />
   
  )
  
    
};


export default MyProfile;