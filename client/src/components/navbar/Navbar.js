import React from 'react';
import {Navbar, NavbarMenu, NavbarStart} from "bloomer";
import { Link } from 'react-router-dom'

class MainMenu extends React.Component {

    render() {
        return (
            <Navbar style={{margin: '0'}} className={'is-dark'}>
                <NavbarMenu isActive={true}>
                    <NavbarStart>
                        <Link className={'navbar-item'} to='/servers'>Servers</Link>
                        <Link className={'navbar-item'} to='/applications'>Applications</Link>
                    </NavbarStart>
                </NavbarMenu>
            </Navbar>
        );
    }
}

export default MainMenu;
