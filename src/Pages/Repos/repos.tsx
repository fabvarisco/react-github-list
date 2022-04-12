import { Fragment, FunctionComponent } from "react";
import { useQuery } from "react-query";
import { instanceAxios } from "../../Services/axios";
import {
  CardCenter,
  LanguageIcon,
  Tag,
  TagContainer,
  UnderlineLink,
} from "../../Styles/StyledComponents/styledGlobal";
import { API_DEFAULT_PARAMS } from "../../Services/axios";
type Props = {
  userId: string;
};

type Repositories = {
  name: string;
  id: string;
  language: string;
  html_url: string;
};

const Repos: FunctionComponent<Props> = ({ userId }) => {
  const { data, isFetching } = useQuery<Repositories[]>("repos", async () => {
    const { data } = await instanceAxios.get(`/users/${userId}/repos`, {
      params: { ...API_DEFAULT_PARAMS },
    });
    return data;
  });

  return (
    <Fragment>
      {!isFetching && (
        <Fragment>
          <CardCenter>
            <TagContainer>
              {data && data?.length > 0 ? (
                <Fragment>
                  {data?.map(
                    ({ name, id, language, html_url }: Repositories) => (
                      <Tag
                        key={id}
                        
                      >
                        <LanguageIcon
                          alt={`${language?.toLowerCase()}`}
                          src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${language?.toLowerCase()}/${language?.toLowerCase()}-original.svg`}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "/svg/generic-icon.svg";
                          }}
                        />
                        <UnderlineLink href={html_url} target="_blank">
                          {name}
                        </UnderlineLink>
                      </Tag>
                    )
                  )}
                </Fragment>
              ) : (
                <h2>{userId} doesn't have any public repositories yet.</h2>
              )}
            </TagContainer>
          </CardCenter>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Repos;
