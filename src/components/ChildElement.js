import StackCell from './StackCell';

function ChildElement({ displayStackElements, displayStackHeight }) {
  let rows = [];
  //TODO: reverse row input
  for (let i = displayStackHeight - 1; i >= 0; i--) {
    if (i > displayStackElements.length) {
      rows.push(<StackCell num={null} key={i} />);
    } else {
      rows.push(<StackCell num={displayStackElements[i]} key={i} />);
    }
  }
  console.log(`Stack Height: ${displayStackHeight}`);
  return <div>{rows}</div>;
}

export default ChildElement;
