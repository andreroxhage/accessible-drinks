import './App.css';
import Navbar from './components/Navbar';
import {Outlet} from 'react-router-dom';
import Footer from './components/Footer';

function App() {
	return (
		<div className='App overflow-x-hidden'>
			<Navbar />
			<Outlet />
			<Footer />
		</div>
	);
}

export default App;
