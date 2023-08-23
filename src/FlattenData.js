// src/FlattenData.js
export function flattenData(data, parentGeography = '') {
    let flatData = [];
    for (const entry of data) {
      const geography = entry.Geography;
      const fullPath = parentGeography ? `${parentGeography} > ${geography}` : geography;
      const row = {
        Geography: fullPath,
        ...entry
      };
      delete row.sub_geographies;
      flatData.push(row);
      if (entry.sub_geographies) {
        flatData = flatData.concat(flattenData(entry.sub_geographies, fullPath));
      }
    }
    return flatData;
  }
  
  export function adjustData(data) {
    for (const entry of data) {
      entry.Total = entry['Product 1'] + entry['Product 2'] + entry['Product 3'];
    }
    return data;
  }
  