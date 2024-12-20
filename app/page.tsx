'use client'
import { useEffect, useState, useMemo } from 'react'
import { useSession, useUser } from '@clerk/nextjs'
import { createClient } from '@supabase/supabase-js'
import Header from '@/components/Header'
import CheckoutButton from '@/components/CheckoutButton'

// Add this interface at the top of the file, after the imports
interface Task {
  id: number;
  name: string;
  // Add other properties if needed
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  // The `useUser()` hook will be used to ensure that Clerk has loaded data about the logged in user
  const { user } = useUser()
  // The `useSession()` hook will be used to get the Clerk session object
  const { session } = useSession()

  // Create a custom supabase client that injects the Clerk Supabase token into the request headers
  const client = useMemo(() => {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          // Get the custom Supabase token from Clerk
          fetch: async (url, options = {}) => {
            const clerkToken = await session?.getToken({
              template: 'supabase',
            })

            // Insert the Clerk Supabase token into the headers
            const headers = new Headers(options?.headers)
            headers.set('Authorization', `Bearer ${clerkToken}`)

            // Now call the default fetch
            return fetch(url, {
              ...options,
              headers,
            })
          },
        },
      },
    )
  }, [session])

  // This `useEffect` will wait for the User object to be loaded before requesting
  // the tasks for the logged in user
  useEffect(() => {
    if (!user) return

    async function loadTasks() {
      setLoading(true)
      const { data, error } = await client.from('tasks').select()
      if (!error) setTasks(data as Task[])
      setLoading(false)
    }

    loadTasks()
  }, [user, client])

  async function createTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const { data, error } = await client.from('tasks').insert({ name }).select()
    if (!error && data) {
      setTasks([...tasks, ...data])
      setName('')
    }
  }

  return (
    <div>
      <Header />
      <CheckoutButton />

      <h1>Tasks</h1>

      {loading && <p>Loading...</p>}

      {!loading && tasks.length > 0 && tasks.map((task: Task) => <p key={task.id}>{task.name}</p>)}

      {!loading && tasks.length === 0 && <p>No tasks found</p>}

      <form onSubmit={createTask}>
        <input
          autoFocus
          type="text"
          name="name"
          placeholder="Enter new task"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}
