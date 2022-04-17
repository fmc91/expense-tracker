import React, { useEffect, useState } from "react";
import DataCell from "./DataCell";
import styles from "./DataTable.module.css";
import tickIcon from "../assets/tick.png";
import crossIcon from "../assets/cross.png";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";

export default function DataRow(props) {

    const [editMode, setEditMode] = useState(false);
    const [data, setData] = useState(props.data);
    const [inputState, setInputState] = useState(null);

    const [forceShowValidation, setForceShowValidation] = useState(false);

    useEffect(() => {
        if (data !== props.data)
            setData(props.data);
    }, [props.data]);

    function handleEdit() {
        const temp = {};

        for (const col of props.columns) {
            temp[col.propertyName] = {
                value: data[col.propertyName],
                isInputValid: true,
                cleanState: true
            };
        }

        setInputState(temp);
        setEditMode(true);
    }

    function handleCancelEdit() {
        setForceShowValidation(false);
        setEditMode(false);
        setInputState(null);
    }

    function handleSaveEdit() {
        
        for (const col of props.columns) {
            if (!inputState[col.propertyName].isInputValid) {
                setForceShowValidation(true);
                return;
            }
        }

        setForceShowValidation(false);
        setEditMode(false);

        const result = {};
        result.expenseId = data.expenseId;

        for (const col of props.columns)
            result[col.propertyName] = inputState[col.propertyName].value;

        props.onEdit(result);
    }

    function handleDelete() {
        setForceShowValidation(false);
        setEditMode(false);
        setInputState(null);
        props.onDelete();
    }

    function handleValueChanged(propName, newValue) {
        setInputState(prev => ({ ...prev, [propName]: { ...prev[propName], value: newValue } }));
    }

    function handleValidationStateChanged(propName, isValid) {
        setInputState(prev => ({ ...prev, [propName]: { ...prev[propName], isInputValid: isValid } }));
    }

    function handleStateUnclean(propName) {
        setInputState(prev => ({ ...prev, [propName]: { ...prev[propName], cleanState: false } }));
    }

    const dataCells = props.columns.map((col, i) => editMode ?
        <col.inputTemplate
            key={i}
            value={inputState[col.propertyName].value}
            onValueChanged={newVal => handleValueChanged(col.propertyName, newVal)}
            onRaiseValidationError={() => handleValidationStateChanged(col.propertyName, false)}
            onUnraiseValidationError={() => handleValidationStateChanged(col.propertyName, true)}
            onStateUnclean={() => handleStateUnclean(col.propertyName)}
            forceShowValidation={forceShowValidation}
            cleanState={inputState[col.propertyName].cleanState}/> :
        <DataCell key={i} format={col.format} value={data[col.propertyName]}/>
    );

    const buttonsCell = (
        <td className={styles.tableCell}>
            <div className={styles.buttonContainer}>
                {!editMode && <img src={editIcon} className={styles.rowFunction} onClick={handleEdit}/>}
                {editMode && <img src={tickIcon} className={styles.rowFunction} onClick={handleSaveEdit}/>}
                {editMode && <img src={crossIcon} className={styles.rowFunction} onClick={handleCancelEdit}/>}
                {editMode && <img src={deleteIcon} className={styles.rowFunction} onClick={handleDelete}/>}
            </div>
        </td>
    );

    return (
        <tr className={styles.dataRow}>{dataCells}{buttonsCell}</tr>
    );
}