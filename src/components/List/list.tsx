import { FunctionComponent, useState } from "react";
import { Button, Icon, TextField, Card } from "./style";
import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";

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
    const { data } = await axios.get(" https://api.github.com/users", {
      params: {
        per_page: 30,
        since: 13788355,
        client_id: "920f6793d5ee86fd2741",
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
            <Link to={`/${login}`}>
              <Card>
                <Icon src={avatar_url} />
                <div >
                  <h3>{login}</h3>
                  <p className="mt-2">{html_url}</p>
                </div>
                <div className="self-center	">
                  <Button>repos</Button>
                  <Button>starred</Button>
                </div>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default List;
