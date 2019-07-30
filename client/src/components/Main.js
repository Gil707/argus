import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Servers from './server/Server';
import Applications from './application/Application';

class Main extends React.Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route path='/servers' component={Servers}/>
                    <Route path='/applications' component={Applications}/>
                </Switch>
            </main>
        )
    }
}

export default Main;
