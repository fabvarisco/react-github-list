import { FunctionComponent, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";
import { IUsers } from "@interfaces/IUser";
import * as globals from "@styles/styledGlobal";
import Card from "@components/Card";
import { API_DEFAULT_PARAMS, instanceAxios } from "@services/Axios";

const List: FunctionComponent = () => {
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<IUsers[]>([]);
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
          className={"focus:ring-indigo-500 focus:border-indigo-500 block pl-7 pr-12 sm:text-sm border-gray-300 h-8 ml-2 w-full border-none"}
          id="username"
          type="text"
          placeholder="Search Github Username"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className={"flex items-center justify-center px-4 border mr-2"} onClick={() => searchUser()}>Search</button>
      </div>
      <div className="flex justify-center my-8 mx-2 flex-wrap">
        <button className={globals.Button} onClick={() => back()}>Back</button>
        <input
          placeholder=""
          value={pageId}
          type="number"
          min="0"
          onChange={(e) => {
            setPageId(e.target.valueAsNumber);
          }}
          className="s:w-20 lg:w-auto"
        />
        <button className={globals.Button} onClick={() => next()}>Next</button>
      </div>
      {errorMessage !== "" ? <p>{errorMessage}</p> : null}
      {!isFetching ?
        <>
          {users?.map((data: IUsers) => (
           <Card {...data} key={data.id}/>
          ))}
        </>
        : <p>Loading...</p>}
    </section>
  );
};
export default List;
