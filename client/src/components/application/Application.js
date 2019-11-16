import React from 'react';
import {Title, Field, Control, Label, Input, Checkbox, Button, Tile, Select, Column, Subtitle, Columns} from 'bloomer'
import API from '../../utils/API';
import ApplicationTile from './ApplicationTile'

class Application extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			applicationsData: [],
			availableServers: [],
			newAppName: '',
			newAppSrvId: '',
			newAppType: '',
			newAppDescription: '',
			newAppPlatform: '',
			newAppAvailable: true
		};

		this.handleChange = this.handleChange.bind(this);
		this.addApplication = this.addApplication.bind(this);
		this.clearForm = this.clearForm.bind(this);
	}

	async addApplication() {

		if (this.state.newSrvName) {

			const server = {
				name: this.state.newSrvName,
				available: this.state.newSrvAvailable
			};

			const res = await API.post('/servers', server);

			if (res.status === 201) {
				server._id = res.data._id;
				this.setState({
					applicationsData: [...this.state.applicationsData, server]
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

	removeApp(id) {
		this.setState({
			applicationsData: this.state.applicationsData.filter(s => s._id !== id)
		})
	}

	clearForm() {
		this.setState({
			newAppName: ''
		})
	}

	render() {

		const {
			applicationsData,
			newAppName,
			newAppType,
			newAppSrvId,
			newAppAvailable,
            newAppDescription,
			availableServers,
            newAppPlatform
		} = this.state;

		return (
			<div>
				<Title>Applications</Title>
				<Columns>
					<Column isSize='1/4'>
						<Subtitle>Add</Subtitle>
						<Field>
							<Label>Name</Label>
							<Control>
								<Input type="text" placeholder='Title' value={newAppName}
									   onChange={this.handleChange} name="newAppName"/>
							</Control>
						</Field>
						<Field>
							<Label>Server</Label>
							<Control>
								<Select
                                    placeholder='Server'
                                    onChange={this.handleChange}
                                    name="newAppSrvId"
                                    value={newAppSrvId}>
									{availableServers.map(v => <option key={v._id} value={v._id}>{v.name}</option>)}
								</Select>
							</Control>
						</Field>
						<Field>
							<Label>Type</Label>
							<Control>
								<Select
                                    placeholder='Server'
                                    onChange={this.handleChange}
                                    name="newAppSrvId"
                                    value={newAppType}>
									<option>API</option>
									<option>Application</option>
									<option>Standalone</option>
								</Select>
							</Control>
						</Field>
						<Field>
							<Label>Description</Label>
							<Control>
								<Input
                                    type="text"
                                    placeholder='Description'
                                    value={newAppDescription}
                                    onChange={this.handleChange}
                                    name="newAppDescription"/>
							</Control>
						</Field>
						<Field>
							<Label>Platform</Label>
							<Control>
								<Select
                                    placeholder='Platform'
                                    onChange={this.handleChange}
                                    name="newAppPlatform"
									value={newAppPlatform}>
									    <option>Node.js</option>
								</Select>
							</Control>
						</Field>
						<Field>
							<Label>Available</Label>
							<Control>
								<Checkbox
									checked={newAppAvailable}
									onChange={this.handleChange}
									name="newAppAvailable"
                                />
							</Control>
						</Field>
						<Field isGrouped>
							<Control>
								<Button isColor='primary' onClick={this.addApplication}>Add</Button>
							</Control>
							<Control>
								<Button onClick={this.clearForm}>Cancel</Button>
							</Control>
						</Field>
					</Column>
					<Column style={{borderLeft: '1px solid #eeeeee'}}>
						<Subtitle>List</Subtitle>
						<Tile isAncestor style={{flexWrap: 'wrap'}}>
							{applicationsData.map((row, index) =>
                                <ApplicationTile
                                    key={index} data={row}
                                    removeApp={this.removeApp.bind(this)}
                                />)}
						</Tile>
					</Column>
				</Columns>
			</div>
		);
	}

	async componentDidMount() {

		try {
			const servers = await API.get('/servers');
			const applications = await API.get('/applications');

			this.setState({
				applicationsData: applications.data,
				availableServers: servers.data
			});

		} catch (e) {
			console.log(e);
		}

	}
}

export default Application;
