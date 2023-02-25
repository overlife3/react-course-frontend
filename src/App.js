import { Route, Routes } from 'react-router-dom';
import { HomePage } from './components/Pages/HomePage'
import { CatalogPage } from './components/Pages/CatalogPage'
import { AboutPage } from './components/Pages/AboutPage'
import { ContactsPage } from './components/Pages/ContactsPage'
import { Header } from './components/molecul/Header';
import { CartPage } from './components/Pages/CartPage'
import {Footer} from './components/molecul/Footer'
import { Banner } from './components/molecul/Banner';
import { Page404 } from './components/Pages/Page404';
import { CardInfo } from './components/molecul/CardInfo'

function App() {
  return (
		<div>
			<Header />
			<Banner />
			<Routes>
					<Route path='/' element={<HomePage/>} />
					<Route path='/catalog' element={<CatalogPage/>} />
					<Route path='/about' element={<AboutPage/>} />
					<Route path='/contacts' element={<ContactsPage/>} />
					<Route path='/cart' element={<CartPage />}/>
					<Route path='/catalog/:id' element={<CardInfo />}/>
					<Route path='*' element={<Page404 />}/>
			</Routes>
			<Footer />
		</div>

  );
}

export default App;
