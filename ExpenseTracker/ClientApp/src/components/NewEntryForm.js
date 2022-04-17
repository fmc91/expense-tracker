import React, { useContext, useState } from "react";
import DataContext from "../context/data-context";
import InputGroup from "./InputGroup";
import buttonStyles from "./button.module.css";
import styles from "./NewEntryForm.module.css";

export default function NewEntryForm(props) {

    const dataContext = useContext(DataContext);

    const [description, setDescription] = useState({
        value: "",
        isInputValid: false,
        cleanState: true
    });

    const [date, setDate] = useState({
        value: null,
        isInputValid: false,
        cleanState: true
    });

    const [recipient, setRecipient] = useState({
        value: "",
        isInputValid: false,
        cleanState: true
    });

    const [amount, setAmount] = useState({
        value: 0,
        isInputValid: false,
        cleanState: true
    });

    const [forceShowValidation, setForceShowValidation] = useState(false);

    function handleAddButtonClick() {

        if (!description.isInputValid || !recipient.isInputValid || !date.isInputValid || !amount.isInputValid)
        {
            setForceShowValidation(true);
            return;
        }

        dataContext.addEntry({
            description: description.value,
            date: date.value,
            recipient: recipient.value,
            amount: amount.value
        });

        setDescription({
            value: "",
            isInputValid: false,
            cleanState: true
        });

        setDate({
            value: null,
            isInputValid: false,
            cleanState: true
        });

        setRecipient({
            value: "",
            isInputValid: false,
            cleanState: true
        });

        setAmount({
            value: 0,
            isInputValid: false,
            cleanState: true
        });

        setForceShowValidation(false);

        props.onDismiss();
    }

    const dateValueConverter = {
        convert: v => v ? new Date(v) : null,
        convertBack: v => v ? v.toISOString().split("T")[0] : ""
    };

    const numberValueConverter = {
        convert: v => Number(v),
        convertBack: v => String(v)
    };

    return (
        <div className={styles.formContainer}>
            <h3>New Entry</h3>
            <div className={styles.inputArea}>
                <InputGroup 
                    label="Description" type="text"
                    value={description.value} onValueChanged={v => setDescription(prev => ({...prev, value: v}))}
                    onRaiseValidationError={() => setDescription(prev => ({...prev, isInputValid: false}))}
                    onUnraiseValidationError={() => setDescription(prev => ({...prev, isInputValid: true}))}
                    onStateUnclean={() => setDescription(prev => ({...prev, cleanState: false}))}
                    validate={s => s.trim().length != 0}
                    validationMessage="Please enter a non-empty description."
                    cleanState={description.cleanState}
                    forceShowValidation={forceShowValidation}/>
                <InputGroup 
                    label="Date" type="date"
                    value={date.value} onValueChanged={v => setDate(prev => ({...prev, value: v}))}
                    onRaiseValidationError={() => setDate(prev => ({...prev, isInputValid: false}))}
                    onUnraiseValidationError={() => setDate(prev => ({...prev, isInputValid: true}))}
                    onStateUnclean={() => setDate(prev => ({...prev, cleanState: false}))}
                    valueConverter={dateValueConverter}
                    validate={v => !!v}
                    validationMessage="Please enter a valid date."
                    cleanState={date.cleanState}
                    forceShowValidation={forceShowValidation}/>
                <InputGroup 
                    label="Recipient" type="text"
                    value={recipient.value} onValueChanged={v => setRecipient(prev => ({...prev, value: v}))}
                    onRaiseValidationError={() => setRecipient(prev => ({...prev, isInputValid: false}))}
                    onUnraiseValidationError={() => setRecipient(prev => ({...prev, isInputValid: true}))}
                    onStateUnclean={() => setRecipient(prev => ({...prev, cleanState: false}))}
                    validate={s => s.trim().length != 0}
                    validationMessage="Please enter a non-empty recipient."
                    cleanState={recipient.cleanState}
                    forceShowValidation={forceShowValidation}/>
                <InputGroup 
                    label="Amount" type="number"
                    value={amount.value} onValueChanged={v => setAmount(prev => ({...prev, value: v}))}
                    onRaiseValidationError={() => setAmount(prev => ({...prev, isInputValid: false}))}
                    onUnraiseValidationError={() => setAmount(prev => ({...prev, isInputValid: true}))}
                    onStateUnclean={() => setAmount(prev => ({...prev, cleanState: false}))}
                    validate={v => v > 0}
                    validationMessage="Please enter a value greater than zero."
                    valueConverter={numberValueConverter}
                    cleanState={amount.cleanState}
                    forceShowValidation={forceShowValidation}/>
            </div>
            <button className={buttonStyles.button + " " + buttonStyles.primary}
                onClick={handleAddButtonClick}>
                Add
            </button>
            <button className={buttonStyles.button + " " + buttonStyles.secondary}
                onClick={props.onDismiss}>
                Cancel
            </button>
        </div>
    );
}