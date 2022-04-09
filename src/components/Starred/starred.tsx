import axios from "axios";
import { Fragment, FunctionComponent } from "react";
import { useQuery } from "react-query";

type Props = {
    userId:string
}

type Starreds = {
    name:string;
}

const Starred: FunctionComponent<any> = ({userId}) => {

  const { data, isFetching } = useQuery<Starreds[]>("starred", async () => {
    const { data } = await axios.get(`https://api.github.com/users/${userId}/starred`, {params: {client_id: "920f6793d5ee86fd2741" }});
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
