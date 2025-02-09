"use client";
import * as React from "react";
import { Trash2 } from "lucide-react";
import { getSessions, deleteSession } from "@/app/actions/timer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SessionHistory() {
  const [sessions, setSessions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await getSessions();
        setSessions(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load sessions.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleDeleteSession = async (sessionId) => {
    await deleteSession(sessionId);
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    if (error) {
      console.error("Error deleting session:", error);
    }
  };

  const formatSessionHistory = (duration) => {
    return new Date(duration * 1000).toISOString().substring(14, 19);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <p>Loading sessions...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && sessions.length === 0 && (
          <p>No sessions available.</p>
        )}
        {sessions.length > 0 ? (
          <ul className="space-y-2">
            {sessions.map((session) => (
              <li key={session.id} className="flex items-center gap-2">
                <div
                  className={`text-sm font-medium ${
                    session.mode === "work"
                      ? "text-[#ff6961]"
                      : session.mode === "shortBreak"
                      ? "text-[#80ef80]"
                      : "text-[#a2bffe]"
                  }`}
                >
                  {session.mode === "work"
                    ? "Work"
                    : session.mode === "shortBreak"
                    ? "Short Break"
                    : "Long Break"}
                </div>
                <div className="flex flex-1 flex-col border-l pl-2">
                  <div className="text-sm text-muted-foreground">
                    {formatSessionHistory(session.duration)} |{" "}
                    {new Date(session.started_at).toLocaleString()}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-4 text-red-400"
                    onClick={() => handleDeleteSession(session.id)}
                  >
                    <Trash2 className="size-3" />
                    <span className="sr-only">Delete Timer Session</span>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </CardContent>
    </Card>
  );
}
