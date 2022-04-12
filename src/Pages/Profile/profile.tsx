import { Fragment, FunctionComponent } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { instanceAxios } from "../../Services/axios";
import { Button, Card, ProfileImg } from "../../Styles/StyledComponents/styledGlobal";
import Repos from "../Repos/repos";
import Starred from "../Starred/starred";
import { TitleText } from "./style";

type User = {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
};

const Profile: FunctionComponent = () => {
  const { login } = useParams();

  const { data, isFetching } = useQuery<User>("profile", async () => {
    const { data } = await instanceAxios.get(`/users/${login}`);
    return data;
  });

  return (
    <Fragment>
      {isFetching && <p>Loading...</p>}
      {!isFetching && (
        <Fragment>
          <Card>
            <ProfileImg
              src={data?.avatar_url}
            />
            <div className="grow">
              <h3>{data?.login}</h3>
              <h4 className="mt-1 text-gray-400">{data?.name}</h4>
              <p className="mt-4">{data?.bio}</p>
            </div>
            <div>
              <a target={"_blank"} href={`https://github.com/${data?.login}`}>
                <Button>Github</Button>
              </a>
            </div>
          </Card>
          <TitleText>Repositories</TitleText>
          <Repos userId={data?.login || ""} />
          <TitleText>Starred</TitleText>
          <Starred userId={data?.login || ""} />
        </Fragment>
      )}
      <Link to={'/'} className="flex flex-col m-4">
        <Button>Back</Button>
      </Link>
    </Fragment>
  );
};

export default Profile;
