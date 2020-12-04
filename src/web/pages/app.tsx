import {
  InferWithAuthServerSideProps,
  withAuthServerSideProps,
} from '../utils/with-auth-server-side-props'

export const getServerSideProps = withAuthServerSideProps(undefined, {
  authenticatedPage: true,
})

type AppProps = InferWithAuthServerSideProps<typeof getServerSideProps>

function App({ user }: AppProps) {
  return <p>Hello {user.username} 👋</p>
}

export default App
