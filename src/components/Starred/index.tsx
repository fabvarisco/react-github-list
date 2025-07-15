import { FunctionComponent } from "react";
import { useQuery } from "react-query";
import { API_DEFAULT_PARAMS, instanceAxios } from "@services/Axios";
import * as globals from "@styles/styledGlobal";

interface IProps {
  userId: string;
}

interface IStarreds {
  name: string;
  id: string;
  language: string;
  html_url: string;
}

const Starred: FunctionComponent<IProps> = ({ userId }) => {
  const { data, isFetching } = useQuery<IStarreds[]>("starred", async () => {
    const { data } = await instanceAxios.get(`users/${userId}/starred`, {
      params: { ...API_DEFAULT_PARAMS },
    });
    return data;
  });

  return (
    <>
      {isFetching ? (
        <>Loading...</>
      ) : (
        <>
          <div className={globals.CardCenter}>
            <div className={globals.TagContainer}>
              {data && data?.length > 0 ? (
                <>
                  {data?.map(({ name, id, language, html_url }: IStarreds) => (
                    <div className={globals.Tag} key={id}>
                      <img
                        className={globals.LanguageIcon}
                        alt={`${language?.toLowerCase()}`}
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${language?.toLowerCase()}/${language?.toLowerCase()}-original.svg`}
                        onError={({ currentTarget }) => {
                          currentTarget.src = "/assets/svg/generic-icon.svg";
                        }}
                      />
                      <a
                        className={globals.UnderlineLink}
                        href={html_url}
                        target="_blank"
                      >
                        {name}
                      </a>
                    </div>
                  ))}
                </>
              ) : (
                <h2>{userId} doesn’t have any starred repositories yet.</h2>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Starred;
