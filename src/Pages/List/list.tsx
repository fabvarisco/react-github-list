import { FunctionComponent, useEffect, useRef, useState } from "react";
import {
  TextField,
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
  Pagination
} from "./style";
import { useQuery } from "react-query";
import { API_DEFAULT_PARAMS, instanceAxios } from "../../Services/axios";
import { DotsIcon } from "../../Icons/iconList";
import { Link } from "react-router-dom";
import Modal from "../../Components/Modal/modal";
import Repos from "../Repos/repos";
import Starred from "../Starred/starred";
import {
  Button,
  Card,
  ProfileImg,
} from "../../Styles/StyledComponents/styledGlobal";
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
  const [userId, setUserId] = useState<string>("");
  const [pageId, setPageId] = useState<number>(13788355);

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [dropdown, setDropdown] = useState<boolean[]>([]);

  const modalStarredRef = useRef<any>(null);
  const modalReposRef = useRef<any>(null);

  const handleOpenModalRepos = (user: string) => {
    setUserId(user);
    modalReposRef.current?.handleOpenModal();
  };

  const handleOpenModalStarred = (user: string) => {
    setUserId(user);
    modalStarredRef.current?.handleOpenModal();
  };

  const fetchUsers = async () => {
    const { data } = await instanceAxios.get("/users", {
      params: {
        ...API_DEFAULT_PARAMS,
        per_page: 30,
        since: pageId,
      },
    });
    return data;
  };

  const { isFetching, refetch } = useQuery<Users[]>("users", fetchUsers, {
    onSuccess: (data) => {
      setUsers(data);
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [pageId]);

  const next = () => {
    setPageId((prev) => prev + 30);
  };
  const back = () => {
    const temp = pageId - 30;
    if (temp < 0) {
      setPageId(0);
    } else {
      setPageId(temp);
    }
  };

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
      <Pagination>
        <Button onClick={() => back()}>Back</Button>
        <input
          value={pageId}
          type="number"
          min="0"
          onChange={(e: any) => {
            setPageId(e.target.valueAsNumber);
          }}
        />
        <Button onClick={() => next()}>Next</Button>
      </Pagination>
      <div className="">
        {isFetching && <p>Loading...</p>}
        {errorMessage !== "" && <p>{errorMessage}</p>}
        {users?.map(({ avatar_url, login, html_url, id }: Users) => (
          <div key={id}>
            <Card>
              <IconCol>
                <ProfileImg src={avatar_url} />
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
                <Button onClick={() => handleOpenModalRepos(login)}>
                  repos
                </Button>
                <Button onClick={() => handleOpenModalStarred(login)}>
                  starred
                </Button>
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
                          <DropdownButton
                            onClick={() => handleOpenModalRepos(login)}
                          >
                            Repos
                          </DropdownButton>
                        </li>
                        <li>
                          <DropdownButton
                            onClick={() => handleOpenModalStarred(login)}
                          >
                            Starred
                          </DropdownButton>
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
        <Modal ref={modalStarredRef} name={"Starred"}>
          <Starred userId={userId} />
        </Modal>
        <Modal ref={modalReposRef} name={"Repos"}>
          <Repos userId={userId} />
        </Modal>
      </div>
    </div>
  );
};
export default List;
