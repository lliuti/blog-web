import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Header } from "../../components/Header";
import styles from "./styles.module.scss";

export function CreatePost() {
  const [logged, setLogged] = useState(false);

  const history = useHistory();

  useEffect(() => {
    verifyLogged();
  }, [])

  const verifyLogged = () => {
    setLogged(false);
    const token = localStorage.getItem("user:token");
    if (token) {
      setLogged(true);
    } else {
      history.push("/");
    }
  };
  return (
    <>
      <Header />
      <div className={styles.createPostWrapper}>
        <input className={styles.titleInput} type="text" placeholder="Title" />
        <input className={styles.descriptionInput} type="text" placeholder="Description" />
        <textarea className={styles.contentTextarea} placeholder="Content"></textarea>
      </div>
    </>
  )
}