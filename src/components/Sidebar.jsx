import { Outlet } from 'react-router-dom';
import AppNav from './AppNav';
import Logo from './Logo';
import styles from './Sidebar.module.css';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <footer className={styles.footer}>
        <p className="copyright">
          &copy; Copyrigt {new Date().getFullYear()} by WorldWise Inc, All
          Rights Reserved
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
