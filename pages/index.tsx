import { useRouter } from 'next/dist/client/router';
import Link from 'next/link'
import { useEffect } from 'react';
import style from '../styles/home.module.css';

const Home = () => {
  const router = useRouter();
  useEffect(() => {
		if(localStorage.getItem('kashiwa_jwt'))
			router.push('/timeline');
  })
  return (
    <div className={style.home}>
      <h1 className={style.title}> Kashiwa </h1>
      <div className={style.button_wrapper}>
        <div className={style.go_button}>
          <Link href="/signup">
            アカウント作成
          </Link>
        </div>
        <div className={style.go_button}>
          <Link href="/signin">
            ログイン
          </Link>
        </div>
        <div className={style.go_button}>
          <Link href="/timeline">
            タイムラインを見る
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home