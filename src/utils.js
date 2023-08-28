export const searchTreeNodePath = (nodeId, parent) => {
  const stack = [[parent, []]]
  while (stack.length) {
    const [node, path] = stack.pop()
    if (node.id === nodeId) {
      return path
    }
    if (node.children) {
      stack.push(...node.children.map((node, index) => (
        [node, [...path, { index, id: node.id }]])
      ))
    }
  }
}

// Calculate the maximum depth of nested children in the tree branch
export const getMaxNestedDepth = (item, depth = 1) => {
    if (item.children && item.children.length) {
      const nestedDepths = item.children.map(child => getMaxNestedDepth(child, depth + 1));
      return Math.max(depth, ...nestedDepths);
    }
    return depth;
  };

const countItemsWithoutChildren = (item, count = 0) => {
  if (item.children && item.children.length) {
    return item.children.reduce((acc, item) => {
      if (item.children && item.children.length) {
        return countItemsWithoutChildren(item.children, count)
      } else {
        return acc + 1
      }
    }, count)
  }
}

// Calculat the maximum nested item of any root item 
const countAllNestedItems = (items) => {
  let count = 0;
  for (const item of items) {
    count++; // Count the current item
    if (item.children && item.children.length) {
      count += countAllNestedItems(item.children); // Recursively count nested items
    }
  }
  return count;
};



export const countLineParams = (
  item,
  index,
  hasItemBelow,
  marginBottom,
  itemHeight
) => {
  const baseHeight = itemHeight + marginBottom
  const nestedChildrenCount = countItemsWithoutChildren(item)

// Calculat the maximum nested item of any root item 
const totalNestedItemCount = countAllNestedItems(item.children);
console.log("Total nested items:", totalNestedItemCount,index);


  // Calculate the maximum depth of nested children in this branch
  const maxDepth = getMaxNestedDepth(item);
  let  top = itemHeight / 2 

  let height
  if (hasItemBelow && !nestedChildrenCount ) {
 
    if(maxDepth>1){
      height =(totalNestedItemCount- (maxDepth-1)) * baseHeight
    }
    else{
      height = baseHeight + 1
    }
   
  } 

  else {
    height = baseHeight * nestedChildrenCount + 1


  }


  return { top, height }
}

export const dropTreeNode = id => {

}

export const getTreeNode = (path = [], tree) => {

}
