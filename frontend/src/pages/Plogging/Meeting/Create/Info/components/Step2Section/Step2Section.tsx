import { IconMinus, IconPlus } from '@tabler/icons-react'
import { FC, useEffect, useState } from 'react'
import {
  Root,
  Step2Button,
  Step2CaptionTypo,
  Step2Container,
  Step2Input,
  Step2SubmitButton,
  Step2SubmitButtonTypo,
} from './styled'

type Step2SectionProps = {
  className?: string
  step2Count: number
  handleStep2Count: (type: 'MINUS' | 'PLUS' | 'SET', value?: number) => () => void
  onSave: () => void
}

const longPressInterval = 100

export const Step2Section: FC<Step2SectionProps> = ({ className, step2Count, handleStep2Count, onSave }) => {
  const [isPressing, setIsPressing] = useState(false)
  const [count, setCount] = useState(0)
  const [pressingType, setPressingType] = useState<'PLUS' | 'MINUS'>('PLUS')

  const onLongPress = handleStep2Count(pressingType)

  useEffect(() => {
    let interval: any
    if (isPressing) {
      interval = setInterval(() => {
        setCount((prevCount) => prevCount + 1)
        onLongPress()
      }, longPressInterval)
    } else {
      if (interval) {
        clearInterval(interval)
      }
    }
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isPressing, longPressInterval, onLongPress, count])

  const handleMouseDown = (type: 'MINUS' | 'PLUS') => () => {
    setIsPressing(true)
    setPressingType(type)
  }

  const handleMouseUp = () => {
    setIsPressing(false)
  }

  const handleMouseLeave = () => {
    setIsPressing(false)
  }

  const onChangeInput = (e: any) => {
    handleStep2Count('SET', +e.target.value)()
  }

  return (
    <Root className={className}>
      <Step2Container>
        <Step2Button
          shape={'circle'}
          disabled={step2Count <= 2}
          onClick={handleStep2Count('MINUS')}
          onMouseDown={handleMouseDown('MINUS')}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleMouseDown('MINUS')}
          onTouchEnd={handleMouseUp}
        >
          <IconMinus size={16} />
        </Step2Button>
        {/* <Step2CountTypo>{step2Count}</Step2CountTypo> */}
        <Step2Input type={'number'} value={step2Count} onChange={onChangeInput} />
        <Step2Button
          shape={'circle'}
          disabled={step2Count >= 100}
          onClick={handleStep2Count('PLUS')}
          onMouseDown={handleMouseDown('PLUS')}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleMouseDown('PLUS')}
          onTouchEnd={handleMouseUp}
        >
          <IconPlus size={16} />
        </Step2Button>
      </Step2Container>
      <Step2CaptionTypo>
        * 최대 99명까지 입력할 수 있어요. <br />* plus, minus 버튼을 길게 눌러보세요!
      </Step2CaptionTypo>
      <Step2SubmitButton type={'primary'} onClick={onSave}>
        <Step2SubmitButtonTypo>완료하기</Step2SubmitButtonTypo>
      </Step2SubmitButton>
    </Root>
  )
}
