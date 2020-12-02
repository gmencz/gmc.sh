import {
  AuthenticatedPageProps,
  withAuthServerSideProps,
} from '../utils/with-auth-server-side-props'

export const getServerSideProps = withAuthServerSideProps(null, {
  authenticatedPage: true,
})

function App({ user }: AuthenticatedPageProps) {
  return <p>Hello {user.username} 👋</p>
}

export default App
