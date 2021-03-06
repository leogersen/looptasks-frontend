import React from 'react';
import { APP_NAME } from '../constants';
import  { useNavBarItems } from '../hooks/useNavBarItems';
import NavBarItem from './NavBarItem';

export const NavBar = () =>  {
    const navBarItems = useNavBarItems(); 
    
        return (
                 <div>
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="/">{APP_NAME}</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarText">
                            <ul className="navbar-nav mr-auto">
                            {navBarItems.items.map(

                            item => <NavBarItem
                                key={item.name}
                                item={item} />)}

                            </ul>          
                        </div>
                        <span className="navbar-text">
                            { navBarItems.helloMessage }
                            </span>
                            
                    </nav>  
                </div>
        );
    }

export default NavBar;