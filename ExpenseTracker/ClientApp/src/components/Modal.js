import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

export default function Modal(props) {

    const backdrop = ReactDOM.createPortal(
        <div className={styles.backdrop}></div>,
        document.getElementById("backdrop-root")
    );

    const modal = ReactDOM.createPortal(
        <div className={styles.modalContainer}>
            <div className={styles.modal}>
                {props.children}
            </div>
        </div>,
        document.getElementById("modal-root")
    );

    return (
        <React.Fragment>{backdrop}{modal}</React.Fragment>
    );
}