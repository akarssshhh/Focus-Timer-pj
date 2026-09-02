import { useEffect, useMemo, useRef, useState } from "react";
import useTimer from "./useTimer";

const API_URL = "http://localhost:3002/sessions";

function App() {
  // -----------------------------
  // TIMER
  // -----------------------------
  const {
    seconds,
    running,
    start,
    pause,
    reset,
  } = useTimer(25 * 60);

  // -----------------------------
  // SESSION
  // -----------------------------
  const [label, setLabel] = useState("");
  const [category, setCategory] = useState("study");
  const [sessions, setSessions] = useState([]);

  // -----------------------------
  // API STATUS
  // -----------------------------
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  // -----------------------------
  // SEARCH / FILTER
  // -----------------------------
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  // -----------------------------
  // REFS
  // -----------------------------
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // -----------------------------
  // AUTO FOCUS INPUT
  // -----------------------------
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // -----------------------------
  // GET /sessions
  // -----------------------------
  useEffect(() => {
    const getSessions = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to load sessions");
        }

        const data = await response.json();
        setSessions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getSessions();
  }, []);

  // -----------------------------
  // POST COMPLETED SESSION
  // -----------------------------
  useEffect(() => {
    if (seconds !== 0) return;

    const saveSession = async () => {
      try {
        setSaving(true);
        setSaveError("");

        const newSession = {
          label: label.trim() || "Untitled Session",
          minutes: 25,
          category,
          completedAt: new Date().toISOString(),
        };

        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSession),
        });

        if (!response.ok) {
          throw new Error("Failed to save session");
        }

        const savedSession = await response.json();

        setSessions((current) => [...current, savedSession]);
      } catch (err) {
        setSaveError(err.message);
      } finally {
        setSaving(false);
      }
    };

    saveSession();
  }, [seconds, label, category]);

  // -----------------------------
  // SCROLL TO NEWEST SESSION
  // -----------------------------
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [sessions]);

  // -----------------------------
  // RESET
  // -----------------------------
  const handleReset = () => {
    reset();
    inputRef.current.focus();
  };

  // -----------------------------
  // FORMAT TIME
  // -----------------------------
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const time =
    `${String(minutes).padStart(2, "0")}:` +
    `${String(remainingSeconds).padStart(2, "0")}`;

  // -----------------------------
  // STATS - useMemo
  // -----------------------------
  const stats = useMemo(() => {
    const totalMinutes = sessions.reduce(
      (total, session) => total + session.minutes,
      0
    );

    const sessionCount = sessions.length;

    const averageSession =
      sessionCount === 0
        ? 0
        : totalMinutes / sessionCount;

    return {
      totalMinutes,
      sessionCount,
      averageSession,
    };
  }, [sessions]);

  // -----------------------------
  // FILTERED SESSIONS - useMemo
  // -----------------------------
  const filteredSessions = useMemo(() => {
    return sessions.filter((session) => {
      const matchesSearch = session.label
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        filterCategory === "all" ||
        session.category === filterCategory;

      return matchesSearch && matchesCategory;
    });
  }, [sessions, search, filterCategory]);

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <div className="mx-auto max-w-2xl">

        <h1 className="mb-8 text-center text-4xl font-bold">
          Focus Timer
        </h1>

        {/* -----------------------------
            STATS
        ----------------------------- */}
        <div className="mb-8 grid grid-cols-3 gap-4">

          <div className="rounded-xl bg-gray-800 p-4 text-center">
            <p className="text-sm text-gray-400">
              Total Focus Time
            </p>

            <p className="mt-2 text-2xl font-bold">
              {stats.totalMinutes} min
            </p>
          </div>

          <div className="rounded-xl bg-gray-800 p-4 text-center">
            <p className="text-sm text-gray-400">
              Sessions
            </p>

            <p className="mt-2 text-2xl font-bold">
              {stats.sessionCount}
            </p>
          </div>

          <div className="rounded-xl bg-gray-800 p-4 text-center">
            <p className="text-sm text-gray-400">
              Average
            </p>

            <p className="mt-2 text-2xl font-bold">
              {stats.averageSession.toFixed(1)} min
            </p>
          </div>

        </div>

        {/* -----------------------------
            TIMER
        ----------------------------- */}
        <div className="rounded-2xl bg-gray-800 p-8">

          <label className="mb-2 block">
            Session Label
          </label>

          <input
            ref={inputRef}
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="What are you working on?"
            className="mb-4 w-full rounded-lg bg-gray-700 p-3"
          />

          <label className="mb-2 block">
            Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mb-8 w-full rounded-lg bg-gray-700 p-3"
          >
            <option value="study">Study</option>
            <option value="coding">Coding</option>
            <option value="reading">Reading</option>
            <option value="other">Other</option>
          </select>

          <div className="mb-8 text-center text-7xl font-bold">
            {time}
          </div>

          {seconds === 0 && (
            <p className="mb-6 text-center text-green-400">
              Session complete!
            </p>
          )}

          <div className="flex justify-center gap-4">

            <button
              onClick={running ? pause : start}
              disabled={seconds === 0}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold"
            >
              {running ? "Pause" : "Start"}
            </button>

            <button
              onClick={handleReset}
              className="rounded-lg bg-gray-600 px-6 py-3 font-semibold"
            >
              Reset
            </button>

          </div>

          {saving && (
            <p className="mt-5 text-center text-yellow-400">
              Saving…
            </p>
          )}

          {saveError && (
            <p className="mt-5 text-center text-red-400">
              {saveError}
            </p>
          )}

        </div>

        {/* -----------------------------
            SESSIONS
        ----------------------------- */}
        <div className="mt-8 rounded-2xl bg-gray-800 p-6">

          <h2 className="mb-4 text-2xl font-bold">
            Completed Sessions
          </h2>

          {/* SEARCH */}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search sessions..."
            className="mb-4 w-full rounded-lg bg-gray-700 p-3"
          />

          {/* CATEGORY FILTER */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="mb-6 w-full rounded-lg bg-gray-700 p-3"
          >
            <option value="all">All Categories</option>
            <option value="study">Study</option>
            <option value="coding">Coding</option>
            <option value="reading">Reading</option>
            <option value="other">Other</option>
          </select>

          {loading && (
            <p className="text-gray-400">
              Loading sessions...
            </p>
          )}

          {error && (
            <p className="text-red-400">
              {error}
            </p>
          )}

          {!loading &&
            !error &&
            filteredSessions.length === 0 && (
              <p className="text-gray-400">
                No matching sessions found.
              </p>
            )}

          <div
            ref={listRef}
            className="max-h-80 space-y-3 overflow-y-auto"
          >
            {filteredSessions.map((session) => (
              <div
                key={session.id}
                className="rounded-lg bg-gray-700 p-4"
              >
                <div className="flex justify-between">

                  <div>
                    <p className="font-semibold">
                      {session.label}
                    </p>

                    <p className="text-sm text-gray-400">
                      {session.category}
                    </p>
                  </div>

                  <div className="text-right">

                    <p>
                      {session.minutes} min
                    </p>

                    <p className="text-xs text-gray-400">
                      {new Date(
                        session.completedAt
                      ).toLocaleString()}
                    </p>

                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;