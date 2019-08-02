import React from 'react';
import {Tile, Box, Title, Subtitle, Button, Tag} from 'bloomer'
import API from "../../utils/API";

class ServerTile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            available: false
        };

        this.removeServer = this.removeServer.bind(this);
    }

    removeServerFromList(){
        this.props.removeServer(this.props.data._id);
    }

    async syncStatus() {
        const res = await API.get('/servers/check/' + this.props.data.ip);
        this.setState({available: res.data.alive})
    }

    async removeServer() {
        try {
            const res = await API.delete('/servers/' + this.props.data._id);

            if (res.status === 200) {
                this.removeServerFromList()
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <Tile isParent>
                <Tile isChild render={
                    () => (
                        <Box style={{minWidth: '300px', maxWidth: '300px'}}>
                            <Tag isColor={this.state.available ? 'success' : 'light'} className={'is-pulled-right'}>
                                {this.state.available ? 'Available' : 'Disconnected'}
                            </Tag>
                            <Title>{this.props.data.name}</Title>
                            <Subtitle>{this.props.data.ip}</Subtitle>
                            <Button isColor={'danger'} isSize={'small'} onClick={this.removeServer}>Delete</Button>
                        </Box>
                    )
                }/>
            </Tile>
        );
    }

    async componentDidMount() {

        await this.syncStatus();

        try {
            setInterval(async () => {
                await this.syncStatus()
            }, 5000);

        } catch (e) {
            console.log(e);
        }

    }
}

export default ServerTile;
