import React, { useEffect, useState } from "react";
import authService from "../services/auth.service";
import userService from "../services/user.service";
import { calculateAge } from "../helpers/calculateAge";
import "../App.css";
import "../styles/daters.css"

const Daters = (props) => {
    const [daters, setDaters] = useState([])
    const currentUser = authService.getCurrentUser();
    const [error, setError] = useState()

    useEffect(() => {
        userService.getUsers()
        .then(response => {
            console.log('response', response)
            if(response.status === 200) {
                console.log('daters received.');
                setDaters(response.data.daters);
            } else {
                setError(`No dater founded`);
            }
        })
        .catch(error => {
            console.log(error);
        })
    }, [])

    return (
        <div className="container">
            <h3 className="center page-title mt-5">Daters</h3>
            <p className="center">Trouvez votre partenaire idéal</p>
            <div className="row mt-5">
                {
                    daters.length > 0
                    ?
                    daters.map((dater, index) => {
                        return(
                            <div key={index} className="col-sm-12 col-md-6 col-lg-3">
                                <a key={index} href={`/todate/${dater.id}`}>
                                    <div className="card" key={index}>
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWIQtvI4R2veBQody_-coonotC4wtVntt5QCH-ACKXtMnfF5zy7vgqKj-84TGT3GoCD_o&usqp=CAU" className="card-img-top" alt="siuuuuu" />
                                        <div className="card-body">
                                            <h5 className="card-title">{dater.username}</h5>
                                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        </div>
                                        <div className="card-footer text-muted">{calculateAge(dater.birthdate)} ans</div>
                                    </div>
                                </a>
                            </div>
                        )
                    })
                    :
                    <h4>{error}</h4>
                }
            </div>
        </div>
    )

}

export default Daters;
