import React from 'react';

import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Add, View } from './form/form.js';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <>
        <BrowserRouter>
        <Routes>
        <Route path='/view' element={<View/>} />
        <Route path='/add' element = {<Add/>}></Route>
        <Route path='*' element = {<Add/>}></Route>
        </Routes>
        </BrowserRouter>
    </>
) 
