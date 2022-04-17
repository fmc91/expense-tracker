import React, { useEffect, useState } from "react";
import styles from "./InputGroup.module.css";

export default function InputGroup(props) {

    const [state, setState] = useState({
        value: props.value,
        isInputValid: !props.validate,
        cleanState: props.cleanState ?? true,
        forceShowValidation: props.forceShowValidation ?? false
    });

    useEffect(() => {
        if (props.onValueChanged)
            props.onValueChanged(state.value);

        runValidation();
    }, [state.value]);

    useEffect(() => {
        if (state.isInputValid && props.onUnraiseValidationError)
            props.onUnraiseValidationError();
        else if (props.onRaiseValidationError)
            props.onRaiseValidationError();
    }, [state.isInputValid]);

    useEffect(() => {
        if (state.cleanState !== (props.cleanState ?? true))
            setState(prev => ({ ...prev, cleanState: props.cleanState ?? true }));
    }, [props.cleanState]);

    useEffect(() => {
        if (state.value !== props.value)
            setState(prev => ({ ...prev, value: props.value }));
    }, [props.value]);

    useEffect(() => {
        if (state.forceShowValidation !== (props.forceShowValidation ?? false))
            setState(prev => ({...prev, forceShowValidation: (props.forceShowValidation ?? false) }));
    }, [props.forceShowValidation]);

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

    const value = props.valueConverter?.convertBack ? props.valueConverter.convertBack(state.value) : String(state.value);
    const showValidation = (state.forceShowValidation || !state.cleanState) && !state.isInputValid;

    const className = `${styles.inputGroup} ${props.className}`;

    return (
        <div className={className}>
            {props.label && <label>{props.label}</label>}
            <input
                className={showValidation ? styles.input__error : undefined}
                type={props.type} value={value}
                onChange={handleValueChanged} onBlur={handleInputBlur}/>
            {showValidation && props.validationMessage &&
                <p className={styles.validationError}>{props.validationMessage}</p>}
        </div>
    );
}