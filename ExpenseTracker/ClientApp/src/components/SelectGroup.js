import React, { useState } from "react";

export default function SelectGroup(props) {

    const selectedValueTemp = props.valueConverter?.convertBack ?
        props.valueConverter.convertBack(props.selectedValue) :
        String(selectedValue);

    const [selectedValue, setSelectedValue] = useState(selectedValueTemp);

    if (selectedValue !== props.selectedValue)
        setSelectedValue(selectedValueTemp);

    return (
        <div>
            <label>{props.label}</label>
            <select value={selectedValue}>
                
            </select>
        </div>
    )
}