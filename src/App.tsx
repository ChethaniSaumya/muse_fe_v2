import React, { Component } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from "./Pages/Home";
import AdminPanel from "./Pages/adminPanel";
import UserPanel from "./Pages/userPanel";
import TestUserPanel from './Pages/testUserPanel';
  
function App() {

	return (
		<div>
			<BrowserRouter>
				<Routes>

					<Route path='/' element={<Home />} />
 					<Route path='my-dashboard' element={<UserPanel />} />
					<Route path='test-dashboard' element={<TestUserPanel />} />
    
				</Routes>
			</BrowserRouter>
			<div>
		

			</div>
		</div>




	)
}


export default App;
