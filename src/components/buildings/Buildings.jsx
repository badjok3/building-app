import { isUndefined } from 'lodash';
import React, { Component } from 'react';
import Popup from 'reactjs-popup';

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
        }
    }

    deleteBuilding = (buildingId) => {
        let currentBuildings = this.state.buildings.slice();

        currentBuildings = currentBuildings.filter(b => b.id !== buildingId);
        this.setState({buildings: currentBuildings});
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

    updateBuilding = (e, inputType, id) => {
        let currentBuildings = this.state.buildings.filter(b => b.id !== id);
        let building = this.state.buildings.find(b => b.id === id);

        building[inputType] = inputType === "image" ?  `/${e.target.value || Math.ceil(Math.random() * 3)}.jpg` : e.target.value;
        currentBuildings.push(building);
        currentBuildings.sort((a, b) => a.id > b.id);

        this.setState({buildings: currentBuildings});
    }

    deleteAll = () => {
        let ghostTown = [];

        this.setState({buildings: ghostTown});
    }


    render() {
        return (
            <div>
                <Header />
                <div className='table-header-row col-lg-12 col-md-12'>
                    <div className='table-header-item col-lg-2 col-md-2'>Id</div>
                    <div className='table-header-item col-lg-2 col-md-2'>Name</div>
                    <div className='table-header-item col-lg-2 col-md-2'>Area</div>
                    <div className='table-header-item col-lg-2 col-md-2'>Location</div>
                    <div className='table-header-item col-lg-2 col-md-2'>Image</div>

                    <Popup trigger={<button className='btn btn-primary'>Add</button>}
                        position="left center"
                        modal
                        nested
                        onOpen={() => document.getElementById('root').style = 'filter: blur(2px);'}
                        onClose={() => document.getElementById('root').style = ''}>
                        {close => (<form className='add-form' onSubmit={() => { this.addBuilding(); close(); }}>
                                <label>
                                    Name:
                                <input type="text" required name='name' />
                                </label>
                                <label>
                                    Area:
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

                                <button className='btn btn-primary form-add-btn' type='submit'>Add</button>
                            </form>
                        )}
                    </Popup>

                    <Popup trigger={<button className='btn btn-danger'>Delete All</button>}
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

                    {this.state.buildings.map((building, index) => {
                        return <BuildingRow
                            key={index}
                            id={building.id}
                            name={building.name}
                            area={building.area}
                            location={building.location} 
                            image={building.image}
                            deleteBuilding={(e) => this.deleteBuilding(e)}
                            updateBuilding={(e, inputType, id) => this.updateBuilding(e, inputType, id)}
                        />
                    })}
                </div>
            </div>
        );
    }
}

export default Buildings;