import { FunctionComponent } from "react";
import { useQuery } from "react-query";

import { API_DEFAULT_PARAMS, instanceAxios } from "@services/Axios";
import * as globals from "@styles/styledGlobal";

interface IProps {
  userId: string;
};

interface IRepositories {
  name: string;
  id: string;
  language: string;
  html_url: string;
};

const Repos: FunctionComponent<IProps> = ({ userId }) => {
  const { data, isFetching } = useQuery<IRepositories[]>("repos", async () => {
    const { data } = await instanceAxios.get(`users/${userId}/repos`, {
      params: { ...API_DEFAULT_PARAMS },
    });
    return data;
  });

  if (!isFetching) return null
  return (
    <>
      <div className={globals.CardCenter}>
        <div className={globals.TagContainer}>
          {data && data?.length > 0 ? (
            <>
              {data?.map(
                ({ name, id, language, html_url }: IRepositories) => (
                  <div className={globals.Tag}
                    key={id}>

                    <a className={globals.UnderlineLink} href={html_url} target="_blank">
                      {name}
                    </a>
                  </div>
                )
              )}
            </>
          ) : (
            <h2>{userId} doesn't have any public repositories yet.</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default Repos;
