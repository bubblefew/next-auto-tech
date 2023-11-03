import React from 'react'
import Layout from '@/components/Layouts/Layout'
import { userSelector, resetUsername } from '@/store/slices/userSlice'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/store/store'
import { signUp } from '@/store/slices/userSlice';

type Props = {}

const Index = ({ }: Props) => {
  const user = useSelector(userSelector)
  const dispatch = useAppDispatch()
  return (
    <Layout>
      <div>
        <p>{user.username}</p>
        <button onClick={() => {
          dispatch(resetUsername({ data: 'test' }))
        }}>Reset</button>
        <button onClick={() => {
          dispatch(signUp({ username: 'Jilasak', password: '123456' }))
        }}>SignUp</button>
      </div>
    </Layout >
  )
}

export default Index