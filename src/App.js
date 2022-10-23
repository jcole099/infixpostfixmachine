//TODO: remove the "infixpostfixmachine" from package.json homepage: before submitting files to school

import './App.css';

//Import Dependencies
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

//Import Pages
import Calcpostfix from './pages/Calcpostfix.js';
import Convertpostfix from './pages/Convertpostfix.js';
import Convertinfix from './pages/Convertinfix.js';
import Steps from './components/Steps';
import Welcome from './pages/Welcome';
import About from './pages/About';

//Import Components
import Header from './components/Header';

function App() {
	const year = new Date().getFullYear();
	const [steps1, setSteps] = useState([]); //for passing information from processing algorithms (calcpostfix, convert...) to Steps form
	const [stackHeight, setStackHeight] = useState();

	return (
		<div className="App">
			<header className="App-header">
				<Header />
			</header>
			<main className="App-main">
				<Routes>
					<Route path="/infixpostfixmachine" exact element={<Welcome />} />
					<Route path="/" exact element={<Welcome />} />
					<Route path="/about" exact element={<About />} />
					<Route
						path="/postfixcalc"
						exact
						element={
							<Calcpostfix
								setSteps={setSteps}
								setStackHeight={setStackHeight}
							/>
						}
					/>
					<Route
						path="/postfix2infix"
						exact
						element={
							<Convertpostfix
								setSteps={setSteps}
								setStackHeight={setStackHeight}
							/>
						}
					/>
					<Route
						path="/infix2postfix"
						exact
						element={
							<Convertinfix
								setSteps={setSteps}
								setStackHeight={setStackHeight}
							/>
						}
					/>
				</Routes>
				<Steps steps={steps1} stackHeight={stackHeight} />
			</main>
			<footer className="App-footer">
				<span>&copy; {year} James Cole</span>
			</footer>
		</div>
	);
}

export default App;
