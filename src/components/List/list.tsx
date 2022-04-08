import { FunctionComponent, useState } from "react";
import styles from "../../styles/List.module.css";

type Props = {};
const List: FunctionComponent<Props> = () => {
  const [search, setSearch] = useState<string>("");
  const [currentList, setCurrentList] = useState<Array<string>>([
    "sdfsadas",
    "gsdofkspodkfspd",
    "Okdsfgpoksdfpok",
  ]);
  return (
    <div>
      <div>
        <input
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
          id="username"
          type="text"
          placeholder="Github Username"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {currentList
          ?.filter((name: string) => {
            if (search === "" && !name) return true;
            return name?.includes(search);
          })
          .map((name: string, index: number) => (
            <div key={index}>
              <div className={styles.single}>
                <img
                  src="https://avatars.githubusercontent.com/u/2598101?s=120&v=4"
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    marginRight: 23,
                  }}
                />
                <a>
                  <h3>{name}</h3>
                  <h4 style={{ color: "grey", fontWeight: "normal" }}>
                    {name}
                  </h4>
                  <p>
                    Programador desde 2015 com forte domino em HTML/CSS/JS,
                    React e diversas frameworks como Material UI, Ionic,
                    Bootstrap, angular, NextJS entre outras.
                  </p>
                </a>
                <div>
                  <button>repos</button>
                  <button>starred</button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default List;
