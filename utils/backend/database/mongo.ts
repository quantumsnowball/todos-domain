import { MongoClient, Collection, ObjectId } from 'mongodb'
import { URL_MONGO } from '../../../constants'
import { TodoWithId, _Id } from '../../../types'
import {
  MongoOperation,
  PendingUser,
  TodoDocument,
  User,
  UserFilter,
  UserWithPassword
} from '../../../types/backend'


// operation decorator
const operation = <R, P>(func: MongoOperation<R, P>) =>
  async (databaseName: string, collectionName: string, payload: P): Promise<R | void> => {
    const client = new MongoClient(URL_MONGO)
    try {
      // connect
      await client.connect()
      // get db and collection
      const collection = client.db(databaseName).collection(collectionName)
      // do opertion
      return await func(collection, payload)
    }
    catch (error) {
      console.log(error)
    }
    finally {
      // close client
      await client.close()
    }
  }

export default {
  // insert pending user
  upsertPendingUser: operation(
    async (collection: Collection, filter: PendingUser) => {
      await collection.deleteMany({ email: filter.email })
      await collection.insertOne(filter)
    }
  ),
  // find pending user
  findPendingUser: operation(
    async (collection: Collection, filter: User) => {
      return await collection.findOne<PendingUser>(filter)
    }
  ),
  // delete pending users
  deletePendingUsers: operation(
    async (collection: Collection, filter: User) => {
      return await collection.deleteMany(filter)
    }
  ),
  // insert user
  insertUser: operation(
    async (collection: Collection, filter: UserWithPassword) => {
      await collection.insertOne(filter)
    }
  ),
  // upsert oauth user
  upsertOAuthUser: operation(
    async (collection: Collection, filter: User) => {
      await collection.updateOne(filter, { $setOnInsert: filter }, { upsert: true })
    }
  ),
  // find user
  findUser: operation(
    async (collection: Collection, filter: User) => {
      return await collection.findOne<UserWithPassword>(filter)
    }
  ),
  // insert todo
  insertTodo: operation(
    async (collection: Collection, doc: TodoDocument) => {
      await collection.insertOne(doc)
    }
  ),
  // delete todo
  deleteTodo: operation(
    async (collection: Collection, filter: _Id) => {
      await collection.deleteOne({ _id: new ObjectId(filter._id) })
    }
  ),
  // find todo
  findTodos: operation(
    async (collection: Collection, filter: UserFilter) => {
      const cursor = collection.find<TodoWithId>(filter, { projection: { title: 1, content: 1 } })
      const found = await cursor.toArray()
      return found
    }
  )
}
