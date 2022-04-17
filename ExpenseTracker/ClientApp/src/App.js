import React, { useState, useContext, useEffect } from "react";
import NewEntryForm from "./components/NewEntryForm";
import FilteredTable from "./components/FilteredTable";
import ButtonStrip from "./components/ButtonStrip";
import Modal from "./components/Modal";
import DataContext from "./context/data-context";

import styles from "./App.module.css";
import commonStyles from "./components/common.module.css";

export default function App() {

    const [addingNewEntry, setAddingNewEntry] = useState(false);
    const [isFilterStripVisible, setIsFilterStripVisible] = useState(false);

    const dataContext = useContext(DataContext);

    useEffect(() => dataContext.loadData(), []);

    return (
        <React.Fragment>
            {
                addingNewEntry &&
                <Modal>
                    <div className={commonStyles.card}>
                        <NewEntryForm onDismiss={() => setAddingNewEntry(false)}/>
                    </div>
                </Modal>
            }
            <div className={commonStyles.card}>
                <div className={styles.tableContainer}>
                    <ButtonStrip onNewEntryButtonClick={() => setAddingNewEntry(true)}
                        onFilterToggleChanged={setIsFilterStripVisible}/>
                    <FilteredTable isFilterStripVisible={isFilterStripVisible}/>
                </div>
            </div>
        </React.Fragment>
    );
}
