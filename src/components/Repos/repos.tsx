import axios from "axios";
import { Fragment, FunctionComponent } from "react";
import { useQuery } from "react-query";

type Props = {
  userId: string;
};

type Repositories = {
  name: string;
};

const Repos: FunctionComponent<any> = ({ userId }) => {
  const { data, isFetching } = useQuery<Repositories[]>("repos", async () => {
    const { data } = await axios.get(`https://api.github.com/users/${userId}/repos`, {params: {client_id: "920f6793d5ee86fd2741" }});
    console.log(data);
    return data;
  });

  return (
    <Fragment>
      {!isFetching && (
        <Fragment>
          <div className="card">
            {data?.map(({ name }: Repositories, index:number ) => (
              <div key={index}>{name}</div>
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Repos;
