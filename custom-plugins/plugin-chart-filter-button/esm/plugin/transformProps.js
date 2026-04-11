function normalizeSelectedValues(selectedValues, value) {
  if (Array.isArray(selectedValues)) {
    return selectedValues;
  }
  if (selectedValues && typeof selectedValues === 'object' && !Array.isArray(selectedValues)) {
    return Object.values(selectedValues);
  }
  if (Array.isArray(value)) {
    return value;
  }
  return null;
}
export default function transformProps(chartProps) {
  var _formData$headerText, _formData$phoneColumn, _formData$labelColumn;
  var {
    width,
    height,
    formData,
    queriesData,
    hooks: {
      setDataMask = () => {}
    },
    filterState
  } = chartProps;
  var headerText = (_formData$headerText = formData.headerText) != null ? _formData$headerText : formData.header_text;
  var phoneColumn = (_formData$phoneColumn = formData.phoneColumn) != null ? _formData$phoneColumn : formData.phone_column;
  var labelColumn = (_formData$labelColumn = formData.labelColumn) != null ? _formData$labelColumn : formData.label_column;
  var data = queriesData[0].data;
  return {
    width,
    height,
    data,
    headerText,
    setDataMask,
    phoneColumn,
    labelColumn,
    selectedValues: normalizeSelectedValues(filterState == null ? void 0 : filterState.selectedValues, filterState == null ? void 0 : filterState.value)
  };
}