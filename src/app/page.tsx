import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GreenGen Finance',
  description: 'GreenGen Finance offers personalized financial planning for eco-conscious consumers and small businesses, integrating sustainable investments with personal finance management tools.',
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">GreenGen Finance</h1>
      <p className="mt-4 text-lg">GreenGen Finance offers personalized financial planning for eco-conscious consumers and small businesses, integrating sustainable investments with personal finance management tools.</p>
    </main>
  )
}
