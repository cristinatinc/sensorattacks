import UserInputForm from '@/components/user-input-form'
import Chat from '@/components/user-chat'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Physical Guards</h1>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
        <UserInputForm />
        <Chat />
      </div>
    </main>
  )
}