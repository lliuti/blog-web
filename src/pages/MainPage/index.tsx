import { RiSearchLine } from "react-icons/ri"
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { api } from "../../services/api";
import styles from "./styles.module.scss";

interface IPost {
  author_id: string;
  content: string;
  created_at: Date;
  description: string;
  id: string;
  tags: string;
  title: string;
}

interface IAuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    github_username: string;
    avatar_url: string;
  };
}

export function MainPage() {
  const [recentPosts, setRecentPosts] = useState<IPost[]>([]);
  const [lastPost, setLastPost] = useState<IPost>();
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    verifyLogged();
    loadPosts();
    verifyGithubCode();
  }, [])

  const loadPosts = async () => {
    const lastPostResponse = await api.get<IPost>("/posts/last");
    setLastPost(lastPostResponse.data);

    const recentPostsResponse = await api.get<IPost[]>("/posts/recent");
    setRecentPosts(recentPostsResponse.data);
  };

  const verifyGithubCode = () => {
    const url = window.location.href;

    const hasCode = url.includes("?code=");

    if (hasCode) {
      const [emptyUrl, code] = url.split("?code=");
      window.history.pushState({}, "", emptyUrl);
      signIn(code);
    }
  }

  const signIn = async (code: string) => {
    const response = await api.post<IAuthResponse>("/auth/github", {
      code
    });
    const { token, user } = response.data;

    localStorage.setItem("user:token", token);
  }

  const verifyLogged = () => {
    setLogged(false);
    const token = localStorage.getItem("user:token");
    if (token) {
      setLogged(true);
    }
  };

  return (
    <div className={styles.mainPageWrapper}>
      <Header />
      <div className={styles.contentWrapper}>
        {/* <form className={styles.form}>
          <input className={styles.searchInput} type="text" placeholder="SEARCH POST" />
          <button className={styles.searchButton}>
            <RiSearchLine size={24} />
            SEARCH
          </button>
        </form> */}
        <a href="#" className={styles.highlightedPost}>
          <div className={styles.highlightedPostGradient} />
          <div className={styles.highlightedPostContent}>
            <h3>{lastPost?.title}</h3>
            <p>{lastPost?.description}</p>
            <span>{lastPost?.created_at}</span>
            <div className={styles.highlightedPostFooter}>
            </div>
          </div>
        </a>
        <div className={styles.recentPostsContainer}>
          {
            recentPosts.map((post) => {
              return (
                <a key={post.id} href="#" className={styles.post}>
                  <div className={styles.postGradient} />
                  <div className={styles.postContent}>
                    <div className={styles.postFooter}></div>
                    <h3>{post.title}</h3>
                    <p>{post.description}</p>
                  </div>
                </a>
              )
            })
          }

        </div>
        <button className={styles.loadMoreButton}>LOAD MORE POSTS</button>
      </div>
    </div>
  )
}