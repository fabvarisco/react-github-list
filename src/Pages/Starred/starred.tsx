import { Fragment, FunctionComponent } from "react";
import { useQuery } from "react-query";
import { instanceAxios } from "../../Services/axios";
import {
  LanguageIcon,
  Tag,
  TagContainer,
  UnderlineLink,
  CardCenter,
} from "../../Styles/StyledComponents/styledGlobal";

type Props = {
  userId: string;
};

type Starreds = {
  name: string;
  id: string;
  language: string;
  html_url: string;
};

const Starred: FunctionComponent<Props> = ({ userId }) => {
  const { data, isFetching } = useQuery<Starreds[]>("starred", async () => {
    const { data } = await instanceAxios.get(`/users/${userId}/starred`);
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
                  {data?.map(({ name, id, language, html_url }: Starreds) => (
                    <Tag key={id}>
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
                  ))}
                </Fragment>
              ) : (
                <h2>{userId} doesn’t have any starred repositories yet.</h2>
              )}
            </TagContainer>
          </CardCenter>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Starred;
