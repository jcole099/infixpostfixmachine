import { AiOutlineQuestionCircle } from 'react-icons/ai'; 
import { Link } from 'react-router-dom';

function FunctionDescription({ subtitle, allowedOperators, allowedNumbers }) {
  return (
    <div>
      <div className="titleAbout">
        <div></div>
        <div className='subTitle'>
          <h2>{subtitle}</h2>
        </div>
        <div className='aboutQuestionMark'>
          <Link to="/about"><AiOutlineQuestionCircle /></Link>
        </div>
      </div>
      <h4>Allowed Inputs:</h4>
      <span>Operators: {allowedOperators}</span>
      <br></br>
      <span>Numbers: {allowedNumbers}</span>
    </div>
  );
}

export default FunctionDescription;
