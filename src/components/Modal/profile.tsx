import { Fragment, FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import "./style.css";

const Profile: FunctionComponent = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <Fragment>
      <div className="card">
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
          <h3>{id}</h3>
          <h4 style={{ color: "grey", fontWeight: "normal" }}>{id}</h4>
          <p>
            Programador desde 2015 com forte domino em HTML/CSS/JS, React e
            diversas frameworks como Material UI, Ionic, Bootstrap, angular,
            NextJS entre outras.
          </p>
        </a>
        <div>
          <button>repos</button>
          <button>starred</button>
        </div>
      </div>
      <div className="card">
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
          <h3>{id}</h3>
          <h4 style={{ color: "grey", fontWeight: "normal" }}>{id}</h4>
          <p>
            Programador desde 2015 com forte domino em HTML/CSS/JS, React e
            diversas frameworks como Material UI, Ionic, Bootstrap, angular,
            NextJS entre outras.
          </p>
        </a>
        <div>
          <button>repos</button>
          <button>starred</button>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
