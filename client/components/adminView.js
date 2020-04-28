import React from 'react'

import AdminUsersTable from './adminUsersTable'
import AdminItemsTable from './adminItemsTable'

export default function AdminView(props) {
  return (
    <div>
      {props.whichTable === 'users' && <AdminUsersTable />}
      {props.whichTable === 'items' && <AdminItemsTable />}
    </div>
  )
}
