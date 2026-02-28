import { Mail, Award } from "lucide-react";

interface User {
  name: string;
  esummit_id: string;
  email: string;
  image?: string;
}

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="glass-card-hover relative p-6 h-full flex flex-col justify-between">
      <div className="absolute right-4 top-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-purple">
          <Award className="h-5 w-5" />
        </div>
      </div>

      <div className="mb-4">
        <span className="text-xs uppercase tracking-wider text-purple-300">User ID</span>
        <p className="mt-1 font-mono text-lg font-semibold tracking-wide text-white">
          {user.esummit_id}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-gold overflow-hidden">
          {user.image ? (
            <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
          ) : (
            <span className="text-lg font-bold text-white">{user.name.charAt(0).toUpperCase()}</span>
          )}
        </div>
        <div>
          <p className="font-semibold text-white">{user.name}</p>
          <div className="flex items-center gap-2 text-sm text-zinc-300">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/30">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
            </span>
            Active
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-zinc-300">
        <Mail className="h-4 w-4" />
        <span className="truncate max-w-[200px]" title={user.email}>{user.email}</span>
      </div>
    </div>
  );
};

export default UserCard;
