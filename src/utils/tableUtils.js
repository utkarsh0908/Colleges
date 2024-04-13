import Fuse from "fuse.js";

const addSuffix = (number) => {
  if ([11, 12, 13].includes(number % 100)) {
      return number + "th";
  } else {
      const suffixes = { 1: "st", 2: "nd", 3: "rd" };
      const lastDigit = number % 10;
      const suffix = suffixes[lastDigit] || "th";
      return number + suffix;
  }
}

const addCommas = (number) => {
  let numStr = number.toString();
    
  const parts = numStr.split(".");
  let wholePart = parts[0];
  const decimalPart = parts.length > 1 ? "." + parts[1] : "";

  const regex = /(\d)(?=(\d\d)+\d$)/g;
  wholePart = wholePart.replace(regex, "$1,");

  return wholePart + decimalPart;
}

const filterColleges = (value, tabledata, setTableData, endingIndex) => {
  if (value !== '') {
    const fuse = new Fuse(tabledata, { keys: ['name'] });
    const results = fuse.search(value);
    setTableData(results.map((result) => result.item));
  } else {
    setTableData(tabledata.slice(0, endingIndex));
  }
}

const handleSearchQueryChange = (event, setSearchQuery, tabledata, setTableData, endingIndex) => {
  const { value } = event.target;
  setSearchQuery(value);
  filterColleges(value, tabledata, setTableData, endingIndex);
}

const sortTable = (sorting, tableData, setTableData) => {
  if (sorting.length > 0) {
    let parameter = sorting[0].id;
    let sortedData;
    if (sorting[0].desc) {
      if (parameter === "reviews") {
        sortedData = [...tableData].sort(
          (a, b) => b[parameter].rating - a[parameter].rating
        );
      } else {
        sortedData = [...tableData].sort(
          (a, b) => b[parameter] - a[parameter]
        );
      }
      setTableData(sortedData);
    } else {
      let sortedData;
      if (parameter === "reviews") {
        sortedData = [...tableData].sort(
          (a, b) => a[parameter].rating - b[parameter].rating
        );
      } else {
        sortedData = [...tableData].sort(
          (a, b) => a[parameter] - b[parameter]
        );
      }
      setTableData(sortedData);
    }
  }
};


export { addCommas, addSuffix, filterColleges, handleSearchQueryChange, sortTable };