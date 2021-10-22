import { VscGithub } from "react-icons/vsc"
import { api } from "../../services/api";
import styles from "./styles.module.scss"

export function Header() {
  const handleGithubButton = async () => {
    await api.get("/github");
  };

  return (
    <div className={styles.headerContainer}>
      <button onClick={handleGithubButton} className={styles.signInWithGithubButton}>
        <VscGithub size={24} />
        LOGIN WITH GITHUB
      </button>
    </div>
  );
}