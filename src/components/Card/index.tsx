import { FunctionComponent, useRef, useState } from "react";
import { IUsers } from "@interfaces/IUser";
import { Link } from "react-router-dom";
import * as globals from "@styles/styledGlobal";
import * as style from "./style";
import { DotsIcon } from "Icons";
import Modal from "@components/Modal";
import Starred from "@components/Starred";
import Repos from "@components/Repos";
const Card: FunctionComponent<IUsers> = ({ avatar_url, login, html_url, id }) => {
    const [dropdown, setDropdown] = useState<boolean[]>([]);
    const [userId, setUserId] = useState<string>("");

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

    return (
        <>
            <div className={globals.Card} key={id}>
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

                {/*TODO - Create dots component*/}
                <div className={style.DotsCol}>
                    <div className={style.DotsButton} id={`button_${id}`}>
                        <button onClick={() => setDropdown(dropdown)}>
                            <DotsIcon />
                        </button>
                        {dropdown ? (
                            <div className={style.Dropdown} id={`item_${id}`} >
                                <ul>
                                    <li className={style.DropdownButton}
                                        onClick={() => handleOpenModalRepos(login)}
                                    >
                                        Repos
                                    </li>
                                    <li className={style.DropdownButton} onClick={() => handleOpenModalStarred(login)}>
                                        Starred
                                    </li>
                                    <li>
                                        <Link to={`/${login}`}>
                                            <div className={style.DropdownButton}>Details</div>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
            <Modal ref={modalStarredRef} name={"Starred"}>
                <Starred userId={userId} />
            </Modal>
            <Modal ref={modalReposRef} name={"Repos"}>
                <Repos userId={userId} />
            </Modal>
        </>
    )
}

export default Card;