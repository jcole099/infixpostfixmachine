import React from 'react';
import postfixCalcImg from '../imgs/postfixcalc.png';
import postfixConImg from '../imgs/postfixtoinfix.png';
import infixConImg from '../imgs/infixtopostfix.png';

function About() {
	function lowerTabs() {
		let idArray = ['postfixcalc', 'postfixcon', 'infixcon'];

		for (let el of idArray) {
			document.getElementById(el).classList.remove('gototop');
			document.getElementById(el).classList.remove('gotobottom');
			document.getElementById(el).classList.add('gotobottom');
		}
	}

	//Hides Steps div, TODO: grow div
	function resetSteps() {
		document.getElementById('idSteps').style.height = '0px';
		document.getElementById('idSteps').style.display = 'none';
		document.getElementById('idSteps').style.paddingBottom = '0px';
	}

	lowerTabs();
	resetSteps();

	return (
		<div className="mainform">
			<div className="about">
				<h2>About</h2>
				<p>The Infix Postfix Machine essentially does three main functions:</p>
				<ul>
					<li>
						<b>Postfix Calculation</b> - Receives a postfix expression and
						performs a calculation.
					</li>
					<li>
						<b>Postfix Conversion</b> - Receives a postfix expression and
						converts that to the equivalent infix expression.
					</li>
					<li>
						<b>Infix Conversion</b> - Receives an infix expression and converts
						that to the equivalent postfix expression.
					</li>
				</ul>
				<p>
					In addition to performing these calculations and conversions, the
					Infix Postfix Machine also performs a step-by-step breakdown of each
					component of the process. This functionality is meant to serve as a
					learning aid.
				</p>
				<p>
					The Infix Postfix Machine does have some limitations. These
					limitations are listed on each of the function's pages. For example,
					the postfix calculator can only handle the following operators: +, -,
					*, and /. Additionally, the postfix calculation rounds to the ninth
					decimal place. Please see each function's page for more details on
					input limitations.
				</p>
				<p>
					The three functions use what is called "The Stack Method" to perform
					the calculations and conversions. I must give credit to Instructor
					Stephen Redfield and Instructor Eric Vogel at Oregon State University
					for introducing these concepts/methods to me.
				</p>

				<h4 className="techUsed">Technologies used:</h4>
				<ul>
					<li>Javascript</li>
					<li>React JS</li>
					<li>HTML</li>
					<li>CSS</li>
					<li>Git</li>
					<li>Github</li>
					<li>Visual Studio Code</li>
					<li>GIMP Image Editor</li>
				</ul>
				<div className="flowCharts">
					<h4 className="techUsed">Flowcharts:</h4>
					<p>Postfix Calculation</p>
					<img src={postfixCalcImg} alt="Postfix calculation flowchart"></img>
					<p>Postfix to Infix Conversion</p>
					<img src={postfixConImg} alt="Postfix conversion flowchart"></img>
					<p>Infix to Postfix Conversion</p>
					<img src={infixConImg} alt="Infix conversion flowchart"></img>
				</div>
			</div>
		</div>
	);
}

export default About;
