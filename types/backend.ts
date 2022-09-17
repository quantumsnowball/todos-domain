import type { NextApiRequest, NextApiResponse } from 'next'
import { Collection } from 'mongodb'
import { Todo } from '.'
import { Nextable } from 'next-connect/dist/types/types'
import { RequestHandler } from 'next-connect/dist/types/node'


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

export type MongoOperation<R, P> = (client: Collection, payload: P) => Promise<R>

export type NextHandler<ResData> = (
  req: NextApiRequest,
  res: NextApiResponse<ResData>
) => void

type ResData = {
  message?: string,
  refreshToken?: string
}

export type Request = NextApiRequest

export interface Response<R = ResData> extends NextApiResponse<R> {
  cookie(name: string, value: string): void
}

export type Middleware<R = ResData> =
  Nextable<RequestHandler<NextApiRequest, Response<R>>>

export type MiddlewareLast<R = ResData> =
  RequestHandler<NextApiRequest, Response<R>>

