import { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";
import { IUsers } from "@interfaces/IUser";
import * as globals from "@styles/styledGlobal";
import * as style from "./style";
import Card from "@components/Card";
import { API_DEFAULT_PARAMS, instanceAxios } from "@services/Axios";


const List: FunctionComponent = () => {
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<IUsers[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [pageId, setPageId] = useState<number>(13788355);

  const [errorMessage, setErrorMessage] = useState<string>("");

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

  const { isFetching, refetch } = useQuery<IUsers[]>("users", fetchUsers, {
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
      .then(({ data }: AxiosResponse<IUsers>) => {
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
      <div className="flex justify-center m-8 flex-wrap	">
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
      {errorMessage !== "" ? <p>{errorMessage}</p> : null}
      {!isFetching ?
        <Fragment>
          {/*TODO - Create Card component*/}
          {users?.map((data: IUsers) => (
           <Card {...data}/>
          ))}
        </Fragment>
        : <p>Loading...</p>}
    </section>
  );
};
export default List;
