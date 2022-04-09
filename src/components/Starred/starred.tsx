import { Fragment, FunctionComponent } from "react";
import { useQuery } from "react-query";
import { instanceAxios } from "../../services/axios";

type Props = {
    userId:string
}

type Starreds = {
    name:string;
}

const Starred: FunctionComponent<any> = ({userId}) => {

  const { data, isFetching } = useQuery<Starreds[]>("starred", async () => {
    const { data } = await instanceAxios.get(`/users/${userId}/starred`);
    return data;
  });

  return (
    <Fragment>
      {!isFetching && (
        <Fragment>
          <div className="card">
          {data?.map(({ name }: Starreds, index:number ) => (
              <div key={index}>{name}</div>
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Starred;
