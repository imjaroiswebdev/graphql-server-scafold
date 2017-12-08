module.exports = fieldASTs => {
  return fieldASTs.fieldNodes[0].selectionSet.selections.reduce(
    (projections, selection) => {
      projections[selection.name.value] = true
      // Passes every AST consulted to be presented in the
      // query result
      return projections
    },
    {}
  )
}
