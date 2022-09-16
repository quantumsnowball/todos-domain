import type { NextApiRequest, NextApiResponse } from 'next'
import { Collection } from 'mongodb'
import { Todo } from '.'


export interface User {
  email: string,
}

export interface UserWithPassword extends User {
  hashedPassword: string
}

export interface PendingUser extends UserWithPassword {
  activationToken: string
}

export interface UserFilter {
  user: string
}

export type TodoDocument = UserFilter & Todo

export interface TokenPayload extends UserFilter {
  id: number,
}

export type MongoOperation<R, P> = (client: Collection, payload?: P) => Promise<R>

export type NextHandler<ResData> = (
  req: NextApiRequest,
  res: NextApiResponse<ResData>
) => void

