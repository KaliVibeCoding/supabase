import DatabaseLayout from 'components/layouts/DatabaseLayout/DatabaseLayout'
import DefaultLayout from 'components/layouts/DefaultLayout'
import CustomDatabaseDashboard from 'components/interfaces/Database/CustomDatabaseDashboard'
import { useParams } from 'common'
import type { NextPageWithLayout } from 'types'

const Database: NextPageWithLayout = () => {
  const { ref: projectRef } = useParams()
  
  return (
    <div className="p-6">
      <CustomDatabaseDashboard projectRef={projectRef || 'demo-project'} />
    </div>
  )
}

Database.getLayout = (page) => (
  <DefaultLayout>
    <DatabaseLayout title="Database">{page}</DatabaseLayout>
  </DefaultLayout>
)

export default Database
