import React, { Fragment, useEffect, useState } from "react";
import HistoricDates from "./historicDates.component";
import ADate from "./date.component";
import SideProfile from "./sideProfile.component";
import authService from "../services/auth.service";
import userService from "../services/user.service";
import dateService from "../services/date.service";
import { useParams } from 'react-router-dom';

const Dater = (props) => {
    const { id } = useParams();
    // const [date, setDate] = useState();
    // const [remaining, setRemaining] = useState();
    // const [isEnded, setIsEnded] = useState();
    const [dater, setDater] = useState();
    const currentUser = authService.getCurrentUser();
    const [error, setError] = useState()

    useEffect(() => {
        userService.getUser(id)
        .then(response => {
            if(response.status === 200) {
                console.log('response dater', response.data)
                setDater(response.data.dater);
            } else {
                setError(`Dater not found`);
            }
        })
        .catch(err => {
            console.log('response wtf', err)
        });
    }, [id]);

    // useEffect(() => {
    //     dateService.getCurrentDate(id)
    //     .then(response => {
    //         if(response.status === 200) {
    //             setDate(response.data.date)
    //         } else {
    //             setError(`No current date`);
    //         }
    //     })
    //     .catch(err => {
    //         console.log('ERROR', err)
    //     })
    // }, [id])

    console.log('dater in dater component', dater)

    return (
        <Fragment>
        <h5>dater page</h5>
            <div className="row">
                <div className="col-sm-12 col-md-3 col-lg-3 col-xl-2">
                    {
                        dater !== undefined
                        ?
                        <SideProfile dater={dater} error={error} />
                        :
                        <p>{error}</p>
                    }
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6 col-xl-8">
                    {
                        dater !== undefined
                        ?
                            // date !== undefined
                            // ?
                            // <Fragment>
                            <ADate dater={dater} currentUser={currentUser} error={error} />
                            // </Fragment>
                            // :
                            // <Fragment>{error}</Fragment>
                        :
                        <p>{error}</p>
                    }
                </div>
                <div className="col-sm-12 col-md-3 col-lg-3 col-xl-2 border p-2">
                    {
                        dater !== undefined
                        ?
                        <HistoricDates dater={dater} error={error} />
                        :
                        <p>{error}</p>
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default Dater;