import React, { Fragment, useEffect, useState } from "react";
import dateService from "../services/date.service";

const HistoricDates = (props) => {
    const dater = props.dater;
    const [dates, setDates] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        dateService.findAllByDater(dater.id)
        .then(response => {
            if(response.status === 200) {
                setDates(response.data.dates)
            } else {
                setError(`No history for this dater`);
            }
        })
    }, [dater.id])

    return (
        <Fragment>
            <h3>historique du dater</h3>
            <ul>
            {
                // If dater has dates
                dates.length > 0
                ?
                // True
                dates.map((date, index) => {
                    return (
                        <li key={index}>
                            { date.id } { date.createdAt } -&gt; { date.endedAt }
                        </li>
                    )
                })
                :
                // False
                <Fragment>{error}</Fragment>
            }
            </ul>
        </Fragment>
    )
}

export default HistoricDates;