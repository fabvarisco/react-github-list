import Repos from "../Repos"
import Starred from "../Starred"
import * as globals from "../../styles/styledGlobal";
import { IUsers } from "src/interfaces/IUser";
import * as style from "./style";
import { FunctionComponent } from "react";

interface IUserProfile {
    avatar_url: string | undefined;
    login: string | undefined;
    name: string | undefined;
    bio: string | undefined;
};


const ProfileCard: FunctionComponent<IUserProfile> = ({
    avatar_url,
    login,
    name,
    bio,
}) => {
    return (
        <>
            <div className={globals.Card}>
                <img className={globals.ProfileImg} src={avatar_url} />
                <div className="grow">
                    <h3>{login}</h3>
                    <h4 className="mt-1 text-gray-400">{name}</h4>
                    <p className="mt-4">{bio}</p>
                </div>
                <div>
                    <a target={"_blank"} href={`https://github.com/${login}`}>
                        <button className={globals.Button}>Github</button>
                    </a>
                </div>
            </div>
            <h3 className={style.TitleText}>Repositories</h3>
            <Repos userId={login || ""} />
            <h3 className={style.TitleText}>Starred</h3>
            <Starred userId={login || ""} />
        </>)
}

export default ProfileCard;