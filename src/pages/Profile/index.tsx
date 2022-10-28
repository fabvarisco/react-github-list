import { Fragment, FunctionComponent } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { API_DEFAULT_PARAMS, instanceAxios } from "../../services/Axios";
import Repos from "../../components/Repos";
import Starred from "../../components/Starred";
import * as style from "./style";
import * as globals from "../../styles/styledGlobal";

interface User {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
};

const Profile: FunctionComponent = () => {
  const { login } = useParams();

  const { data, isFetching } = useQuery<User>("profile", async () => {
    const { data } = await instanceAxios.get(`users/${login}`, {
      params: { ...API_DEFAULT_PARAMS },
    });
    return data;
  });

  return (
    <Fragment>
      {!isFetching ? (
        <Fragment>
          <div className={globals.Card}>
            <img className={globals.ProfileImg} src={data?.avatar_url} />
            <div className="grow">
              <h3>{data?.login}</h3>
              <h4 className="mt-1 text-gray-400">{data?.name}</h4>
              <p className="mt-4">{data?.bio}</p>
            </div>
            <div>
              <a target={"_blank"} href={`https://github.com/${data?.login}`}>
                <button className={globals.Button}>Github</button>
              </a>
            </div>
          </div>
          <h3 className={style.TitleText}>Repositories</h3>
          <Repos userId={data?.login || ""} />
          <h3 className={style.TitleText}>Starred</h3>
          <Starred userId={data?.login || ""} />
        </Fragment>
      ) : <p>Loading...</p>}
      <Link to={"/"} className="flex flex-col m-4">
        <button className={globals.Button}>Back</button>
      </Link>
    </Fragment>
  );
};

export default Profile;
