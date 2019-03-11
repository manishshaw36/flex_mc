import React, { Component } from 'react';


class DeviceCommand extends Component {
    state = {
        command: "Read Holding Reg",
        startingAddress: null,
        commandLength: null,
        id: null
    }
    componentWillMount(){
        this.blahblah(this.props.command);
    }
    componentWillReceiveProps(props){
        this.blahblah(props.command);
    }
    blahblah = (listOfCommand) => {
        this.setState({
            command: listOfCommand.command,
            startingAddress: listOfCommand.startingAddress,
            commandLength: listOfCommand.commandLength,
            id: listOfCommand.id,
        });
    }
    
    updateInputValue = (type) => (evt) => {
        const value = evt.target.value;
        var numberReg = /^[0-9]*$/gm;

        if (((type === 'startingAddress')||(type === 'commandLength')) && value !== '' && !numberReg.test(value)) {
            return null;
        }
        this.setState({ [type]: value });
    }
    getData = () => {
        const { command, startingAddress, commandLength } = this.state;
        return {
            startingAddress,
            commandLength,
            command
        }
    }
    deleteField = (id) =>{
        this.props.deleteData(id);
    }
    render() {
        const {startingAddress, commandLength, command} = this.state;
        return (
            <div>
                <div className="row mt-3">
                    <div className="col-4">
                        <select onChange={this.updateInputValue('command')} value={command || ""} className="form-control w-100">
                            <option>Read Holding Reg</option>
                            <option>Read Input Reg</option>
                            <option>Read Discrete Reg</option>
                        </select>
                    </div>
                    <div className="col-4">
                        <input type="text" placeholder="Starting Address" className="w-100 form-control" value={startingAddress || ""} onChange={this.updateInputValue('startingAddress')}/>
                    </div>
                    <div className="col-2">
                        <input type="text" placeholder="Length" className="w-100 form-control" value={commandLength || ""} onChange={this.updateInputValue('commandLength')}/>
                    </div>
                    <div className="col-2">
                        {
                            this.props.noOfCommand > 1 &&  <button onClick={() => this.deleteField(this.props.id)} className="btn btn-danger">Delete</button>
                        }
                    </div>
                </div>
            </div>
        );
    }

}

export default DeviceCommand;
