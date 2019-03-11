import React, { Component } from 'react';


class DeviceInfo extends Component {
    deleteField = (id) =>{
        this.props.deleteDeviceData(id);
    }
    updateField = (id) =>{
        this.props.updateFieldData(id);
    }
    render() {
        const { data } = this.props;
        return (
            <div>
                <div className="row mt-3 ml-5">
                    <div className="col-6">
                        <div className="btn btn-dark text-white" onClick={() => this.updateField(this.props.id)}>45_{data.device_Type}_{data.deviceId}</div>
                    </div>
                    <div className="col-6">
                        <button onClick={() => this.deleteField(this.props.id)} className="btn btn-danger">Delete</button>
                    </div> 
                </div>
            </div>
        );
    }

}

export default DeviceInfo;
