import React from "react";
import ToggleButton from "./ToggleButton";
import buttonStyles from "./button.module.css";
import styles from "./ButtonStrip.module.css";
import funnelIcon from "../assets/funnel.png";

export default function ButtonStrip(props) {

    return (
        <div className={styles.buttonStrip}>
            <div className={styles.undocked}>
                <button className={buttonStyles.button + " " + buttonStyles.primary} onClick={props.onNewEntryButtonClick}>
                    New Entry
                </button>
            </div>
            <ToggleButton className={styles.filterToggle} onCheckedChanged={props.onFilterToggleChanged}>
                <img src={funnelIcon}/>
            </ToggleButton>
        </div>
    );
}