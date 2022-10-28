import { Fragment, FunctionComponent } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { API_DEFAULT_PARAMS , instanceAxios } from "../../services/Axios";
import * as globals from "../../styles/styledGlobal";

interface Props {
  userId: string;
};

interface Repositories {
  name: string;
  id: string;
  language: string;
  html_url: string;
};

const Repos: FunctionComponent<Props> = ({ userId }) => {
  const { data, isFetching } = useQuery<Repositories[]>("repos", async () => {
    const { data } = await instanceAxios.get(`users/${userId}/repos`, {
      params: { ...API_DEFAULT_PARAMS },
    });
    return data;
  });

  return (
    <Fragment>
      {!isFetching  ? (
        <Fragment>
          <div className={globals.CardCenter}>
            <div className={globals.TagContainer}>
              {data && data?.length > 0 ? (
                <Fragment>
                  {data?.map(
                    ({ name, id, language, html_url }: Repositories) => (
                      <div className={globals.Tag}
                        key={id}>
                        <img className={globals.LanguageIcon}
                          alt={`${language?.toLowerCase()}`}
                          src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${language?.toLowerCase()}/${language?.toLowerCase()}-original.svg`}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "/assets/svg/generic-icon.svg";

                          }}
                        />
                        <a className={globals.UnderlineLink} href={html_url} target="_blank">
                          {name}
                        </a>
                      </div>
                    )
                  )}
                </Fragment>
              ) : (
                <h2>{userId} doesn't have any public repositories yet.</h2>
              )}
            </div>
          </div>
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default Repos;
