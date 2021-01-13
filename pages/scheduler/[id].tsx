import { useRouter } from 'next/router'

function Schedule() {
  const router = useRouter()
  const { id } = router.query

  return <p>Schedule {id}</p>
}

export default Schedule
