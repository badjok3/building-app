import { isUndefined } from 'lodash';
import React, { Component } from 'react';
import Popup from 'reactjs-popup';

import { NotificationContainer } from 'react-notifications';
import createNotification from '../services/NotificationService';

import Header from '../common/Header';
import BuildingRow from './BuildingRow';

class Buildings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            buildings: [
                {
                    id: 1,
                    name: 'Windsor',
                    area: 1500,
                    location: 'Lorem Ipsum, 15 str',
                    image: '/1.jpg'
                },
                {
                    id: 2,
                    name: 'Astoria',
                    area: 5000,
                    location: 'Lorem Ipsum, 16 str',
                    image: '/2.jpg'
                },
                {
                    id: 3,
                    name: 'Blue Lagoon',
                    area: 7500,
                    location: 'Lorem Ipsum, 17 str',
                    image: '/3.jpg'
                }
            ]
        };
    }

    updateField = (e, inputType, id) => {
        if (isUndefined(e.target.value)) return;

        let currentBuildings = this.state.buildings.slice();
        currentBuildings.map(b => {
            if (!b.hasSnapshot) {
                b.buildingSnapshot = this.state.buildings.find(b => b.id === id);
                b.hasSnapshot = true;
            }

            if (b.id === id) {
                b[inputType] = inputType === "image" ?  `/${e.target.value || Math.ceil(Math.random() * 3)}.jpg` : e.target.value;
            }
            return b;
        });
        
        this.setState({buildings: currentBuildings});
    }

    deleteBuilding = (buildingId) => {
        let currentBuildings = this.state.buildings.slice();
        currentBuildings = currentBuildings.filter(b => b.id !== buildingId);
        
        this.setState({buildings: currentBuildings});
    }

    updateBuilding = (e) => {
        e.preventDefault();
        this.hasSnapshot = false;
        this.buildingSnapshot = {};
    }

    addBuilding = () => {
        let currentBuildings = this.state.buildings.slice(),
        id;
        
        // check if there are any available IDs and set them to the new building
        // this functionality makes sure the ID is unique
        for (let i = 1; i <= currentBuildings.length + 1; i++) {
            id = currentBuildings.find(b => b.id === i);
            if (isUndefined(id)) {
                id = i;
                break;
            }
        }

        let newBuilding = {
            id: id,
            name: document.getElementsByName('name')[0].value,
            area: document.getElementsByName('area')[0].value,
            location: document.getElementsByName('location')[0].value,
            image: document.getElementsByName('image')[0].value ? `/${document.getElementsByName('image')[0].value}.jpg` : `/${Math.ceil(Math.random() * 3)}.jpg`
        };

        currentBuildings.push(newBuilding);
        this.setState({buildings: currentBuildings});
    }

    deleteAll = () => {
        if (this.state.buildings.length === 0) {
            createNotification('error', 'Buildings list is already empty!');
            return;
        }

        let ghostTown = [];
        
        createNotification('warning', 'All buildings have been deleted!');
        this.setState({buildings: ghostTown});
    }

    render() {
        let style = {
            marginRight: '0',
            background: '#3d5063'
        };

        let boldStyle = {
            ...style,
            fontWeight: "bolder"
        };

        let actionStyle = {
            ...style,
            marginBottom: '3%'
        };

        return (
            <div>
                <Header />
                
                <div className='row mobile-actions' style={actionStyle}>
                    <Popup trigger={<button className='btn btn-primary btn-add main-btn col-lg-2 offset-lg-3'>Add</button>}
                            position="left center"
                            modal
                            nested
                            onOpen={() => document.getElementById('root').style = 'filter: blur(2px);'}
                            onClose={() => document.getElementById('root').style = ''}>
                            {close => (<form className='add-form' onSubmit={() => { this.addBuilding(); createNotification('success', 'Building added successfully!'); close(); }}>
                                    <label>
                                        Name* :
                                        <input type="text" required name='name' />
                                    </label>
                                    <label>
                                        Area* :
                                        <input type="text" required name='area' />
                                    </label>
                                    <label>
                                        Location:
                                        <input type="text" name='location' />
                                    </label>
                                    <label>
                                    <span className='box sb4'>Enter either '1', '2' or '3'. <br /> If left blank, an image will be automatically assigned.</span>
                                        Image:
                                    <input type="text"
                                        onFocus={() => document.getElementsByClassName('sb4')[0].style = 'display: flex;position: absolute;margin-top: -23%;margin-left: -10%;'} 
                                        onBlur= {() => document.getElementsByClassName('sb4')[0].style = 'display:none'} 
                                        name='image' />
                                    </label>

                                    <button className='btn btn-primary btn-add btn-add-form' type='submit'>Add</button>
                                </form>
                            )}
                        </Popup>

                        <Popup trigger={<button className='btn btn-danger main-btn col-lg-2 offset-lg-2'>Delete All</button>}
                            position="left center"
                            modal
                            nested
                            onOpen={() => document.getElementById('root').style = 'filter: blur(2px);'}
                            onClose={() => document.getElementById('root').style = ''}>

                                {close => (
                                    <span className='alert alert-danger'>Are you sure you want to delete all buildings?
                                        <button className='btn btn-danger btn-del-all-confirm' onClick={() => { this.deleteAll(); close();}}>Yes, Delete All</button>
                                        <button className='btn btn-secondary btn-del-all-deny' onClick={close}>No</button>
                                    </span>
                                )}
                        </Popup>
                    </div>

                    <div className='mobile-wrap'>
                        <div className='row mobile-hide' style={boldStyle}>
                            <div className='table-header-item offset-lg-1 col-lg-1 col-md-2'>ID</div>
                            <div className='table-header-item col-lg-2 col-md-2'>NAME</div>
                            <div className='table-header-item col-lg-1 col-md-2'>AREA</div>
                            <div className='table-header-item col-lg-2 col-md-2'>LOCATIONS</div>
                            <div className='table-header-item col-lg-2 col-md-2'>IMAGE</div>
                            <div className='table-header-item col-lg-2 col-md-2'>ACTIONS</div>
                        </div>

                        <div className='row' style={style}>
                            {this.state.buildings.map((building, index) => {
                                return <BuildingRow
                                    key={building.id}
                                    row={index}
                                    id={building.id}
                                    name={building.name}
                                    area={building.area}
                                    location={building.location} 
                                    image={building.image}
                                    deleteBuilding={(id) => this.deleteBuilding(id)}
                                    updateField={(e, inputType, id) => this.updateField(e, inputType, id)}
                                    updateBuilding={(e) => this.updateBuilding(e)}
                                />
                            })}
                        </div>
                </div>
                <NotificationContainer/>
            </div>
        );
    }
}

export default Buildings;