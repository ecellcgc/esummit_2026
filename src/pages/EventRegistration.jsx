import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Users, User, CheckCircle } from "lucide-react";
import {
  getCompetitions,
  registerCompetition,
  getMe,
} from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const ESUMMIT_ID_HINT = "Format: ES26 followed by 5–8 digits (e.g. ES2600001)";

function EventRegistration() {
  const [searchParams] = useSearchParams();
  const preselectedSlug = searchParams.get("competition");

  const [competitions, setCompetitions] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [teamName, setTeamName] = useState("");
  const [memberIds, setMemberIds] = useState(["", "", ""]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getCompetitions(), getMe()])
      .then(([list, me]) => {
        if (cancelled) return;
        setCompetitions(list);
        setUser(me);
        if (preselectedSlug && list.length) {
          const comp = list.find((c) => c.slug === preselectedSlug);
          if (comp) setSelected(comp);
        }
      })
      .catch(() => {
        if (!cancelled) setCompetitions([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [preselectedSlug]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (!selected) return;

    if (!selected.isIndividualOnly) {
      if (!teamName.trim()) {
        setError("Team name is required.");
        return;
      }
    }

    const memberEsummitIds = memberIds
      .map((id) => id.trim())
      .filter(Boolean);
    if (!selected.isIndividualOnly && memberEsummitIds.length > 3) {
      setError("Maximum 3 team members (plus you as leader).");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        competitionSlug: selected.slug,
        ...(selected.isIndividualOnly
          ? {}
          : {
              teamName: teamName.trim(),
              memberEsummitIds: memberEsummitIds.length ? memberEsummitIds : undefined,
            }),
      };
      await registerCompetition(payload);
      setSuccess(selected);
      setSelected(null);
      setTeamName("");
      setMemberIds(["", "", ""]);
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSelected(null);
    setTeamName("");
    setMemberIds(["", "", ""]);
    setError("");
    setSuccess(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050005] text-white flex items-center justify-center">
        <p className="text-white/80">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050005] text-white flex flex-col">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-[#050005] to-[#050005] pointer-events-none" />
      <header className="relative z-10 p-6">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors font-sans text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </Link>
      </header>

      <main className="relative z-10 flex-1 px-6 pb-16 max-w-2xl mx-auto w-full">
        <h1 className="font-sans text-3xl md:text-4xl font-bold text-white uppercase tracking-wide mb-2">
          Competition Registration
        </h1>
        <p className="text-zinc-400 text-sm mb-8">
          Register for E-Summit 2026 competitions. Team events allow up to 4 members (you + 3); Mock Trading is individual only.
        </p>

        {user && (
          <div className="mb-8 p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-zinc-400 text-xs uppercase tracking-wider mb-1">Your E-Summit ID</p>
            {user.esummitId ? (
              <>
                <p className="text-purple-300 font-mono font-semibold">{user.esummitId}</p>
                <p className="text-zinc-500 text-xs mt-1">Share this with teammates so they can add you to their team.</p>
              </>
            ) : (
              <>
                <p className="text-amber-400/90 text-sm">
                  Complete your profile (onboarding) to get your E-Summit ID before registering.
                </p>
                <Link to="/onboarding" className="text-purple-400 text-sm hover:underline mt-1 inline-block">
                  Complete onboarding →
                </Link>
              </>
            )}
          </div>
        )}

        {success && (
          <div className="mb-8 p-6 rounded-xl bg-green-500/10 border border-green-500/30 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="w-6 h-6 shrink-0" />
              <span className="font-semibold">You’re registered for {success.name}</span>
            </div>
            <p className="text-zinc-400 text-sm">Check your email or My Registrations for details.</p>
            <div className="flex gap-3 mt-2">
              <Button
                type="button"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                onClick={resetForm}
              >
                Register for another
              </Button>
              <Button asChild className="bg-purple-600 hover:bg-purple-700">
                <Link to="/events">Back to Events</Link>
              </Button>
            </div>
          </div>
        )}

        {!success && (
          <>
            {!selected ? (
              <div className="space-y-3">
                <p className="text-zinc-400 text-sm">Choose a competition to register:</p>
                {competitions.length === 0 ? (
                  <p className="text-zinc-500">No competitions available. Try again later.</p>
                ) : (
                  <ul className="grid gap-3">
                    {competitions.map((comp) => (
                      <li key={comp.id}>
                        <button
                          type="button"
                          onClick={() => setSelected(comp)}
                          className={cn(
                            "w-full text-left p-4 rounded-xl border transition-all",
                            "bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-500/50",
                            "flex items-center gap-3"
                          )}
                        >
                          {comp.isIndividualOnly ? (
                            <User className="w-5 h-5 text-purple-400 shrink-0" />
                          ) : (
                            <Users className="w-5 h-5 text-purple-400 shrink-0" />
                          )}
                          <div>
                            <p className="font-semibold text-white">{comp.name}</p>
                            <p className="text-zinc-500 text-xs">
                              {comp.isIndividualOnly ? "Individual" : "Team (up to 4)"}
                            </p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : selected ? (
              <form onSubmit={handleRegister} className="space-y-6 mt-8">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-zinc-500 text-xs uppercase tracking-wider">Selected</p>
                  <p className="font-semibold text-white">{selected.name}</p>
                  <p className="text-zinc-500 text-xs mt-0.5">
                    {selected.isIndividualOnly ? "Individual" : "Team (up to 4 members)"}
                  </p>
                </div>

                {!selected.isIndividualOnly && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="teamName" className="text-zinc-300">Team name</Label>
                      <Input
                        id="teamName"
                        type="text"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="e.g. Team Alpha"
                        className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-zinc-300">Teammate E-Summit IDs (optional, max 3)</Label>
                      <p className="text-zinc-500 text-xs">{ESUMMIT_ID_HINT}</p>
                      {[0, 1, 2].map((i) => (
                        <Input
                          key={i}
                          type="text"
                          value={memberIds[i] ?? ""}
                          onChange={(e) => {
                            const next = [...memberIds];
                            next[i] = e.target.value;
                            setMemberIds(next);
                          }}
                          placeholder={`Member ${i + 1} (e.g. ES2600002)`}
                          className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 font-mono"
                        />
                      ))}
                    </div>
                  </>
                )}

                {selected.isIndividualOnly && (
                  <p className="text-zinc-400 text-sm">You’ll register as an individual. Click Register below.</p>
                )}

                {error && (
                  <p className="p-3 rounded-lg bg-red-500/10 text-red-400 text-sm border border-red-500/20">
                    {error}
                  </p>
                )}

                <div className="flex flex-wrap gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                    onClick={resetForm}
                    disabled={submitting}
                  >
                    Change competition
                  </Button>
                  <Button
                    type="submit"
                    disabled={submitting || (user && !user.esummitId)}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    {submitting ? "Registering…" : "Register"}
                  </Button>
                </div>
              </form>
            ) : null}
          </>
        )}
      </main>
    </div>
  );
}

export default EventRegistration;
