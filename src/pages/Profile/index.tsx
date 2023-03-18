import { Fragment, FunctionComponent } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { API_DEFAULT_PARAMS, instanceAxios } from "../../services/Axios";
import { IUsers } from "src/interfaces/IUser";

import * as globals from "../../styles/styledGlobal";
import ProfileCard from "src/components/ProfileCard";

const Profile: FunctionComponent = () => {
  const { login } = useParams();

  const { data, isFetching } = useQuery<IUsers>("profile", async () => {
    const { data } = await instanceAxios.get(`users/${login}`, {
      params: { ...API_DEFAULT_PARAMS },
    });
    return data;
  });

  return (
    <section>
      {!isFetching ? (
        <ProfileCard
          avatar_url={data?.avatar_url}
          login={data?.login}
          name={data?.name}
          bio={data?.bio} />
      ) : <p>Loading...</p>}
      <Link to={"/"} className="flex flex-col m-4">
        <button className={globals.Button}>Back</button>
      </Link>
    </section>
  );
};

export default Profile;
