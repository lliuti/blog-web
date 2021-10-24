import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Header } from "../../components/Header";
import { api } from "../../services/api";
import styles from "./styles.module.scss";

export function CreatePost() {
  const [logged, setLogged] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [token, setToken] = useState("");

  const history = useHistory();

  useEffect(() => {
    verifyLogged();
  }, [])

  const verifyLogged = () => {
    setLogged(false);
    const token = localStorage.getItem("user:token");
    if (token) {
      setToken(token)
      setLogged(true);
    } else {
      history.push("/");
    }
  };

  const handleCreatePostButton = async () => {
    setTitle(title.trim());
    setDescription(description.trim());
    setContent(content.trim());

    const data = {
      title,
      description,
      content
    }

    const response = await api.post("/posts", data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    console.log(response);
  }

  return (
    <>
      <Header />
      <div className={styles.createPostWrapper}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className={styles.titleInput} type="text" placeholder="Title" />
        <input value={description} onChange={(e) => setDescription(e.target.value)} className={styles.descriptionInput} type="text" placeholder="Description" />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} className={styles.contentTextarea} placeholder="Content"></textarea>
        <div className={styles.buttonRow}>
          <button onClick={handleCreatePostButton} className={styles.createPostButton}>CREATE</button>
        </div>
      </div>
    </>
  )
}