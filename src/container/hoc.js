import React, { Component } from 'react';
import DeviceType from '../components/device_type';
import DeviceCommand from '../components/device_command';
import DeviceInfo from '../components/device_info'

const initialData = {
    command: "Read Holding Reg",
    startingAddress: null,
    commandLength: null,
    id:null
}

class Hoc extends Component {
    state = {
        device: [],
        listOfCommand: [
            {...initialData}
        ],
        reset: false,
        deviceData: null,
    }

    saveDataToParent = () => {
        let { listOfCommand, device } = this.state;
        const deviceType = this.deviceTypeHandler.getData();
        const command = this.deviceCommandHandler.getData();
        if(command.startingAddress === null || command.commandLength === null || command.command === null 
            || deviceType.ipAddress === null || deviceType.port === null || deviceType.unitId === null ||
            deviceType.device_Type === null || deviceType.deviceId === null){
                alert("All above fields are mandatory, and filled properly");
                return;
        }
        listOfCommand[listOfCommand.length-1] = command;
        listOfCommand.map((ele,i) => {
            ele.id = i;
            return null;
        })
        device = [...device, { deviceType: deviceType, id: this.state.device.length, command: listOfCommand }];
        this.setState({
            device: device,
            reset: true,
            listOfCommand: [{...initialData}],
            deviceData: null,
        });
        
    }
    addCommand = () => {
        let { listOfCommand } = this.state;
        const command = this.deviceCommandHandler.getData();
        const deviceType = this.deviceTypeHandler.getData();
        if(command.startingAddress === null || command.commandLength === null || command.command === null 
            || deviceType.ipAddress === null || deviceType.port === null || deviceType.unitId === null ||
            deviceType.device_Type === null || deviceType.deviceId === null){
                alert("All above fields are mandatory, and filled properly");
                return;
        }

        listOfCommand[listOfCommand.length-1] = command;
        listOfCommand = [...listOfCommand, {...initialData, id: listOfCommand.length}];
        
        listOfCommand.map((ele,i) => {
            ele.id = i;
            return null;
        })

        this.setState({
            listOfCommand: listOfCommand,
            reset: false,
            deviceData: null,
        });
    }

    deleteData = (id) => {
        const command = this.deviceCommandHandler.getData();
        const { listOfCommand } = this.state;
        listOfCommand[listOfCommand.length-1] = {...command, id:listOfCommand.length-1};
        const updatedSubs = listOfCommand.filter((subs) => {
            return subs.id !== id;
        });
        updatedSubs.map((ele,i) => {
            ele.id = i;
            return null;
        })
        this.setState({
            listOfCommand: updatedSubs,
        });
    }

    deleteDeviceData = (id) =>{
        const device  = this.state.device;
        const updatedSubs = device.filter((subs) => {
            return subs.id !== id;
        });
        updatedSubs.map((ele,i) => {
            ele.id = i;
            return null;
        })
        this.setState({
            device: updatedSubs,
        });
    }

    updateFieldData = (id) => {
        const device  = this.state.device;
        let updateData = device.filter((ele) => ele.id === id);
        const updatedSubs = device.filter((subs) => {
            return subs.id !== id;
        });
        updatedSubs.map((ele,i) => {
            ele.id = i;
            return null;
        })
        this.setState({
            device: updatedSubs,
            listOfCommand: updateData[0].command,
            reset: false,
            deviceData: updateData[0].deviceType
        })
        
    }
    
    getAllData = () =>{
        console.log(this.state.device);
    }
    render() {
        const { listOfCommand, reset, device, deviceData } = this.state;
        return (
            <div className="row">
                <div className="col-5 pl-5">
                    <DeviceType ref={ (el) => { this.deviceTypeHandler = el } } reset={reset} deviceData={deviceData}/>
                    <div className="row mt-5">
                        <div className="col-4">
                            <h5>Command</h5>
                        </div>
                        <div className="col-4">
                            <h5>Starting Address</h5>
                        </div>
                        <div className="col-2">
                            <h5>Length</h5>
                        </div>
                    </div>
                    {
                        listOfCommand.map((ele,i) => {
                            return <DeviceCommand key={i} ref={ (el) => { this.deviceCommandHandler = el } } deleteData={this.deleteData} command={ele} noOfCommand={listOfCommand.length} id={ele.id} reset={reset}/>
                        })
                    }
                    <div className="row mt-4 float-right">
                        <button className="float-right btn btn-primary" onClick={this.addCommand}>
                            <h2 className="px-2">+</h2>
                        </button>
                    </div>
                </div>
                <div className="col-2 text-center">
                    <div className="text-center my-5">
                        <button className="px-5 my-5 btn btn-primary" onClick={this.saveDataToParent}>ADD</button>
                    </div>
                </div>
                <div className="col-4">
                    <div className="row mt-5 ml-5">
                        <div className="col-6">
                            <h5>Device Name</h5>
                        </div>
                        <div className="col-6">
                            <h5>Delete</h5>
                        </div> 
                    </div>
                    {
                        device.map((ele,i) => {
                            return <DeviceInfo key={i} data={ele.deviceType} deleteDeviceData={this.deleteDeviceData} id={i} updateFieldData={this.updateFieldData}/>
                        })
                    }
                </div>
                <div className="col-1">
                    <div className="text-center my-5 pr-2">
                        <button className="px-2 my-5 btn btn-primary" onClick={this.getAllData}>Upload</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Hoc;
