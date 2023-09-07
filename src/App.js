import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SubscriberDetail from './component/SubscriberDetail';
import SubscriberList from './component/SubscriberList';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SubscriberList />} />
        <Route path='/subscriber' exact={true} element={<SubscriberList />} />
        <Route path='/subscriber/:id' element={<SubscriberDetail/>}/>
      </Routes>
    </Router>
  );
}

export default App;
