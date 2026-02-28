import { CalendarDays, ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Event } from "@/types/dashboard";

interface EventsListProps {
  events: Event[];
}

const EventsList = ({ events }: EventsListProps) => {
  return (
    <div className="glass-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-purple-400" />
          <h2 className="text-lg font-semibold text-white">My Registered Events</h2>
        </div>
        <Button variant="link" className="gap-1 text-purple-300 hover:text-purple-200">
          View All
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        {events.length > 0 ? (
          events.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4 transition-all hover:border-white/20 hover:bg-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20">
                  <CalendarDays className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="font-medium leading-tight text-white">{event.title}</p>
                  <p className="mt-1 text-sm text-zinc-300">{event.date}</p>
                </div>
              </div>
              <span className="badge-status">{event.status}</span>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-zinc-400">
            No registered events found.
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsList;
