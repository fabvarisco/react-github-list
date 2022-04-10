import { FunctionComponent, useState } from "react";
import { Button, Icon, TextField, Card } from "./style";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { instanceAxios } from "../../Services/axios";

type Props = {};

type Users = {
  html_url: string;
  avatar_url: string;
  login: string;
  name: string;
  bio: string;
  id: number;
};

const List: FunctionComponent<Props> = () => {
  const { data, isFetching } = useQuery<Users[]>("users", async () => {
    const { data } = await instanceAxios.get("/users", {
      params: {
        per_page: 30,
        since: 13788355,
      },
    });
    return data;
  });
  const [search, setSearch] = useState<string>("");
  return (
    <div>
      <div className="container flex mx-auto">
        <TextField
          id="username"
          type="text"
          placeholder="Search Github Username"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="flex items-center justify-center px-4 border">
          Search
        </button>
      </div>

      <div className="">
        {isFetching && <p>Loading...</p>}
        {data?.map(({ avatar_url, login, html_url, id }: Users) => (
          <div key={id}>
            <Card className="grid grid-cols-4 gap-4">
              <div className="col-end-1 col-span-1">
                <Icon src={avatar_url} />
              </div>
              <div className="col-start-1 col-span-2">
                <h3 className="mb-2">{login}</h3>
                <a
                  href={`https://github.com/${login}`}
                  target="_blank"
                  className="underline"
                >
                  {html_url}
                </a>
              </div >
              <div className="self-center col-start-4 col-span-2">
                <Button>repos</Button>
                <Button>starred</Button>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
export default List;
