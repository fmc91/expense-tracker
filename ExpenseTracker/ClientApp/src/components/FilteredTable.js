import React, { useContext, useEffect, useState } from "react";
import FilterStrip from "./FilterStrip";
import DataTable from "./DataTable";
import DataContext from "../context/data-context";

export default function FilteredTable(props) {

    const dataContext = useContext(DataContext);

    const [filterState, setFilterState] = useState({
        description: "",
        startDate: null,
        endDate: null
    });

    const [isFilterStripVisible, setIsFilterStripVisible] =
        useState(props.isFilterStripVisible ?? true);

    useEffect(() => {
        if (isFilterStripVisible !== (props.isFilterStripVisible ?? true))
            setIsFilterStripVisible(props.isFilterStripVisible ?? true);
    }, [props.isFilterStripVisible]);

    function dataFilter(data) {
        return data.filter(d => filterState.startDate ? d.date >= filterState.startDate : true)
            .filter(d => filterState.endDate ? d.date <= filterState.endDate : true)
            .filter(d => filterState.description ?
                filterState.description.split(" ")
                .map(s => s.trim().toLowerCase())
                .every(x => d.description.toLowerCase().includes(x)) :
            true);
    }

    const filterStrip =
        <FilterStrip description={filterState.description}
            startDate={filterState.startDate} endDate={filterState.endDate}
            onDescriptionChanged={d => setFilterState(prev => ({ ...prev, description: d }))}
            onStartDateChanged={d => setFilterState(prev => ({ ...prev, startDate: d }))}
            onEndDateChanged={d => setFilterState(prev => ({ ...prev, endDate: d }))}/>;

    const dataTable = (
        <DataTable data={dataContext.data} columns={dataContext.columns}
            dataFilter={dataFilter}
            onDeleteRow={dataContext.deleteEntry} onEditRow={dataContext.editEntry}/>
    );

    return (
        <React.Fragment>
            {isFilterStripVisible && filterStrip}
            {dataTable}
        </React.Fragment>
    );
}