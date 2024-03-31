/* eslint-disable */
import { PLOGGING_COURSE_LIST_KEY } from 'constants/common'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CourseCoordinateListType, LocalStorageCourseListType } from 'types/plogging'
import { loadLocalStorage, saveLocalStorage } from 'utils/handleLocalStorage'
import { PloggingCourseCreateAddress } from './components/PloggingCourseCreateAddress'
import { PloggingCourseCreateClick } from './components/PloggingCourseCreateClick'
import { CREATE_TYPE_SELECT_OPTIONS } from './constant'
import {
  ContentContainer,
  CourseGoBackButton,
  CourseNameInput,
  CourseResetButton,
  CreateTypeContainer,
  CreateTypeSelect,
  MenuContainer,
  Root,
  SeparateDivider,
  TitleContainer,
  TitleTypo,
} from './styled'
import { PloggingCourseCreateType } from './type'

type CourseCreateProps = {
  className?: string
}

export const PloggingCourseCreatePage: FC<CourseCreateProps> = ({ className }) => {
  const [ploggingCourseCreateType, setPloggingCourseCreateType] = useState<PloggingCourseCreateType>()

  const [courseName, setCourseName] = useState<string>('')
  const navigate = useNavigate()

  const onChangeSelectCreateType = (value: any) => {
    setPloggingCourseCreateType(value)
    return
  }

  const onClickButtonReset = () => {
    if (confirm('정말로 초기화하시겠습니까?? 기존 작업은 전부 삭제됩니다.')) {
      navigate(0)
    }
  }
  const onClickButtonGoBack = () => {
    if (confirm('정말로 이동하시겠습니까? 기존 작업은 전부 삭제됩니다.')) {
      navigate('/plogging/course/list', { replace: true })
    }
  }

  const onSave = (coordinateList: CourseCoordinateListType) => {
    if (!courseName) {
      alert('코스 명을 입력해주세요.')
      return
    }
    let currentPloggingCourseList = loadLocalStorage(PLOGGING_COURSE_LIST_KEY)
    if (currentPloggingCourseList) {
      let newPloggingCourseList: LocalStorageCourseListType = JSON.parse(currentPloggingCourseList)
      newPloggingCourseList.courseList = [
        ...newPloggingCourseList.courseList,
        {
          name: courseName,
          coordinateList,
        },
      ]
      saveLocalStorage(PLOGGING_COURSE_LIST_KEY, JSON.stringify(newPloggingCourseList))
      return
    }
    let newPloggingCourseList: LocalStorageCourseListType = {
      courseList: [
        {
          name: courseName,
          coordinateList,
        },
      ],
    }
    saveLocalStorage(PLOGGING_COURSE_LIST_KEY, JSON.stringify(newPloggingCourseList))
    return
  }

  return (
    <Root className={className}>
      <TitleContainer>
        <TitleTypo>나만의 플로깅 코스 만들기</TitleTypo>
      </TitleContainer>
      <CourseNameInput
        size={'large'}
        addonBefore={'코스 이름'}
        value={courseName}
        onChange={(e: any) => setCourseName(e.target.value)}
        placeholder={'플로깅 코스 이름을 입력해주세요.'}
      />
      <CreateTypeContainer>
        <CreateTypeSelect
          size={'large'}
          placeholder="코스 제작 방식을 선택해주세요."
          optionFilterProp="children"
          onChange={onChangeSelectCreateType}
          options={CREATE_TYPE_SELECT_OPTIONS}
        />
      </CreateTypeContainer>
      <ContentContainer>
        {ploggingCourseCreateType === 'ADDRESS' && <PloggingCourseCreateAddress onSave={onSave} />}
        {ploggingCourseCreateType === 'CLICK' && <PloggingCourseCreateClick onSave={onSave} />}
      </ContentContainer>
      <MenuContainer>
        <SeparateDivider />
        <CourseResetButton type={'primary'} size={'large'} danger onClick={onClickButtonReset}>
          초기화하기
        </CourseResetButton>
        <CourseGoBackButton type={'default'} size={'large'} onClick={onClickButtonGoBack}>
          목록으로
        </CourseGoBackButton>
      </MenuContainer>
    </Root>
  )
}
