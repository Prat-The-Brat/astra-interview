// src/DynamicTable.js
import React, { useState, useEffect } from 'react';
import { flattenData, adjustData } from './FlattenData';
import jsonData from './data.json';
import './DynamicTable.css'; // Import the CSS file for styling

const DynamicTable = () => {
  const [tableData, setTableData] = useState([]);
  const products = ['Product 1', 'Product 2', 'Product 3'];

  useEffect(() => {
    const initialData = adjustData(flattenData(jsonData));
    setTableData(initialData);
  }, []);

  const handleEdit = (entry, product, newValue) => {
    const updatedData = tableData.map(row => {
      if (row.Geography === entry.Geography) {
        return { ...row, [product]: parseFloat(newValue) };
      }
      return row;
    });

    setTableData(updatedData);
    adjustData(updatedData); // Adjust the JSON data
  };

  const handleEditGeography = (entry, newValue) => {
    const updatedData = tableData.map(row => {
      if (row.Geography === entry.Geography) {
        return { ...row, Geography: newValue };
      }
      return row;
    });

    setTableData(updatedData);
    adjustData(updatedData); // Adjust the JSON data
  };

  // Calculate the total for each product
  const productTotals = products.map(product => {
    return tableData.reduce((sum, entry) => sum + entry[product], 0);
  });

  // Calculate the overall total
  const overallTotal = productTotals.reduce((sum, total) => sum + total, 0);

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th className="geography-header">Product/Geography</th>
            {products.map((product, index) => (
              <th key={index} className="product-header">
                {product}
              </th>
            ))}
            <th className="total-header">Total</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map(entry => (
            <tr key={entry.Geography}>
              <td
                className={entry.sub_geographies ? 'sub-geography' : 'main-geography'}
                style={{
                  fontWeight: entry.sub_geographies ? 'normal' : 'bold',
                  textAlign: entry.sub_geographies ? 'center' : 'left',
                }}
              >
                <span
                  contentEditable={true}
                  onBlur={e => handleEditGeography(entry, e.target.textContent)}
                >
                  {entry.Geography}
                </span>
              </td>
              {products.map(product => (
                <td
                  key={product}
                  contentEditable={true}
                  onBlur={e => handleEdit(entry, product, e.target.textContent)}
                >
                  {entry[product]}
                </td>
              ))}
              <td>{entry.Total}</td>
            </tr>
          ))}
          <tr className="product-summary">
            <td className="main-geography">Product Summary</td>
            {productTotals.map((total, index) => (
              <td key={index} className="product-total">
                {total}
              </td>
            ))}
            <td className="overall-total">{overallTotal}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
