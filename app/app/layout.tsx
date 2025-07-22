import { Header } from "../../components/app/Header"

export default function AppLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<div className="flex flex-col h-full">
			<Header />
			<main className="flex-1 overflow-x-hidden overflow-y-auto">
				{children}
			</main>
		</div>
	)
}