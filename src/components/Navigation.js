import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function Navigation() {
  function activeTab(tab) {
    let idArray = ['postfixcalc', 'postfixcon', 'infixcon'];
    let index = idArray.indexOf(tab.target.id);
    idArray.splice(index, 1); //remove active tab from temp array

    document.getElementById(tab.target.id).classList.remove('gotobottom');
    document.getElementById(tab.target.id).classList.add('gototop');

    for (let el of idArray) {
      document.getElementById(el).classList.remove('gototop');
      document.getElementById(el).classList.add('gotobottom');
    }
  }

  //This will run once after the component mounts
  useEffect(() => {
    document.getElementById('postfixcalc').classList.add('gototop');
  });

  return (
    <div className="navbar">
      <Link to="/">
        <div
          className="btn postfixcalculator"
          id="postfixcalc"
          onClick={activeTab}
        >
          <span>Postfix Calculator</span>
        </div>
      </Link>
      <Link to="/postfix2infix">
        <div className="btn postfixtoinfix" id="postfixcon" onClick={activeTab}>
          <span>Postfix </span>
          <HiOutlineArrowNarrowRight className="arrow" />
          <span> Infix</span>
        </div>
      </Link>
      <Link to="/infix2postfix">
        <div className="btn infixtopostfix" id="infixcon" onClick={activeTab}>
          <span>Infix </span>
          <HiOutlineArrowNarrowRight className="arrow" />
          <span> Postfix</span>
        </div>
      </Link>
    </div>
  );
}

export default Navigation;
