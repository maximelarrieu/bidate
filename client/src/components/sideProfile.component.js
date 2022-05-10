import React, { Fragment } from "react";
import { calculateAge } from "../helpers/calculateAge";

const SideProfile = (props) => {
    const dater = props.dater
    const error = props.error

    return (
        <div className="shadow-lg p-3 mb-5 rounded text-center">
            {
                // If dater was found
                dater !== undefined
                ?
                // True
                <Fragment>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWIQtvI4R2veBQody_-coonotC4wtVntt5QCH-ACKXtMnfF5zy7vgqKj-84TGT3GoCD_o&usqp=CAU" className="card-img-top" alt="siuuuuu" />
                    <h3 className="page-subtitle mt-3">{dater.username}</h3>
                    <h4>{calculateAge(dater.birthdate)} ans</h4>
                </Fragment>
                :
                // False
                <h3>{error}</h3>
            }
        </div>
    )
}

export default SideProfile;