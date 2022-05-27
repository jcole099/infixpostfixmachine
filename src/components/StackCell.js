function StackCell({ num, fontSize }) {
  //attempt to make text yellow for newly added item to stack
  //if num is not {null, undefined} and if it ends with a 'y'
  if (num && num[num.length - 1] === 'y') {
    num = num.slice(0, num.length - 1);
    return (
      <div className={`textCell yellow ${fontSize}`}>
        <span>{num}</span>
      </div>
    );
  } else if (num && num === 'yBox') {
    return (
      <div className={`textCell ${fontSize}`}>
        <div className="yBox"></div>
      </div>
    );
  } else {
    return (
      <div className={`textCell ${fontSize}`}>
        <span>{num}</span>
      </div>
    );
  }
}

export default StackCell;
