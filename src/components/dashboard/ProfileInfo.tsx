import { User, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  year: string;
  bio: string;
}

interface ProfileInfoProps {
  profile: ProfileData;
}

const ProfileInfo = ({ profile }: ProfileInfoProps) => {
  const fields = [
    { label: "Full Name", value: profile.fullName, colSpan: 1 },
    { label: "Email", value: profile.email, colSpan: 1 },
    { label: "Phone", value: profile.phone, colSpan: 1 },
    { label: "College/Organization", value: profile.college, colSpan: 1 },
    { label: "Year/Role", value: profile.year, colSpan: 1 },
    { label: "Bio", value: profile.bio, colSpan: 1 },
  ];

  return (
    <div className="glass-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-purple-400" />
          <h2 className="text-lg font-semibold text-white">Profile Information</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-purple-400/50 text-purple-300 hover:bg-purple-500/15 hover:text-purple-200"
        >
          <Edit className="h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {fields.map((field) => (
          <div key={field.label} className="space-y-2">
            <label className="text-sm text-zinc-400">{field.label}</label>
            <Input
              value={field.value}
              readOnly
              className="border-white/15 bg-white/5 text-white placeholder:text-zinc-500 focus:border-purple-500/50"
              placeholder={`Enter ${field.label.toLowerCase()}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileInfo;
