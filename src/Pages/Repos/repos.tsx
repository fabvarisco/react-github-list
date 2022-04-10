import { Fragment, FunctionComponent } from "react";
import { useQuery } from "react-query";
import { instanceAxios } from "../../Services/axios";

type Props = {
  userId: string;
};

type Repositories = {
  name: string;
};

const Repos: FunctionComponent<any> = ({ userId }) => {
  const { data, isFetching } = useQuery<Repositories[]>("repos", async () => {
    const { data } = await instanceAxios.get(`/users/${userId}/repos`);
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
