import React from "react";
import { NavLink } from "react-router-dom";
import headerLogo from "../../img/header-logo.png";
import { Link } from "react-router-dom"; 
import { HeaderControl } from "./HeaderControl";

export function Header() {
	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col">
						<nav className="navbar navbar-expand-sm navbar-light bg-light">
							<Link to="/" className="navbar-brand"> <img src={headerLogo} alt="Bosa Noga" /></Link>	
							<div className="collapse navbar-collapse">
								<ul className="navbar-nav mr-auto">
									<li className="nav-item">
									<NavLink className='nav-link' to="/">Главная</NavLink> 
									</li>
									<li className="nav-item">
									<NavLink className='nav-link' to="/catalog">Каталог</NavLink>
									</li>
									<li className="nav-item">
									<NavLink className='nav-link' to="/about">О магазине</NavLink> 
									</li>
									<li className="nav-item">
									<NavLink className='nav-link' to="/contacts">Контакты</NavLink> 
									</li>
								</ul>
								<HeaderControl />
							</div>			
						</nav>
					</div>
				</div>
			</div>
		</>
	)
} 