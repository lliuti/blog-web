import { VscGithub, VscSignOut } from "react-icons/vsc"
import { api } from "../../services/api";
import styles from "./styles.module.scss"
import { useHistory, useLocation } from "react-router-dom";

interface IGithubParameters {
  client_id: string;
  redirect_uri: string;
}

export function Header() {
  const history = useHistory();
  const location = useLocation();

  const handleGithubButton = async () => {
    const response = await api.get<IGithubParameters>("/github");

    const { client_id, redirect_uri } = response.data;

    window.location.replace(`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`);
  };

  const handleCreatePostButton = () => {
    history.push("/post/create");
  }

  const handleSignOut = () => {
    localStorage.removeItem("user:token");
    window.location.reload();
  }

  let button;

  const token = localStorage.getItem("user:token");

  if (token) {
    if (location.pathname == "/post/create") {
      button =
        <>
          <button onClick={() => history.push("/")} className={styles.createPostButton}>
            FEED
          </button>
          <button onClick={handleSignOut} className={styles.signInWithGithubButton}>
            <VscSignOut size={24} />
            LOG OUT
          </button>
        </>
    } else {
      button =
        <>
          <button onClick={handleCreatePostButton} className={styles.createPostButton}>
            CREATE A POST
          </button>
          <button onClick={handleSignOut} className={styles.signInWithGithubButton}>
            <VscSignOut size={24} />
            LOG OUT
          </button>
        </>
    }
  } else {
    button =
      <button onClick={handleGithubButton} className={styles.signInWithGithubButton}>
        <VscGithub size={24} />
        LOGIN WITH GITHUB
      </button>
  }

  return (
    <div className={styles.headerContainer}>

      {button}

    </div>
  );
}