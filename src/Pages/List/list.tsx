import { FunctionComponent, useState } from "react";
import {
  Button,
  Icon,
  TextField,
  Card,
  SearchButton,
  DotsButton,
} from "./style";
import { useQuery } from "react-query";
import { instanceAxios } from "../../Services/axios";
import { DotsIcon } from "../../Icons/iconList";
type Props = {};
import "../../Styles/globals.css";
type Users = {
  html_url: string;
  avatar_url: string;
  login: string;
  name: string;
  bio: string;
  id: number;
};

const List: FunctionComponent<Props> = () => {
  const [search, setSearch] = useState<string>("");
  const [dropdown, setDropdown] = useState<boolean[]>([]);

  const { data, isFetching } = useQuery<Users[]>("users", async () => {
    const { data } = await instanceAxios.get("/users", {
      params: {
        per_page: 30,
        since: 13788355,
      },
    });
    return data;
  });

  return (
    <div>
      <div className="container flex mx-auto">
        <TextField
          id="username"
          type="text"
          placeholder="Search Github Username"
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchButton className="flex items-center justify-center px-4 border">
          Search
        </SearchButton>
      </div>

      <div className="">
        {isFetching && <p>Loading...</p>}
        {data?.map(({ avatar_url, login, html_url, id }: Users) => (
          <div key={id}>
            <Card className="flex flex-row">
              <div className="flex-none">
                <Icon src={avatar_url} />
              </div>
              <div className="grow">
                <h3 className="mb-2">{login}</h3>
                <a
                  href={`https://github.com/${login}`}
                  target="_blank"
                  className="underline"
                >
                  {html_url}
                </a>
              </div>
              <div className="flex-none  self-center hidden sm:block ">
                <Button>repos</Button>
                <Button>starred</Button>
              </div>
              <div className="flex-none self-center sm:hidden ">
                <div
                  className="activeButton -mt-10 -ml-8 absolute"
                  id={`button_${id}`}
                >
                  <button onClick={() => setDropdown(dropdown)}>
                    <DotsIcon />
                  </button>
                  {dropdown && (
                    <div
                      id={`item_${id}`}
                      className="item absolute -ml-8 border"
                    >
                      <ul>
                        <li>
                          <button>Repos</button>
                        </li>
                        <li>
                          <button>Starred</button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
export default List;
