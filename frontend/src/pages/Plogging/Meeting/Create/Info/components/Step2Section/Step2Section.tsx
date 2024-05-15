import { IconMinus, IconPlus } from '@tabler/icons-react'
import { FC } from 'react'
import { Root, Step2Button, Step2Container, Step2CountTypo, Step2SubmitButton, Step2SubmitButtonTypo } from './styled'

type Step2SectionProps = {
  className?: string
  step2Count: number
  handleStep2Count: (type: 'MINUS' | 'PLUS') => () => void
  onSave: () => void
}

export const Step2Section: FC<Step2SectionProps> = ({ className, step2Count, handleStep2Count, onSave }) => {
  return (
    <Root className={className}>
      <Step2Container>
        <Step2Button shape={'circle'} disabled={step2Count <= 2} onClick={handleStep2Count('MINUS')}>
          <IconMinus size={16} />
        </Step2Button>
        <Step2CountTypo>{step2Count}</Step2CountTypo>
        <Step2Button shape={'circle'} disabled={step2Count >= 100} onClick={handleStep2Count('PLUS')}>
          <IconPlus size={16} />
        </Step2Button>
      </Step2Container>
      <Step2SubmitButton type={'primary'} onClick={onSave}>
        <Step2SubmitButtonTypo>완료하기</Step2SubmitButtonTypo>
      </Step2SubmitButton>
    </Root>
  )
}
