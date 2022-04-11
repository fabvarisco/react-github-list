import { FunctionComponent, useState } from "react";
import {
  Button,
  Icon,
  TextField,
  Card,
  SearchButton,
  SearchContainer,
  IconCol,
  ButtonCol,
  InfoCol,
  LoginText,
  DotsCol,
  DropdownButton,
  Dropdown,
  DotsButton,
} from "./style";
import { useQuery } from "react-query";
import { instanceAxios } from "../../Services/axios";
import { DotsIcon } from "../../Icons/iconList";
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
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<Users[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [dropdown, setDropdown] = useState<boolean[]>([]);

  const { data, isFetching, isError, error } = useQuery<Users[]>(
    "users",
    async () => {
      const { data } = await instanceAxios.get("/users", {
        params: {
          per_page: 30,
          since: 13788355,
        },
      });
      setUsers(data);
      return data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const searchUser = () => {
    instanceAxios
      .get(`/users/${search}`)
      .then(({ data }) => {
        setErrorMessage("");
        setUsers([data]);
      })
      .catch((error) => {
        error.response.status === 404
          ? setErrorMessage("User Not Found!")
          : setErrorMessage(error.message);
      });
  };

  return (
    <div>
      <SearchContainer>
        <TextField
          id="username"
          type="text"
          placeholder="Search Github Username"
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchButton onClick={() => searchUser()}>Search</SearchButton>
      </SearchContainer>

      <div className="">
        {isFetching && <p>Loading...</p>}
        {errorMessage !== "" && <p>{errorMessage}</p>}
        {users?.map(({ avatar_url, login, html_url, id }: Users) => (
          <div key={id}>
            <Card>
              <IconCol>
                <Icon src={avatar_url} />
              </IconCol>
              <InfoCol>
                <LoginText>{login}</LoginText>
                <a
                  href={`https://github.com/${login}`}
                  target="_blank"
                  className="underline"
                >
                  {html_url}
                </a>
              </InfoCol>
              <ButtonCol>
                <Button>repos</Button>
                <Button>starred</Button>
                <Link to={`/${login}`}>
                  <Button>Details</Button>
                </Link>
              </ButtonCol>
              <DotsCol>
                <DotsButton id={`button_${id}`}>
                  <button onClick={() => setDropdown(dropdown)}>
                    <DotsIcon />
                  </button>
                  {dropdown && (
                    <Dropdown id={`item_${id}`} className="">
                      <ul>
                        <li>
                          <DropdownButton>Repos</DropdownButton>
                        </li>
                        <li>
                          <DropdownButton>Starred</DropdownButton>
                        </li>
                        <li>
                          <Link to={`/${login}`}>
                            <DropdownButton>Details</DropdownButton>
                          </Link>
                        </li>
                      </ul>
                    </Dropdown>
                  )}
                </DotsButton>
              </DotsCol>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
export default List;
