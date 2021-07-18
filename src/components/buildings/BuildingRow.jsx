import { Component } from 'react';
import Popup from 'reactjs-popup';
import createNotification from '../services/NotificationService';

class BuildingRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showExit: false,
            animationClass: [
                'animate__animated'
            ]
        };
    }

    addExitAnimation() {
        let cuurentAnimationClass = this.state.animationClass.slice();
        cuurentAnimationClass.push('animate__backOutDown');

        this.setState({animationClass: cuurentAnimationClass});
    }

    render() {
            return (
                <div                 
                    className={`building-item ${this.state.animationClass.join(' ')}`}
                    id={this.props.id}
                >
                    
                    <div className='col-lg-1 col-md-1'>{this.props.id}</div>
                    <div className='col-lg-2 col-md-2'>{this.props.name}</div>
                    <div className='col-lg-1 col-md-1'>{this.props.area}</div>
                    <div className='col-lg-2 col-md-2'>{this.props.location}</div>
                    <img src={this.props.image} className='building-img' alt='Building' />

                    <div className='row col-lg-2 col-md-2 building-actions'>
                    <Popup trigger={<button className='btn btn-primary btn-action'>Update</button>}
                                position="left center"
                                modal
                                nested
                                onOpen={() => document.getElementById('root').style = 'filter: blur(4px);'}
                                onClose={() => document.getElementById('root').style = ''}
                    >
                                    {close =>(
                                <form className='update-form' onSubmit={(e) => {this.props.updateBuilding(e); close();}}>
                                    <label>
                                        Name* :
                                        <input type='text' required onChange={(e) => this.props.updateField(e, 'name', this.props.id)} name='name' value={this.props.name} />
                                    </label>
                                    <label>
                                        Area* :
                                        <input type='text' required onChange={(e) => this.props.updateField(e, 'area', this.props.id)} name='area' value={this.props.area} />
                                    </label>
                                    <label>
                                        Location:
                                        <input type='text' onChange={(e) => this.props.updateField(e, 'location', this.props.id)} name='location' value={this.props.location} />
                                    </label>
                                    <label>
                                        <span className='box sb4'>Enter either '1', '2' or '3'. <br /> If deleted, an image will be automatically assigned.</span>
                                        Image:
                                        <input
                                            type='text'
                                            name='image' 
                                            onFocus={() => document.getElementsByClassName('sb4')[0].style = 'display: flex;position: absolute;margin-top: -23%;margin-left: -10%;'} 
                                            onBlur= {() => document.getElementsByClassName('sb4')[0].style = 'display:none'} 
                                            onChange={(e) => this.props.updateField(e, 'image', this.props.id)} 
                                            value={this.props.image.replace(/[.jpg/]/g, '')} 
                                        />
                                    </label>

                                    <button className='btn btn-primary btn-add-form' type='submit' onClick={() => { if (!this.props.name || !this.props.area) return; createNotification('success', `${this.props.name} building updated successfully!`)} }>Update</button>
                                    
                                </form>
                                )}
                    </Popup>

                    <button 
                        className='btn btn-danger btn-action' 
                        onClick={() => {
                            this.addExitAnimation();

                            setTimeout(() => {
                                this.props.deleteBuilding(this.props.id);
                                createNotification('info', `${this.props.name} building has been deleted!`);
                            }, 550);
                            }}>
                                Delete
                    </button>
                </div>
            </div>);
        }
}

export default BuildingRow;