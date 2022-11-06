import { GetServerSideProps } from 'next'

interface HomeProps {
  poolCount: number
  guessCount: number
  userCount: number
}

import Image from 'next/image'
import appPreviewImg from '../assets/app-nlw-copa-preview.png'
import logoImage from '../assets/logo.svg'
import avatarExampleImg from '../assets/users-avatar-example.png'
import IconCheckImg from '../assets/icon-check.svg'
import { api } from '../lib/axios'
import { FormEvent } from 'react'

export default function Home({ poolCount, guessCount, userCount }: HomeProps) {
  function createPool(event: FormEvent) {
    event.preventDefault()
  }

  return (
    <div
      className={
        'max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center'
      }
    >
      <main>
        <Image src={logoImage} alt={'NLW Copa'} />
        <h1 className={'mt-14 text-white text-5xl font-bold leading-tight'}>
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className={'mt-10 flex items-center gap-2'}>
          <Image src={avatarExampleImg} alt={''} />
          <strong className={'text-gray-100 text-xl'}>
            <span className={'text-green-500'}>+{userCount} </span> pessoas já
            estão usando
          </strong>
        </div>
        <form onSubmit={createPool} className={'mt-10 flex gap-2'}>
          <input
            className={
              'flex-1 px-6 py-4 rounded bg-gray-800 border  border-gray-600 text-sm text-gray-100'
            }
            type="text"
            required
            placeholder={'Qual nome do seu bolão?'}
          />
          <button
            className={
              'bg-yellow-500 px-6 py-4 rounded font-bold text-gray-900 text-sm hover:bg-yellow-700'
            }
            type="submit"
          >
            CRIAR MEU BOLÃO
          </button>
        </form>
        <p className={'mt-4 text-sm text-gray-300 leading-relaxed'}>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>
        <div
          className={
            'mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100'
          }
        >
          <div className={'flex items-center gap-6'}>
            <Image src={IconCheckImg} alt={''} />
            <div className={'flex flex-col'}>
              <span className={'font-bold text-2xl'}>+{poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>
          <div className={'w-px h-14 bg-gray-600'} />
          <div className={'flex items-center gap-6'}>
            <Image src={IconCheckImg} alt={''} />
            <div className={'flex flex-col'}>
              <span className={'font-bold text-2xl'}>+{guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>
      <Image
        src={appPreviewImg}
        alt={
          'Dois celulares exibindo uma prévia da aplicação móvel do NLW Copa'
        }
        quality={100}
      />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const [poolCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      api.get('pools/count'),
      api.get('guesses/count'),
      api.get('users/count'),
    ])

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    },
  }
}
