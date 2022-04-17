import React, { useState, useEffect } from "react";
import styles from "./DataTable.module.css";

export default function DataCellInput(props) {

    const [state, setState] = useState({
        value: props.value,
        isInputValid: props.validate ? props.validate(props.value) : true,
        cleanState: props.cleanState ?? true,
        forceShowValidation: props.forceShowValidation ?? false
    });

    useEffect(() => {
        if (state.value !== props.value)
            setState(prev => ({ ...prev, value: props.value }));
    }, [props.value]);

    useEffect(() => {
        if (state.cleanState !== props.cleanState ?? true)
            setState(prev => ({ ...prev, cleanState: props.cleanState ?? true }));
    }, [props.cleanState]);

    useEffect(() => {
        if (state.forceShowValidation !== props.forceShowValidation ?? false)
            setState(prev =>
                ({...prev, forceShowValidation: props.forceShowValidation ?? false }));
    }, [props.forceShowValidation]);

    useEffect(() => {
        if (props.onValueChanged)
            props.onValueChanged(state.value);

        runValidation();
    }, [state.value]);

    useEffect(() => {
        if (state.isInputValid && props.onUnraiseValidationError)
            props.onUnraiseValidationError();
        else if (!state.isInputValid && props.onRaiseValidationError)
            props.onRaiseValidationError();
    }, [state.isInputValid]);

    function runValidation() {
        const isInputValid = props.validate ? props.validate(state.value) : true;

        if (isInputValid !== state.isInputValid)
            setState(prev => ({ ...prev, isInputValid: isInputValid }));
    }

    function handleInputBlur() {
        setState(prev => ({ ...prev, cleanState: false}));
        if (props.onStateUnclean) props.onStateUnclean();
    }

    function handleValueChanged(ev) {

        const value = props.valueConverter?.convert ?
            props.valueConverter.convert(ev.target.value) :
            ev.target.value;

        setState(prev => ({ ...prev, value: value }));
    }

    const showValidation = (state.forceShowValidation || !state.cleanState) && !state.isInputValid;

    const className = `${styles.dataCellInput} ${showValidation ? styles.input__error : undefined}`;

    const value = props.valueConverter?.convertBack ?
        props.valueConverter.convertBack(state.value) :
        String(state.value ?? "");

    return (
        <td className={styles.tableCell}>
            <input
                className={className}
                type={props.type} value={value}
                onChange={handleValueChanged} onBlur={handleInputBlur}/>
        </td>
    );
}