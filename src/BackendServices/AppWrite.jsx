import {Databases,Client,Storage, Account} from 'appwrite'
export const client=new Client()
client.setEndpoint(import.meta.env.VITE_API_ENDPOINT).setProject(import.meta.env.VITE_PROJECT_ID)
export const account=new Account(client)
export const database=new Databases(client)
export const storage=new Storage(client)