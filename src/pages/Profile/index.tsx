import ProfileCard from "@components/ProfileCard";
import { IUsers } from "@interfaces/IUser";
import { FunctionComponent } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { API_DEFAULT_PARAMS, instanceAxios } from "@services/Axios";
import * as globals from "@styles/styledGlobal";


const Profile: FunctionComponent = () => {
  const { login } = useParams();

  const { data, isFetching } = useQuery<IUsers>("profile", async () => {
    const { data } = await instanceAxios.get(`users/${login}`, {
      params: { ...API_DEFAULT_PARAMS },
    });
    return data;
  });

  if (!isFetching) return <p>Loading...</p>;

  return (
    <section>
      {data ? (
        <ProfileCard {...data} />
      ) : null}
      <Link to={"/"} className="flex flex-col m-4">
        <button className={globals.Button}>Back</button>
      </Link>
    </section>
  );
};

export default Profile;
