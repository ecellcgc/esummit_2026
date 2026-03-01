import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate, Link } from "react-router-dom";
import UserCard from "@/components/dashboard/UserCard";
import CountdownCard from "@/components/dashboard/CountdownCard";
import StatsCard from "@/components/dashboard/StatsCard";
import EventsList from "@/components/dashboard/EventsList";
import ProfileInfo from "@/components/dashboard/ProfileInfo";
import { toast } from "sonner";
import { getMe, logout as apiLogout, getMyPasses } from "@/lib/api";
import bgImage from "@/assets/bgimage.png";
import { mockBackendData } from "../data/mockData";

const Index = () => {
	const navigate = useNavigate();
	const [user, setUser] = React.useState<typeof mockBackendData.user | null>(null);
	const [loading, setLoading] = React.useState(true);
	const [myPasses, setMyPasses] = React.useState<unknown[] | null>(null);

	React.useEffect(() => {
		getMe()
			.then((data) => {
				if (data) {
					const u = {
						name: data.name ?? data.fullName ?? data.email?.split("@")[0] ?? "User",
						esummit_id: data.esummit_id ?? data.id ?? "—",
						email: data.email ?? "",
						image: data.image ?? data.picture,
					};
					setUser(u);
					localStorage.setItem("user_data", JSON.stringify(u));
				} else {
					setUser(mockBackendData.user);
				}
			})
			.catch(() => {
				setUser(mockBackendData.user);
			})
			.finally(() => setLoading(false));
	}, []);

	React.useEffect(() => {
		getMyPasses()
			.then((data: unknown) => {
				const list = Array.isArray(data) ? data : (data as { passes?: unknown[] })?.passes ?? (data as { data?: unknown[] })?.data ?? null;
				setMyPasses(list ?? []);
			})
			.catch(() => setMyPasses(null));
	}, []);

	const handleLogout = () => {
		apiLogout();
		navigate("/login");
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-black/90">
				<p className="text-white/80">Loading...</p>
			</div>
		);
	}

	const displayUser = user ?? mockBackendData.user;

  return (
		<div
			className="relative min-h-screen bg-cover bg-center bg-fixed overflow-y-auto"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${bgImage})`,
      }}
    >
      {/* Ambient glow effect */}
      <div className="ambient-glow" />

			{/* Replaced Header with Global Navbar */}
			<div className="relative z-50">
				<Navbar scrollToPage={undefined} />
			</div>

			{/* Main Content Container - Centered with max-width */}
			<div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 pt-24 md:px-12 flex flex-col items-center space-y-8 pb-24 min-h-0">
				{/* Welcome Section */}
				<div className="mt-8 text-center">
					<h1 className="text-3xl font-bold text-white mb-4">Welcome back</h1>
					{/* Glass effect wrapper for the name */}
					<div className="inline-block px-8 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
						<span className="text-3xl md:text-4xl font-bold gradient-text">
							{displayUser.name}
						</span>
					</div>
					<p className="mt-4 text-zinc-300">
						Manage your E-Summit experience
					</p>
				</div>

				{/* 1. Top Row: User Card, Countdown, Stats */}
				{/* Added max-w-5xl and mx-auto to center this row */}
				<div className="grid gap-6 grid-cols-1 md:grid-cols-3 w-full max-w-5xl mx-auto">
					{/* User Card */}
					<div className="h-full">
						<UserCard user={displayUser} />
					</div>
				</div>

				{/* 2. Middle Row: Events & Profile Side-by-Side */}
				<div className="grid gap-6 grid-cols-1 md:grid-cols-2 w-full max-w-5xl mx-auto h-full">
					{/* Events List */}
					{/* <div className="w-full h-full">
						<EventsList events={mockBackendData.events} />
					</div> */}

					{/* Profile Information */}
					<div className="w-full h-full space-y-6">
						<ProfileInfo profile={{ ...mockBackendData.profile, fullName: displayUser.name, email: displayUser.email }} />
						{/* {myPasses !== null && (
							<div className="glass-card-hover p-6">
								<h3 className="font-semibold text-purple-300 mb-2">My passes</h3>
								{myPasses.length > 0 ? (
									<ul className="space-y-1 text-sm text-zinc-300">
										{myPasses.map((p: { passType?: { name?: string; slug?: string } | string; pass_type?: string; type?: string; status?: string; createdAt?: string }, i: number) => {
									const name = typeof p.passType === "object" ? p.passType?.name : p.passType || p.pass_type || (p as { type?: string }).type || "Pass";
									const statusLabel = p.status === "approved" ? "Approved" : p.status === "pending_verification" ? "Under Verification" : p.status === "rejected" ? "Rejected" : p.status ?? "Registered";
									return (
										<li key={i}>
											{name} — {statusLabel}
											{p.createdAt && ` · ${new Date(p.createdAt).toLocaleDateString()}`}
										</li>
									);
								})}
									</ul>
								) : (
									<p className="text-sm text-zinc-300">No passes yet.</p>
								)}
								<Link to="/passes" className="mt-3 inline-block text-sm text-purple-300 hover:text-purple-200 hover:underline">View all passes →</Link>
							</div>
						)} */}
					</div>
				</div>

				{/* Hidden Components (Removed from layout as requested)
        <div className="mb-6 w-full max-w-5xl mx-auto">
          <MerchBanner />
        </div>
        <div className="mb-6 w-full max-w-5xl mx-auto">
          <PassCard />
        </div>
        */}

				{/* Floating action buttons */}
				{/* Logout Button */}
				<div className="fixed bottom-6 left-6 right-6 flex flex-col-reverse md:flex-row justify-between gap-4 z-40 max-w-7xl mx-auto w-auto px-0 md:px-12 pointer-events-none">
					<button
						onClick={handleLogout}
						className="btn-gradient flex items-center justify-center gap-2 shadow-lg pointer-events-auto !w-full md:!w-auto"
					>
						Log Out
					</button>

					<Link
						to="/passes"
						className="btn-gradient flex items-center justify-center gap-2 shadow-lg pointer-events-auto !w-full md:!w-auto no-underline text-white"
					>
						Buy Passes
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Index;
