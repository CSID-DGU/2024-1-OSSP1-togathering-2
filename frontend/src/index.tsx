import 'antd/dist/reset.css'
import { CommonContainer } from 'components/CommonContainer'
import 'global.css'
import { MainPage } from 'pages/Main'
import { PloggingCourseCreatePage } from 'pages/Plogging/Course/Create'
import { PloggingCourseListPage } from 'pages/Plogging/Course/List'
import { PloggingMeetingAlertPage } from 'pages/Plogging/Meeting/Alert'
import { PloggingMeetingConfirmPage } from 'pages/Plogging/Meeting/Confirm'
import { PloggingMeetingCreateCoursePage } from 'pages/Plogging/Meeting/Create/Course'
import { PloggingMeetingCreateInfoPage } from 'pages/Plogging/Meeting/Create/Info'
import { PloggingMeetingListPage } from 'pages/Plogging/Meeting/List'
import { PloggingSoloAlertPage } from 'pages/Plogging/Solo/Alert'
import { PloggingSoloConfirmPage } from 'pages/Plogging/Solo/Confirm'
import { PloggingSoloCoursePage } from 'pages/Plogging/Solo/Course'
import { PloggingSoloProgressPage } from 'pages/Plogging/Solo/Progress'
import { PloggingSoloReviewPage } from 'pages/Plogging/Solo/Review'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root') as any)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CommonContainer>
        <Routes>
          <Route path="/plogging/course/list" element={<PloggingCourseListPage />} />
          <Route path="/plogging/course/create" element={<PloggingCourseCreatePage />} />

          <Route path="/plogging/solo/course" element={<PloggingSoloCoursePage />} />
          <Route path="/plogging/solo/confirm" element={<PloggingSoloConfirmPage />} />
          <Route path="/plogging/solo/alert" element={<PloggingSoloAlertPage />} />
          <Route path="/plogging/solo/progress" element={<PloggingSoloProgressPage />} />
          <Route path="/plogging/solo/review" element={<PloggingSoloReviewPage />} />

          <Route path="/plogging/meeting/list" element={<PloggingMeetingListPage />} />
          <Route path="/plogging/meeting/create/course" element={<PloggingMeetingCreateCoursePage />} />
          <Route path="/plogging/meeting/create/info" element={<PloggingMeetingCreateInfoPage />} />
          <Route path="/plogging/meeting/confirm" element={<PloggingMeetingConfirmPage />} />
          <Route path="/plogging/meeting/alert" element={<PloggingMeetingAlertPage />} />

          <Route path="/" element={<MainPage />} />
        </Routes>
      </CommonContainer>
    </BrowserRouter>
  </React.StrictMode>
)
