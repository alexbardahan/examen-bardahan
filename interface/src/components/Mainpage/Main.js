import { useEffect, useState} from 'react'
import Axios from "axios";
import './Main.css';
import Popup from './Popup';
import Search from './Search';



const Main = () => {
    const [spacecrafts, setSpacecrafts]=useState([]);
    const [astronauts, setAstronauts]=useState([]);
    const [searchText, setSearchText] = useState('')



	useEffect(()=>{
		Axios.get("http://localhost:6060/api/getSpacecraft").then(response=>{   
			console.log(response.data)         
			setSpacecrafts(response.data);        
        })
                 Axios.get("http://localhost:6060/api/getAstronaut").then(response=>{   
			console.log(response.data)         
			setAstronauts(response.data);        
        })
	},[])

        const addSpacecraft = (name,speed, mass) => {
		const newSpacecraft = {
                        name:name,
                        speed:speed,
                        mass:mass,
		}
		Axios.post('http://localhost:6060/api/postSpacecraft',newSpacecraft).then(response=>{
			console.log("1:"+response.data);

		})
		
                const newSpacecrafts=[...spacecrafts,newSpacecraft]
		setSpacecrafts(newSpacecrafts)
	}

        //delete spacecraft by id

        const [spacecraftId, setSpacecraftId] = useState('')
        const handleSpacecraftId = (event) => {
                setSpacecraftId(event.target.value)
        }

        const deleteSpacecraftId = (id) => {
		Axios.delete('http://localhost:6060/api/deleteSpacecraft/'+spacecraftId).then(response=>{   
			// console.log(response.data)
			window.location.reload(false)
        })
	}

        //delete astronaut by id

        const [astronautId, setAstronautId] = useState('')
        const handleAstronautId = (event) => {
                setAstronautId(event.target.value)
        }

        const deleteAstronautId = (id) => {
		Axios.delete('http://localhost:6060/api/deleteAstronaut/'+astronautId).then(response=>{   
			// console.log(response.data)
			window.location.reload(false)
        })
	}




        const [spacecraftName, setSpacecraftName] = useState('')
        const [spacecraftSpeed, setSpacecraftSpeed]=useState('')
        const [spacecraftMass, setSpacecraftMass]=useState('')
        const handleChangeNameSpacecraft = (event) => {
                setSpacecraftName(event.target.value)
        }
        const handleChangeSpeedSpacecraft = (event) => {
                setSpacecraftSpeed(event.target.value)
        }
        const handleChangeMassSpacecraft = (event) => {
                setSpacecraftMass(event.target.value)
        }
    
        const handleSubmit = () => {
                if(spacecraftName.length>2 && parseInt(spacecraftSpeed)>1000 &&parseInt(spacecraftMass)>200){

                addSpacecraft(spacecraftName,spacecraftSpeed,spacecraftMass)
                setSpacecraftName('')
                setSpacecraftSpeed('')
                setSpacecraftMass('')
                togglePopupSpacecraft()
                }
        }

        const [isOpenSpacecraft, setIsOpenSpacecraft] = useState(false);
 
        const togglePopupSpacecraft = () => {
          setIsOpenSpacecraft(!isOpenSpacecraft);
        }

        //astronaut

        const addAstronaut = (name,role, idSpacecraft) => {
		const newAstronaut = {
                        name:name,
                        role:role,
                        idSpacecraft:idSpacecraft
		}
		Axios.post('http://localhost:6060/api/postAstronaut',newAstronaut).then(response=>{
			console.log("1:"+response.data);

		})
		
                const newAstronauts=[...astronauts,newAstronaut]
		setAstronauts(newAstronauts)
	}

        const [astronautName, setAstronautName] = useState('')
        const [astronautRole, setAstronautRole]=useState('')
        const [astronautIdSpacecraft, setAstronautIdSpacecraft]=useState('')
        const handleChangeNameAstronaut = (event) => {
                setAstronautName(event.target.value)
        }
        const handleChangeRoleAstronaut = (event) => {
                setAstronautRole(event.target.value)
        }
        const handleChangeIdSpacecraftAstronaut = (event) => {
                setAstronautIdSpacecraft(event.target.value)
        }
    
        const handleSubmitAstronaut = () => {
                if(astronautName.length>4 && (astronautRole==="PILOT"||astronautRole==="COMMANDER") && astronautIdSpacecraft!=null){
                        addAstronaut(astronautName,astronautRole, astronautIdSpacecraft)
                        setAstronautName('')
                        setAstronautRole('')
                        togglePopupAstronaut()
                }
        }

        const [isOpenAstronaut, setIsOpenAstronaut] = useState(false);
 
        const togglePopupAstronaut = () => {
          setIsOpenAstronaut(!isOpenAstronaut);
        }




	return(

        <div className="container">
        <div className="table-wrapper">
        
        <h2>Spacecrafts</h2>
        <fieldset>
        <Search handleSearchNote={setSearchText} />
        <input type="radio" id="speed" name="type" value="speed" />
        <label for="html">Speed</label><br/>
        <input type="radio" id="mass" name="type" value="mass"/>
        <label for="css">Mass</label><br/><br/>
        <input type="radio" id="ASC" name="order" value="ASC"/>
        <label for="html">ASC</label><br/>
        <input type="radio" id="DESC" name="fav_languagorder" value="DESC"/>
        <label for="css">DESC</label><br/><br/>

        <div><button className="save-button" >Filtreaza+Sterge</button></div>

        </fieldset>

        
        <div className="spacecraft new">
                <span onClick={togglePopupSpacecraft} className="add-button"><p>+</p></span>
                {isOpenSpacecraft && <Popup content={<>
                    <textarea className="textarea-name" placeholder="Name" value={spacecraftName} onChange={handleChangeNameSpacecraft}></textarea>
                    <textarea className="textarea-speed" placeholder="Speed" value={spacecraftSpeed} onChange={handleChangeSpeedSpacecraft}></textarea>
                    <textarea className="textarea-mass" placeholder="Mass" value={spacecraftMass} onChange={handleChangeMassSpacecraft}></textarea>
                    <div><button className="save-button" onClick={handleSubmit}>Salveaza</button></div>
                </>}
                handleClose={togglePopupSpacecraft}
                />}
        </div>


                <table className="fl-table">
                <thead>
                        <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Speed</th>
                        <th>Mass</th>
                        </tr>
                </thead>
                <tbody>
                {spacecrafts.map((e)=><tr><td>{e.id}</td><td>{e.name}</td><td>{e.speed}</td><td>{e.mass}</td></tr>)}  
                </tbody>
                </table>
        {/* delete spacecraft */}
        <textarea className="textarea-delete" placeholder="Delete spacecraft by id" onChange={handleSpacecraftId}></textarea>
        <div><button className="delete-button" onClick={deleteSpacecraftId}>Delete</button></div>
        
        <h2>Astronauts</h2>
        <div className="astronauts new">
                <span onClick={togglePopupAstronaut} className="add-button"><p>+</p></span>
                {isOpenAstronaut && <Popup content={<>
                    <textarea className="textarea-name" placeholder="Name" value={astronautName} onChange={handleChangeNameAstronaut}></textarea>
                    <textarea className="textarea-role" placeholder="Role" value={astronautRole} onChange={handleChangeRoleAstronaut}></textarea>
                    <textarea className="textarea-role" placeholder="IdSpacecraft" value={astronautIdSpacecraft} onChange={handleChangeIdSpacecraftAstronaut}></textarea>
                     <div><button className="save-button" onClick={handleSubmitAstronaut}>Salveaza</button></div>
                </>}
                handleClose={togglePopupAstronaut}
                />}
        </div>
                <table className="fl-table">
                <thead>
                        <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>idSpacecraft</th>
                        </tr>
                </thead>
                <tbody>
                {astronauts.map((e)=><tr><td>{e.id}</td><td>{e.name}</td><td>{e.role}</td><td>{e.idSpacecraft}</td></tr>)}  
                </tbody>
                </table>
        {/* delete astronauts */}
        <textarea className="textarea-delete" placeholder="Delete astronaut by id" onChange={handleAstronautId}></textarea>
        <div><button className="delete-button" onClick={deleteAstronautId}>Sterge</button></div>
        
        </div>

        

        </div>

                
	)
}
export default Main;