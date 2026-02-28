export interface User {
    name: string;
    esummit_id: string;
    email: string;
    image?: string;
}

export interface Stats {
    eventsRegistered: number;
}

export interface Event {
    id: string;
    title: string;
    date: string;
    status: "Registered" | "Pending" | "Completed"; // Add likely status types
}

export interface Profile {
    fullName: string;
    email: string;
    phone: string;
    college: string;
    year: string;
    bio: string;
}

export interface DashboardData {
    user: User;
    stats: Stats;
    targetDate: string;
    events: Event[];
    profile: Profile;
}
