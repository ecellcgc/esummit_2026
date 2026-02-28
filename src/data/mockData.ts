import { DashboardData } from "../types/dashboard";

export const mockBackendData: DashboardData = {
    user: {
        name: "Ishan",
        esummit_id: "USR26-SZPE-SR3A",
        email: "[EMAIL_ADDRESS]", // Placeholder as per user's edit
        image: undefined,
    },
    stats: {
        eventsRegistered: 22,
    },
    targetDate: "2026-03-18T09:00:00",
    events: [
        {
            id: "1",
            title: "Panel Discussion with Sharks - Pratham Mittal & Shaily Mehrotra",
            date: "Jan 31, 2026",
            status: "Registered",
        },
        {
            id: "2",
            title: "Fireside Chat with Raghav Chandra (Urban Company)",
            date: "Jan 31, 2026",
            status: "Registered",
        },
        {
            id: "3",
            title: "Keynote by Ankur Warikoo - Success Is a Skill",
            date: "Feb 1, 2026",
            status: "Registered",
        },
        {
            id: "4",
            title: "Capital & Conviction — Inside Venture Investing",
            date: "Jan 31, 2026",
            status: "Registered",
        },
        {
            id: "5",
            title: "Blueprint Finale",
            date: "Jan 31 - Feb 1, 2026",
            status: "Registered",
        },
    ],
    profile: {
        fullName: "Ishan",
        email: "[EMAIL_ADDRESS]", // Placeholder as per user's edit
        phone: "",
        college: "",
        year: "2026",
        bio: "Excited to be part of Event 2026!",
    }
};
