import React from 'react';
import {Title, Field, Control, Label, Input, Checkbox, Button, Tile} from 'bloomer'
import API from '../../utils/API';
import ServerCard from './ServerCard'

class Server extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            serversData: [],
            newSrvName: '',
            newSrvIp: '',
            newSrvAvailable: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.addServer = this.addServer.bind(this);
        this.clearForm = this.clearForm.bind(this);
    }

    async addServer() {

        if (this.state.newSrvName && this.state.newSrvIp) {

            const server = {
                name: this.state.newSrvName,
                ip: this.state.newSrvIp,
                available: this.state.newSrvAvailable
            };

            const res = await API.post('/servers', server);

            if (res.status === 201) {
                server._id = res.data._id;
                this.setState({
                    serversData: [...this.state.serversData, server]
                });
                this.clearForm();
            }
        } else {
            console.log('Empty form')
        }
    };

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    removeServer(id) {
        this.setState({
            serversData: this.state.serversData.filter(s => s._id !== id)
        })
    }

    clearForm() {
        this.setState({
            newSrvName: '',
            newSrvIp: ''
        })
    }

    render() {

        const {serversData} = this.state;

        return (
            <div>
                <Title>Servers</Title>
                <Field>
                    <Label>Name</Label>
                    <Control>
                        <Input type="text" placeholder='Identifier' value={this.state.newSrvName}
                               onChange={this.handleChange} name="newSrvName"/>
                    </Control>
                </Field>
                <Field>
                    <Label>IP</Label>
                    <Control>
                        <Input type="text" placeholder='Ip address' value={this.state.newSrvIp}
                               onChange={this.handleChange} name="newSrvIp"/>
                    </Control>
                </Field>
                <Field>
                    <Label>Available</Label>
                    <Control>
                        <Checkbox checked={this.state.newSrvAvailable} onChange={this.handleChange} name="newSrvAvailable"></Checkbox>
                    </Control>
                </Field>
                <Field isGrouped>
                    <Control>
                        <Button isColor='primary' onClick={this.addServer}>Add</Button>
                    </Control>
                    <Control>
                        <Button onClick={this.clearForm}>Cancel</Button>
                    </Control>
                </Field>
                <Tile isAncestor style={{flexWrap: 'wrap'}}>
                        {serversData.map((row, index) => <ServerCard key={index} data={row} removeServer={this.removeServer.bind(this)}/>)}
                </Tile>
            </div>
        );
    }

    async componentDidMount() {

        try {
            let servers = await API.get('/servers');

            this.setState({
                ...this.state,
                serversData: servers.data
            });

        } catch (e) {
            console.log(e);
        }

    }
}

export default Server;
