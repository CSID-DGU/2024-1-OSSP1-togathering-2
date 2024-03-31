/* eslint-disable */
import { FC, useState } from 'react'
import { PloggingCourseCreateAddress } from './components/PloggingCourseCreateAddress'
import { PloggingCourseCreateClick } from './components/PloggingCourseCreateClick'
import { CREATE_TYPE_SELECT_OPTIONS } from './constant'
import { CreateTypeContainer, CreateTypeSelect, Root, TitleContainer, TitleTypo } from './styled'
import { PloggingCourseCreateType } from './type'

type CourseCreateProps = {
  className?: string
}

export const PloggingCourseCreatePage: FC<CourseCreateProps> = ({ className }) => {
  const [ploggingCourseCreateType, setPloggingCourseCreateType] = useState<PloggingCourseCreateType>()

  const onChangeSelectCreateType = (value: any) => {
    setPloggingCourseCreateType(value)
    return
  }

  return (
    <Root className={className}>
      <TitleContainer>
        <TitleTypo>나만의 플로깅 코스 만들기</TitleTypo>
      </TitleContainer>
      <CreateTypeContainer>
        <CreateTypeSelect
          size={'large'}
          placeholder="코스 제작 방식을 선택해주세요."
          optionFilterProp="children"
          onChange={onChangeSelectCreateType}
          options={CREATE_TYPE_SELECT_OPTIONS}
        />
      </CreateTypeContainer>
      {ploggingCourseCreateType === 'ADDRESS' && <PloggingCourseCreateAddress />}
      {ploggingCourseCreateType === 'CLICK' && <PloggingCourseCreateClick />}
    </Root>
  )
}
