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

export function MainPage() {
  const [recentPosts, setRecentPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const response = api.get<IPost[]>("/posts/recent").then((response) => {
      setRecentPosts(response.data);
    });
  }, [])


  return (
    <div className={styles.mainPageWrapper}>
      <Header />
      <div className={styles.contentWrapper}>
        <form className={styles.form}>
          <input className={styles.searchInput} type="text" placeholder="SEARCH POST" />
          <button className={styles.searchButton}>SEARCH</button>
        </form>
        <a href="#" className={styles.highlightedPost}>
          <div className={styles.highlightedPostGradient} />
          <div className={styles.highlightedPostContent}>
            <h3>Lorem ipsum dolor sit amet</h3>
            <p>Lorem ipsum dolor sit amet, lorem ipsum dolor sit Amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, lorem ipsum dolor sit Amet. Lorem ipsum dolor sit amet.</p>
            <span>21/10/2021</span>
            <div className={styles.highlightedPostFooter}>

            </div>
          </div>
        </a>
        <div className={styles.recentPostsContainer}>
          {
            recentPosts.map((post) => {
              return (
                <a href="#" className={styles.post}>
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