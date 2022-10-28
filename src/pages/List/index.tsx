import { FunctionComponent, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { API_DEFAULT_PARAMS, instanceAxios } from "../../services/Axios";
import { DotsIcon } from "../../icons";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";
import Repos from "../Repos";
import Starred from "../Starred";
import * as globals from "../../styles/styledGlobal";
import * as style from "./style";
import { AxiosResponse } from "axios";

interface Users {
  html_url: string;
  avatar_url: string;
  login: string;
  name: string;
  bio: string;
  id: number;
};

const List: FunctionComponent = () => {
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
    const { data } = await instanceAxios.get("users", {
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
      .get(`users/${search}`)
      .then(({data}:AxiosResponse<Users>) => {
        setErrorMessage("");
        setUsers([data]);
      })
      .catch((error: Error) => setErrorMessage(error.message));
  };

  return (
    <section>
      <div className="container flex mx-auto">
        <input
          className={style.TextField}
          id="username"
          type="text"
          placeholder="Search Github Username"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className={style.SearchButton} onClick={() => searchUser()}>Search</button>
      </div>
      <div className="flex justify-center m-8">
        <button className={globals.Button} onClick={() => back()}>Back</button>
        <input
          value={pageId}
          type="number"
          min="0"
          onChange={(e) => {
            setPageId(e.target.valueAsNumber);
          }}
        />
        <button className={globals.Button} onClick={() => next()}>Next</button>
      </div>
      <div className="">
        {isFetching && <p>Loading...</p>}
        {errorMessage !== "" && <p>{errorMessage}</p>}
        {users?.map(({ avatar_url, login, html_url, id }: Users) => (
          <div key={id}>
            <div className={globals.Card}>
              <div className={style.IconCol}>
                <img className={globals.ProfileImg} src={avatar_url} />
              </div>
              <div className={style.InfoCol} >
                <h3 className={style.LoginText}>{login}</h3>
                <a
                  href={`https://github.com/${login}`}
                  target="_blank"
                  className="underline"
                >
                  {html_url}
                </a>
              </div >
              <div className={style.ButtonCol}>
                <button className={globals.Button} onClick={() => handleOpenModalRepos(login)}>
                  repos
                </button>
                <button className={globals.Button} onClick={() => handleOpenModalStarred(login)}>
                  starred
                </button  >
                <Link to={`/${login}`}>
                  <button className={globals.Button} >Details</button>
                </Link>
              </div>
              <div className={style.DotsCol}>
                <div className={style.DotsButton} id={`button_${id}`}>
                  <button onClick={() => setDropdown(dropdown)}>
                    <DotsIcon />
                  </button>
                  {dropdown && (
                    <div className={style.Dropdown} id={`item_${id}`} >
                      <ul>
                        <li>
                          <div className={style.DropdownButton}
                            onClick={() => handleOpenModalRepos(login)}
                          >
                            Repos
                          </div>
                        </li>
                        <li>
                          <div className={style.DropdownButton}
                            onClick={() => handleOpenModalStarred(login)}
                          >
                            Starred
                          </div>
                        </li>
                        <li>
                          <Link to={`/${login}`}>
                            <div className={style.DropdownButton}>Details</div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        <Modal ref={modalStarredRef} name={"Starred"}>
          <Starred userId={userId} />
        </Modal>
        <Modal ref={modalReposRef} name={"Repos"}>
          <Repos userId={userId} />
        </Modal>
      </div>
    </section>
  );
};
export default List;
