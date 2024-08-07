import { postUserJoin } from 'apis/user/postUserJoin'
import { Header } from 'components/Header'
import { TabBar } from 'components/TabBar'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  EmailInput,
  Root,
  StepBackButton,
  StepBackButtonTypo,
  StepContainer,
  SubmitButtonButton,
  SubmitButtonTypo,
  SubtitleCircle,
  SubtitleCircleTypo,
  SubtitleContainer,
  SubtitleTypo,
  UserInput,
} from './styled'

export const UserJoinPage = () => {
  const [step, setStep] = useState<'1' | '2' | '3' | '4' | '5'>('1')
  const [userName, setUserName] = useState<string>('')
  const [userID, setUserID] = useState<string>('')
  const [userPW, setUserPW] = useState<string>('')
  const [checkPW, setCheckPW] = useState<string>('')
  const [userEmail, setUserEmail] = useState<string>('')

  const navigate = useNavigate()

  const onClickStepBack = () => {
    if (step === '2') {
      setStep('1')
      return
    }
    if (step === '3') {
      setStep('2')
      return
    }
    if (step === '4') {
      setStep('3')
      return
    }
    if (step === '5') {
      setStep('4')
      return
    }
  }

  const onClickSubmitStep1Button = () => {
    if (userName.length < 2 || userName.length > 10) {
      alert('이름은 2~10글자 사이로 입력해주세요.')
      return
    }
    setStep('2')
    return
  }

  const onClickSubmitStep2Button = () => {
    if (userID.length < 4 || userID.length > 20) {
      alert('ID는 4~20자 사이로 입력해주세요.')
      return
    }

    setStep('3')
    return
  }

  const onClickSubmitStep3Button = () => {
    if (userPW.length < 4 || userPW.length > 20) {
      alert('비밀번호는 4~20자 사이로 입력해주세요.')
      return
    }
    setStep('4')
    return
  }

  const onClickSubmitStep4Button = () => {
    if (userPW !== checkPW) {
      alert('비밀번호가 일치하지 않습니다!')
      return
    }
    setStep('5')
    return
  }

  const onSubmit = () => {
    if (!userEmail) {
      alert('이메일을 입력해주세요.')
      return
    }
    postUserJoin({ nickname: userName, password: userPW, email: userEmail, username: userID })
      .then((res) => {
        if (res) {
          alert(res.data.message)
          navigate('/user/login')
        }
      })
      .catch((res) => {
        if (res) {
          alert(res.response.data.message)
        }
      })
    return
  }

  return (
    <Root>
      <Header title={'가입하기'} showBackButton />
      <SubtitleContainer>
        <SubtitleCircle>
          <SubtitleCircleTypo>1</SubtitleCircleTypo>
        </SubtitleCircle>
        {step === '1' ? (
          <SubtitleTypo> 닉네임을 입력해주세요.</SubtitleTypo>
        ) : (
          <SubtitleTypo> 닉네임 : {userName}</SubtitleTypo>
        )}
      </SubtitleContainer>
      {step === '1' && (
        <StepContainer>
          <UserInput
            size={'large'}
            value={userName}
            onChange={(e: any) => setUserName(e.target.value)}
            placeholder={'2~10자 / 닉네임 입력'}
            onKeyDown={(e: any) => e.key === 'Enter' && onClickSubmitStep1Button()}
          />
          <SubmitButtonButton onClick={onClickSubmitStep1Button} type={'primary'}>
            <SubmitButtonTypo>닉네임 입력 완료</SubmitButtonTypo>
          </SubmitButtonButton>
        </StepContainer>
      )}
      {(step === '2' || step === '3' || step === '4' || step === '5') && (
        <>
          <SubtitleContainer>
            <SubtitleCircle>
              <SubtitleCircleTypo>2</SubtitleCircleTypo>
            </SubtitleCircle>
            {step === '2' ? (
              <SubtitleTypo> 아이디를 입력해주세요.</SubtitleTypo>
            ) : (
              <SubtitleTypo>ID : {userID}</SubtitleTypo>
            )}
          </SubtitleContainer>
          {step === '2' && (
            <StepContainer>
              <UserInput
                size={'large'}
                value={userID}
                onChange={(e: any) => setUserID(e.target.value)}
                placeholder={'4~20자리 / 영문, 숫자 조합'}
                onKeyDown={(e: any) => e.key === 'Enter' && onClickSubmitStep2Button()}
              />
              <SubmitButtonButton onClick={onClickSubmitStep2Button} type={'primary'}>
                <SubmitButtonTypo>ID 입력 완료</SubmitButtonTypo>
              </SubmitButtonButton>
              <StepBackButton onClick={onClickStepBack}>
                <StepBackButtonTypo>이전 단계</StepBackButtonTypo>
              </StepBackButton>
            </StepContainer>
          )}
        </>
      )}
      {(step === '3' || step === '4' || step === '5') && (
        <>
          <SubtitleContainer>
            <SubtitleCircle>
              <SubtitleCircleTypo>3</SubtitleCircleTypo>
            </SubtitleCircle>
            {step === '3' ? (
              <SubtitleTypo> 비밀번호를 입력해주세요.</SubtitleTypo>
            ) : (
              <SubtitleTypo>비밀번호 입력 완료 </SubtitleTypo>
            )}
          </SubtitleContainer>
          {step === '3' && (
            <StepContainer>
              <UserInput
                size={'large'}
                value={userPW}
                onChange={(e: any) => setUserPW(e.target.value)}
                placeholder={'4~20자리 / 영문, 숫자, 특수문자 조합'}
                type={'password'}
                onKeyDown={(e: any) => e.key === 'Enter' && onClickSubmitStep3Button()}
              />
              <SubmitButtonButton onClick={onClickSubmitStep3Button} type={'primary'}>
                <SubmitButtonTypo>비밀번호 입력 완료</SubmitButtonTypo>
              </SubmitButtonButton>
              <StepBackButton onClick={onClickStepBack}>
                <StepBackButtonTypo>이전 단계</StepBackButtonTypo>
              </StepBackButton>
            </StepContainer>
          )}
        </>
      )}
      {(step === '4' || step === '5') && (
        <>
          <SubtitleContainer>
            <SubtitleCircle>
              <SubtitleCircleTypo>4</SubtitleCircleTypo>
            </SubtitleCircle>
            {step === '4' ? (
              <SubtitleTypo> 비밀번호를 다시 확인해주세요.</SubtitleTypo>
            ) : (
              <SubtitleTypo>비밀번호 확인 완료 </SubtitleTypo>
            )}
          </SubtitleContainer>
          {step === '4' && (
            <StepContainer>
              <UserInput
                size={'large'}
                value={checkPW}
                onChange={(e: any) => setCheckPW(e.target.value)}
                placeholder={'비밀번호 다시 입력'}
                type={'password'}
                onKeyDown={(e: any) => e.key === 'Enter' && onClickSubmitStep4Button()}
              />
              <SubmitButtonButton onClick={onClickSubmitStep4Button} type={'primary'}>
                <SubmitButtonTypo>비밀번호 입력 완료</SubmitButtonTypo>
              </SubmitButtonButton>
              <StepBackButton onClick={onClickStepBack}>
                <StepBackButtonTypo>이전 단계</StepBackButtonTypo>
              </StepBackButton>
            </StepContainer>
          )}
        </>
      )}
      {step === '5' && (
        <>
          <SubtitleContainer>
            <SubtitleCircle>
              <SubtitleCircleTypo>5</SubtitleCircleTypo>
            </SubtitleCircle>
            {step === '5' ? (
              <SubtitleTypo> 이메일을 입력해주세요.</SubtitleTypo>
            ) : (
              <SubtitleTypo>이메일 : {userEmail} </SubtitleTypo>
            )}
          </SubtitleContainer>
          {step === '5' && (
            <StepContainer>
              <EmailInput
                size={'large'}
                value={userEmail}
                onChange={(e: any) => setUserEmail(e.target.value)}
                placeholder={'이메일 입력'}
                onKeyDown={(e: any) => e.key === 'Enter' && onSubmit()}
              />
              <SubmitButtonButton onClick={onSubmit} type={'primary'}>
                <SubmitButtonTypo>가입 완료</SubmitButtonTypo>
              </SubmitButtonButton>
              <StepBackButton onClick={onClickStepBack}>
                <StepBackButtonTypo>이전 단계</StepBackButtonTypo>
              </StepBackButton>
            </StepContainer>
          )}
        </>
      )}
      <TabBar />
    </Root>
  )
}
