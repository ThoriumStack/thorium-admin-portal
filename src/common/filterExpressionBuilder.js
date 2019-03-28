export default class FilterExpressionBuilder {

  constructor() {
    this.parameterIndex = 0;
    this.expression = {
      filterExpression: '',
      filterParameters: []
    };
  }

  addParameter(parameterName, parameterValue, parameterType = 'text') {
    if (this.isParameterFilled(parameterValue, parameterType)) {
      if ( this.parameterIndex > 0) {
        this.expression.filterExpression += ' AND ';
      }
      this.expression.filterExpression += `${parameterName} == @${this.parameterIndex}`;
      this.expression.filterParameters.push(parameterValue);
      this.parameterIndex++;
    }
    else {
      console.warn("parameter " + parameterName + " not filled")
    }
  }

  setPage(pageIndex, pageSize) {
    this.expression.pageIndex = pageIndex;
    this.expression.pageSize = pageSize;

  }

  isParameterFilled(value, type) {
    if (type === 'text') {
      return value && value.length > 0
    }

    if (type === 'number') {
      return value && value !== null && !Number.isNaN(value)
    }
  }

  sortAscending(fieldName) {
    this.expression.sortOrder = 1;
    this.expression.sortFieldName = fieldName;
  }
  sortDescending(fieldName) {
    this.expression.sortOrder = 2
    this.expression.sortFieldName = fieldName;
  }

  getSearchParams() {
    return this.expression;
  }
}