import React from 'react';
import { Title } from 'bloomer'
import API from '../../utils/API';

class Application extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            applicationsData: ''
        };
    }

    render() {
        const { applicationsData } = this.state;

        return (
            <div>
                <Title>Applications</Title>
                <p>{applicationsData}</p>
            </div>
        );
    }

    async componentDidMount() {

        try {
            let applications = await API.get('/applications/1');

            this.setState({
                ...this.state,
                applicationsData: JSON.stringify(applications.data)
            });

        } catch (e) {
            console.log(e);
        }

    }
}

export default Application;
