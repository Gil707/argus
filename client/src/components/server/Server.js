import React from 'react';
import {Title, Field, Control, Label, Input, Button, Tile, Columns, Column, Subtitle} from 'bloomer'
import API from '../../utils/API';
import ServerTile from './ServerTile'

class Server extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            serversData: [],
            newSrvName: '',
            newSrvIp: ''
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
            };

            const res = await API.post('/servers', server);

            if (res.status === 201) {
                server._id = res.data._id;
                this.setState({
                    ...this.state,
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
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    removeServer(id) {
        this.setState({
            ...this.state,
            serversData: this.state.serversData.filter(s => s._id !== id)
        })
    }

    clearForm() {
        this.setState({
            ...this.state,
            newSrvName: '',
            newSrvIp: ''
        })
    }

    render() {

        const { serversData } = this.state;

        return (
            <div>
                <Title>Servers</Title>

                <Columns>
                    <Column isSize='1/4'>
                        <Subtitle>Add</Subtitle>
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
                        <Field isGrouped>
                            <Control>
                                <Button isColor='primary' onClick={this.addServer}>Add</Button>
                            </Control>
                            <Control>
                                <Button onClick={this.clearForm}>Cancel</Button>
                            </Control>
                        </Field>
                    </Column>
                    <Column style={{borderLeft: '1px solid #eeeeee'}}>
                        <Subtitle>List</Subtitle>
                        <Tile isAncestor style={{flexWrap: 'wrap'}}>
                            {serversData.map((row, index) => <ServerTile key={index} data={row}
                                                                         removeServer={this.removeServer.bind(this)}/>)}
                        </Tile>
                    </Column>
                </Columns>
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
