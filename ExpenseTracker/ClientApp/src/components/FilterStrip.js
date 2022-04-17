import React from "react";
import InputGroup from "./InputGroup";
import { dateValueConverter } from "../value-converters";
import styles from "./FilterStrip.module.css";

export default function FilterStrip(props) {

    return (
        <div className={styles.filterGroup}>
            <div className={styles.textFilterGroup}>
                <InputGroup label="Filter by Description" type="text"
                    value={props.description} onValueChanged={props.onDescriptionChanged}/>
            </div>
            <div className={styles.dateFilterGroup}>
                <InputGroup className={styles.dateInputGroup}
                    label="Start Date" type="date"
                    value={props.startDate} onValueChanged={props.onStartDateChanged}
                    valueConverter={dateValueConverter}/>
                <InputGroup className={styles.dateInputGroup}
                    label="End Date" type="date"
                    value={props.endDate} onValueChanged={props.onEndDateChanged}
                    valueConverter={dateValueConverter}/>
            </div>
        </div>
    );
}