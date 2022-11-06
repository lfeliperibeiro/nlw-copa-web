import { GetServerSideProps } from 'next'

interface HomeProps {
  pollCount: number
  guessCount: number
  userCount: number
}

import Image from 'next/image'
import appPreviewImg from '../assets/app-nlw-copa-preview.png'
import logoImage from '../assets/logo.svg'
import avatarExampleImg from '../assets/users-avatar-example.png'
import IconCheckImg from '../assets/icon-check.svg'
import { api } from '../lib/axios'
import { FormEvent, useState } from 'react'

export default function Home({ pollCount, guessCount, userCount }: HomeProps) {
  const [pollTitle, setPollTitle] = useState('')

  async function createPoll(event: FormEvent) { 
    event.preventDefault()
    try {
      const response = await api.post('/polls', {
        title: pollTitle,
      })

      const { code } = response.data

      await navigator.clipboard.writeText(code)
      alert(
        'Bolão criado com sucesso, o código foi copiado para a área de transferência',
      )
      setPollTitle('')
    } catch (err) {
      alert('falha ao carregar o bolão, tente novamente')
    }
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
        <form onSubmit={createPoll} className={'mt-10 flex gap-2'}>
          <input
            className={
              'flex-1 px-6 py-4 rounded bg-gray-800 border  border-gray-600 text-sm text-gray-100'
            }
            type="text"
            required
            placeholder={'Qual nome do seu bolão?'}
            value={pollTitle}
            onChange={(event) => setPollTitle(event.target.value)}
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
              <span className={'font-bold text-2xl'}>+{pollCount}</span>
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
  const [pollCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      api.get('polls/count'),
      api.get('guesses/count'),
      api.get('users/count'),
    ])

  return {
    props: {
      pollCount: pollCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    },
  }
}
