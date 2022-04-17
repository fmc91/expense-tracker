import React, { useState } from "react";
import styles from "./DataTable.module.css";

export default function DataCell(props) {

    const [value, setValue] = useState(props.value);

    if (value !== props.value)
        setValue(props.value);

    const formattedValue = props.format ? props.format(value) : String(value);

    return (
        <td className={styles.tableCell}>{formattedValue}</td>
    );
}