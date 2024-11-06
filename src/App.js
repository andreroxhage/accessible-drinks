import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
// import { lightTheme } from '@sj-ab/component-library.styles.themes';
// import ThemeProvider from '@sj-ab/component-library.ui.theme-provider';

function App() {
  return (
    <main className="App overflow-x-hidden">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}

export default App;
