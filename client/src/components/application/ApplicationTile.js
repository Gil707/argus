import React from 'react';
import {Tile, Box, Title, Subtitle, Button} from 'bloomer'
import API from "../../utils/API";

class ApplicationTile extends React.Component {

    constructor(props) {
        super(props);
        this.removeApp = this.removeApp.bind(this);
    }

    removeAppFromList(){
        this.props.removeApp(this.props.data._id);
    }

    async removeApp() {
        try {
            const res = await API.delete('/applications/' + this.props.data._id);

            if (res.status === 200) {
                this.removeAppFromList()
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
                            <Button isColor={'danger'} isSize={'small'} onClick={this.removeApp}>Delete</Button>
                        </Box>
                    )
                }/>
            </Tile>
        );
    }
}

export default ApplicationTile;
