import styles from "./styles.module.scss"

export function Header() {
  return (
    <div className={styles.headerContainer}>
      <button className={styles.signInButton}>LOGIN</button>
      <button className={styles.signUpButton}>CREATE ACCOUNT</button>
    </div>
  );
}