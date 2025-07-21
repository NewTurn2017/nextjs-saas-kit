import { Header } from "../../components/app/Header"

export default function AppLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<div className="flex flex-col h-screen bg-[var(--background)]">
			<Header />
			<main className="flex-1 overflow-x-hidden overflow-y-auto bg-[var(--background)]">
				{children}
			</main>
		</div>
	)
}