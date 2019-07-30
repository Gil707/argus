import React from 'react';
import {Tile, Box, Title, Subtitle, Button} from 'bloomer'
import API from "../../utils/API";

class ServerCard extends React.Component {

    constructor(props) {
        super(props);
        this.removeServer = this.removeServer.bind(this);
    }

    removeServerFromList(){
        this.props.removeServer(this.props.data._id);
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
                            <Title>{this.props.data.name}</Title>
                            <Subtitle>{this.props.data.ip}</Subtitle>
                            <Button isColor={'danger'} isSize={'small'} onClick={this.removeServer}>Delete</Button>
                        </Box>
                    )
                }/>
            </Tile>
        );
    }
}

export default ServerCard;
