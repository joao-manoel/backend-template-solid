import { Permission, PermissionRole, Role, RoleUser, User } from "@prisma/client";
import { UserWithRoleAndPermissionList } from "../dtos/UserWithRoleAndPermissionList";
/*
type PersistenceRaw = User &{
  roles: (RoleUser & {
    role: (Role & {
      permissions: (PermissionRole & {
        permission: Permission
      })[]
    })
  })[]
}*/

type PersistenceRaw = {
  total: number
  totalPage: number
  users: (User & {
    roles: (RoleUser & {
    role: (Role & {
      permissions: (PermissionRole & {
        permission: Permission
      })[]
    })
  })[]
  })[]
}

export class UserWithRoleAndPermissionListMapper {
  static toDto(raw: PersistenceRaw): UserWithRoleAndPermissionList {
    return {
      total: raw.total,
      totalPage: raw.totalPage,
      users: raw.users.map(user => {
        return {
          username: user.username,
          email: user.email,
          roles: user.roles.map(role => {
            return {
              name: role.role.name,
              description: role.role.description,
              permissions: role.role.permissions.map(permission => {
                return {
                  name: permission.permission.name,
                  description: permission.permission.description
                }
              })
            }
          })
        }
      })
    }
  }
}