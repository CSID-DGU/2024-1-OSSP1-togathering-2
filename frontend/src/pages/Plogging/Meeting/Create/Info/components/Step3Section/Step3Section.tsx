import { FC } from 'react'
import { ContentContainer, ContentInput, Root, SubmitButton, SubmitButtonTypo } from './styled'

type Step3SectionProps = {
  className?: string
  name: string
  onChange: (value: string) => void
  onSave: () => void
}

export const Step3Section: FC<Step3SectionProps> = ({ className, name, onChange, onSave }) => {
  return (
    <Root className={className}>
      <ContentContainer>
        <ContentInput
          placeholder="모임의 이름을 입력해주세요."
          value={name}
          onChange={(e: any) => onChange(e.target.value)}
        />
        <SubmitButton onClick={onSave} type={'primary'}>
          <SubmitButtonTypo>완료하기</SubmitButtonTypo>
        </SubmitButton>
      </ContentContainer>
    </Root>
  )
}
