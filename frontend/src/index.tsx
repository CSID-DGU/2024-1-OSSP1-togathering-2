import 'antd/dist/reset.css'
import { CommonContainer } from 'components/CommonContainer'
import 'global.css'
import { MainPage } from 'pages/Main'
import { PloggingCourseCreatePage } from 'pages/Plogging/Course/Create'
import { PloggingCourseListPage } from 'pages/Plogging/Course/List'
import { UserLoginPage } from 'pages/User/Login'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root') as any)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CommonContainer>
        <Routes>
          <Route path="/user/login" element={<UserLoginPage />} />
          <Route path="/plogging/course/list" element={<PloggingCourseListPage />} />
          <Route path="/plogging/course/create" element={<PloggingCourseCreatePage />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </CommonContainer>
    </BrowserRouter>
  </React.StrictMode>
)
