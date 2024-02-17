import styles from './Sidebar.module.css';
import Logo from './Logo';
import AppNav from './AppNav';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <p>List of cities</p>
      <footer className={styles.footer}>
        &copy; Copyrigt {new Date().getFullYear()} by WorldWise Inc, All Rights
        Reserved
      </footer>
    </div>
  );
}

export default Sidebar;
