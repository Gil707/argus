import React from 'react';
import Navbar from "./navbar/Navbar";
import { Section, Container } from 'bloomer';
import Main from './Main';

class App extends React.Component {

    render() {
        return (
            <div>
                <Navbar/>
                <Section className="App">
                    <Container>
                        <Main />
                    </Container>
                </Section>
            </div>
        )
    }
}

export default App;
