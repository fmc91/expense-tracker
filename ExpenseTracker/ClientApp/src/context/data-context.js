import React, { useState } from "react";
import DataCellInput from "../components/DataCellInput";
import { dateValueConverter, numberValueConverter } from "../value-converters";

const DataContext = React.createContext({
    data: [],
    columns: [],
    loadData: () => {},
    addEntry: newEntry => {},
    deleteEntry: id => {},
    editEntry: (id, newEntry) => {}
});

export default DataContext;

export function DataContextProvider(props) {

    const [data, setData] = useState([]);

    const dateOptions = { year: "numeric", month: "numeric", day: "numeric" };
    const currencyFormat = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" });

    function textInputTemplate(props) {
        return (
            <DataCellInput {...props} type="text"
                validate={v => v.trim().length !== 0}/>
        );
    }

    function dateInputTemplate(props) {
        return (
            <DataCellInput {...props} type="date"
                valueConverter={dateValueConverter}
                validate={v => !!v}/>
        );
    }

    function numberInputTemplate(props) {
        return (
            <DataCellInput {...props} type="number"
                valueConverter={numberValueConverter}
                validate={v => v > 0}/>
        );
    }

    const columns = [
        {
            header: "Date",
            propertyName: "date",
            propertyType: "Date",
            format: v => v.toLocaleString("en-GB", dateOptions),
            compareValues: (a, b) => a - b, 
            inputTemplate: dateInputTemplate
        },
        {
            header: "Description",
            propertyName: "description",
            propertyType: "string",
            compareValues: (a, b) => a.localeCompare(b, "en"),
            inputTemplate: textInputTemplate
        },
        {
            header: "Recipient",
            propertyName: "recipient",
            propertyType: "string",
            compareValues: (a, b) => a.localeCompare(b, "en"),
            inputTemplate: textInputTemplate
        },
        {
            header:"Amount",
            propertyName: "amount",
            propertyType: "number",
            format: v => currencyFormat.format(v),
            compareValues: (a, b) => a - b,
            inputTemplate: numberInputTemplate
        }
    ];

    async function loadData() {
        const response = await fetch("https://localhost:7265/api/expenses");

        if (!response.ok) {
            console.log(`Error: received HTTP status code ${response.status} when attempting to fetch data.`);
            return [];
        }

        const responseData = await response.json();

        const result = responseData.map(item => ({
            ...item,
            date: new Date(item.date)
        }));

        setData(result);
    }

    async function addEntry(newEntry) {

        const response = await fetch("https://localhost:7265/api/expenses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEntry)
        });

        if (!response.ok) {
            console.log(`Error: received HTTP status code ${response.status} when attempting to post new expense.`);
            return;
        }

        const result = await response.json();

        setData(prevData => [...prevData, { ...newEntry, expenseId: result.expenseId }]);
    }

    async function deleteEntry(id) {

        const response = await fetch(`https://localhost:7265/api/expenses/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            console.log(`Error: received HTTP status code ${response.status} when attempting to post new expense.`);
            return;
        }

        setData(prevData => prevData.filter(item => item.expenseId !== id));
    }

    async function editEntry(newEntry) {

        const response = await fetch("https://localhost:7265/api/expenses", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEntry)
        });

        if (!response.ok) {
            console.log(`Error: received HTTP status code ${response.status} when attempting to update expense.`);
            return;
        }

        setData(prev => {
            const newData = [...prev];
            const index = newData.findIndex(e => e.expenseId === newEntry.expenseId);
            newData[index] = newEntry;
            return newData;
        });
    }

    const value = {
        data: data,
        columns: columns,
        loadData: loadData,
        addEntry: addEntry,
        deleteEntry: deleteEntry,
        editEntry: editEntry
    };

    return (<DataContext.Provider value={value}>{props.children}</DataContext.Provider>);
}