export const constructItemProperties = (item, accessors, depth, checked) => {
    return {
      label: item[accessors[depth].label],
      value: item[accessors[depth].value],
      children: item[accessors[depth].leaves],
      type: accessors[depth].type,
      checked: checked,
      accessors: accessors,
      depth: depth
    }
}