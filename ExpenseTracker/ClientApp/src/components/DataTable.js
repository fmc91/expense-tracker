import React, { useEffect, useState } from "react";
import DataRow from "./DataRow";
import styles from "./DataTable.module.css";
import sortAscIcon from "../assets/sort-ascending.png";
import sortDescIcon from "../assets/sort-descending.png";

export default function DataTable(props) {

    const [data, setData] = useState(props.data);

    const [sortColumnIndex, setSortColumnIndex] = useState(0);
    const [sortDirection, setSortDirection] = useState("ascending");

    useEffect(() => setData(props.data), [props.data]);

    function handleColumnHeaderClick(index) {
        if (sortColumnIndex === index) {
            setSortDirection(sortDirection === "ascending" ? "descending" : "ascending");
        }
        else {
            setSortColumnIndex(index);
            setSortDirection("ascending");
        }
    }

    function compare(a, b) {
        const compareResult = props.columns[sortColumnIndex].compareValues(
            a[props.columns[sortColumnIndex].propertyName],
            b[props.columns[sortColumnIndex].propertyName]);

        return sortDirection === "ascending" ? compareResult :
            sortDirection === "descending" ? compareResult * -1 :
            0;
    }

    const displayData = props.dataFilter ? props.dataFilter(data) : data;
    displayData.sort(compare);

    return (
        <table className={styles.dataTable}>
            <thead>
                <tr className={styles.headerRow}>
                    {props.columns.map((col, i) =>
                        <th key={i} className={styles.headerCell}
                            onClick={() => handleColumnHeaderClick(i)}>
                            <div className={styles.headerCellContents}>
                                <div className={styles.headerCellText}>
                                    {col.header}
                                </div>
                                {sortColumnIndex == i && sortDirection == "ascending" &&
                                    <img src={sortAscIcon} className={styles.sortIcon}/>}
                                {sortColumnIndex == i && sortDirection == "descending" &&
                                    <img src={sortDescIcon} className={styles.sortIcon}/>}
                            </div>
                        </th>)}
                    <th/>
                </tr>
            </thead>
            <tbody>
            {
                displayData.map(item =>
                    <DataRow key={item.expenseId} data={item} columns={props.columns}
                        onDelete={() => props.onDeleteRow(item.expenseId)}
                        onEdit={newData => props.onEditRow(newData)}/>
                )
            }
            </tbody>
        </table>
    );
}