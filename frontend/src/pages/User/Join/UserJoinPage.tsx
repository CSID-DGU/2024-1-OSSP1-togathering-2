import { Root } from './styled'
import React from 'react'
import { Link } from 'react-router-dom'
import { Header } from 'components/Header'
import { TabBar } from 'components/TabBar'

export const UserJoinPage = () => {
  return (
    <Root>
      <Header showLogo={true} />
      <div className="MainFrame">
        <p className="PageTitle">가입하기</p>
        <hr className="Line" />
        <form className="JoinBox">
          이름
          <input className="InputBox" name="UserName" type="text" />
          아이디
          <input className="InputBox" name="UserID" type="text" />
          비밀번호
          <input className="InputBox" name="UserPW" type="text" />
          이메일
          <input className="InputBox" name="UserEmail" type="text" />
          <Link className="JoinLink" to="/">
            <input className="JoinButton" type="submit" value="회원가입" />
          </Link>
        </form>
      </div>
      <TabBar />
    </Root>
  )
}
