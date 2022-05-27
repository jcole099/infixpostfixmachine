import StackCell from './StackCell';

function ChildElement({ displayStackElements, displayStackHeight }) {
  let rows = [];
  let fontSize = 'font16';
  //reverse row input
  for (let i = displayStackHeight - 1; i >= 0; i--) {
    if (i > displayStackElements.length) {
      rows.push(<StackCell num={null} key={i} />);
    } else {
      if (typeof(displayStackElements[i]) === 'string') {
        if (displayStackElements[i].length > 40) {
          fontSize = 'font8';
        } else if (displayStackElements[i].length > 30) {
          fontSize = 'font10';
        } else if (displayStackElements[i].length > 20) {
          fontSize = 'font12';
        } else {
          fontSize = 'font16';
        }
      }
      rows.push(<StackCell num={displayStackElements[i]} fontSize={fontSize} key={i} />);
    }
  }
  return <div id="childEl1" className="childEl2">{rows}</div>;
}

export default ChildElement;
