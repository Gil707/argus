import React from 'react';
import Navbar from "./navbar/Navbar";
import { Section } from 'bloomer';
import Main from './Main';

class App extends React.Component {

    render() {
        return (
            <div>
                <Navbar/>
                <Section className="App">
                        <Main />
                </Section>
            </div>
        )
    }
}

export default App;
