import React, { useEffect, useState } from "react";

export default function ToggleButton(props) {
    
    const [checked, setChecked] = useState(props.checked === undefined ? false : props.checked);

    useEffect(() => {
        if (props.checked !== undefined && checked !== props.checked)
            setChecked(props.checked);
    }, [props.checked]);

    useEffect(() =>
    {
        if (props.onCheckedChanged)
            props.onCheckedChanged(checked);
     }, [checked]);

    function handleClick() {
        setChecked(prev => !prev);
        console.log(checked);
    }
    
    return (
        <div className={props.className} onClick={handleClick} ischecked={checked ? "" : undefined}>
                {props.children}
        </div>
    );
}