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
        <div className="shadow-lg p-3 mb-5 rounded text-center">
            <h3 className="page-subtitle">Dater historic</h3>
            <label className="mt-2">ended at </label>
            <ul className="list-group">
            {
                // If dater has dates
                dates.length > 0
                ?
                // True
                dates.map((date, index) => {
                    return (
                        <li key={index} className="list-group-item">
                            { new Date(date.endedAt).toISOString().slice(0, 19).replace('T', ' ') }
                        </li>
                    )
                })
                :
                // False
                <Fragment>{error}</Fragment>
            }
            </ul>
        </div>
    )
}

export default HistoricDates;