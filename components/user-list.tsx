import { UserAvatar } from './user-avatar'

export const UserList = ({ users = [] }: { users: any }) => {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {users && users.length > 0 ? (
        users.map((user) => (
          <li className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <UserAvatar
                user={{
                  name: user.name,
                  image: user.avatar_url
                }}
                className="h-16 w-16"
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm/6 font-semibold text-gray-900">
                  {user.name}
                </p>
                <p className="mt-1 truncate text-xs/5 text-gray-500">
                  {user.email}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm/6 text-gray-900">Ver turnos reservados</p>
            </div>
          </li>
        ))
      ) : (
        <div>
          <p>Ningún usuario cargado</p>
        </div>
      )}
    </ul>
  )
}
