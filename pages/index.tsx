import { useRouter } from 'next/dist/client/router';
import Link from 'next/link'
import { useEffect } from 'react';
import style from '../styles/home.module.css';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
		if(localStorage.getItem('jwt'))
			router.push('/timeline');
  })
  return (
    <div className={style.home}>
      <h1 className={style.title}>KA SHI WA</h1>
      <div className={style.signin_wrapper}>
        <div className={style.go_button_wrapper}>
          <div className={style.go_button}>
            <Link href="/signup">
              SignUp
            </Link>
          </div>
        </div>
      </div>
      <div className={style.signin_wrapper}>
        <div className={style.go_button_wrapper}>
          <div className={style.go_button}>
            <Link href="/signin">
              SignIn
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
