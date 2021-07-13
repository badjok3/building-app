import Popup from 'reactjs-popup';

let BuildingRow = (props) => {
    return (
        <div className='building-item'>
            <div className='col-lg-2 col-md-2'>{props.id}</div>
            <div className='col-lg-2 col-md-2'>{props.name}</div>
            <div className='col-lg-2 col-md-2'>{props.area}</div>
            <div className='col-lg-2 col-md-2'>{props.location}</div>
            <img src={props.image} className='building-img' alt='Building' />

            <Popup trigger={<button className='btn btn-primary'>Update</button>}
                        position="left center"
                        modal
                        nested
                        onOpen={() => document.getElementById('root').style = 'filter: blur(4px);'}
                        onClose={() => document.getElementById('root').style = ''}
            >
                            {close =>(
                        <form className='add-form' onSubmit={close}>
                            <label>
                                Name:
                            <input type="text" required onChange={(e) => props.updateBuilding(e, 'name', props.id)} name='name' value={props.name} />
                            </label>
                            <label>
                                Area:
                            <input type="text" required onChange={(e) => props.updateBuilding(e, 'area', props.id)} name='area' value={props.area} />
                            </label>
                            <label>
                                Location:
                            <input type="text" onChange={(e) => props.updateBuilding(e, 'location', props.id)} name='location' value={props.location} />
                            </label>
                            <label>
                                <span className='box sb4'>Enter either '1', '2' or '3'. <br /> If deleted, an image will be automatically assigned.</span>
                                Image:
                            <input 
                                type="text"
                                name='image' 
                                onFocus={() => document.getElementsByClassName('sb4')[0].style = 'display: flex;position: absolute;margin-top: -23%;margin-left: -10%;'} 
                                onBlur= {() => document.getElementsByClassName('sb4')[0].style = 'display:none'} 
                                onChange={(e) => props.updateBuilding(e, 'image', props.id)} 
                                value={props.image.replace(/[.jpg/]/g, '')} 
                            />
                            </label>

                            <button className='btn btn-primary form-add-btn' type='submit'>Update</button>
                        </form>
                            )}
            </Popup>

            <button className='btn btn-danger' onClick={() => props.deleteBuilding(props.id)}>Delete</button>
        </div>
    );
}

export default BuildingRow;