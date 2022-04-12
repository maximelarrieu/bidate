import React, { Fragment } from "react";
import { calculateAge } from "../helpers/calculateAge";

const SideProfile = (props) => {
    const dater = props.dater
    const error = props.error

    return (
        <Fragment>
            <h3>Dater:</h3>
            {
                // If dater was found
                dater !== undefined
                ?
                // True
                <Fragment>
                <h3>{dater.username}</h3>
                <h4>{calculateAge(dater.birthdate)} ans</h4>
                <ul>
                    <b>type:</b>
                    <li>{dater.type.name}</li>
                    <b>role(s):</b>
                    {dater.roles.map((role, index) => {
                        return (
                            <li key={index}>{role.name}</li>
                        )
                    })}
                </ul>
                </Fragment>
                :
                // False
                <h3>{error}</h3>
            }
        </Fragment>
    )
}

export default SideProfile;