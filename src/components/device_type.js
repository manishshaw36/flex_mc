import React, { Component } from 'react';


class DeviceType extends Component {
    state = {
        ipAddress: null,
        port: null,
        unitId: null,
        device_Type: "Inverter",
        deviceId: null
    }
    componentWillReceiveProps(props){
        const { reset, deviceData } = props;
        if(reset){
            this.setState({
                ipAddress: null,
                port: null,
                unitId: null,
                device_Type: "Inverter",
                deviceId: null
            })
            document.getElementById("err").innerHTML = "Enter perfect IP Address. Must have four Octets ranging[0-255] seperated by ' . '";
            document.getElementById("err").style.color = "black";
        }
        if(deviceData !== null){
            this.setState({
                ipAddress: deviceData.ipAddress,
                port: deviceData.port,
                unitId: deviceData.unitId,
                device_Type: deviceData.device_Type,
                deviceId: deviceData.deviceId
            })
            document.getElementById("err").innerHTML = "Enter perfect IP Address. Must have four Octets ranging[0-255] seperated by ' . '";
            document.getElementById("err").style.color = "black";
        }
    }
    updateInputValue = (type) => (evt) => {
        const value = evt.target.value;
        var numberReg = /^[0-9]*$/gm;

        if (type === 'ipAddress') {
            document.getElementById("err").style.color = "blue";
        }
        if (((type === 'port')||(type === 'unitId')||(type === 'deviceId')) && value !== '' && !numberReg.test(value)) {
            return null;
        }
        this.setState({ [type]: value });
    }

    updateValue = (type) => (evt) => {
        const value = evt.target.value;
        var ipAddressReg = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/gm;
        if(type === 'ipAddress'){
            if(ipAddressReg.test(value)){
                document.getElementById("err").innerHTML = "Perfect IP Address";
                document.getElementById("err").style.color = "green";
            }
            else{
                document.getElementById("err").style.color = "red";
            }
        }
        this.setState({ [type]: value });
    }
    getData() {
        let { ipAddress, port, unitId, device_Type, deviceId} = this.state;
        var ipAddressReg = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/gm;
        if(!ipAddressReg.test(ipAddress)){
            ipAddress = null;
        }
        return {
            ipAddress,
            port,
            unitId,
            device_Type,
            deviceId
        }
    }
    
    render() {
        const { ipAddress, port, unitId, deviceId, device_Type } = this.state;
        return (
            <div className="row">
                <div className="col-4 mt-5">
                    <input type="text" id="ip" placeholder="IP Address" className="form-control" value={ipAddress || ""} onChange={this.updateInputValue('ipAddress')} onBlur={this.updateValue('ipAddress')}/>
                    <label id="err">Enter perfect IP Address. Must have four Octets ranging[0-255] seperated by ' . '</label>
                </div>
                <div className="col-4 mt-5 text-center">
                    <input type="text" placeholder="Port" className="w-50 form-control" value={port || ""} onChange={this.updateInputValue('port')}/>
                </div>
                <div className="col-4 mt-5">
                    <input type="text" placeholder="Unit ID" className="w-75 form-control" value={unitId || ""} onChange={this.updateInputValue('unitId')} />
                </div>
                <div className="col-6 mt-5" >
                    <select onChange={this.updateInputValue('device_Type')} value={device_Type || ""} className='w-100 form-control'>
                        <option>Inverter</option>
                        <option>MFM</option>
                        <option>WMS</option>
                    </select>
                    <label id="deviceErr">Select Device Type</label>
                </div>
                <div className="col-6 mt-5">
                    <input type="text" placeholder="Device ID" value={deviceId || ""} onChange={this.updateInputValue('deviceId')} className="form-control"/>
                </div>
            </div>
        );
    }

}

export default DeviceType;
