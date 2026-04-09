"use client";

import { useState } from "react";

const MAX_CHARS = 63206;

type Status = "idle" | "loading" | "success" | "error";

interface Props {
  defaultMessage?: string;
  defaultLink?: string;
}

export function PostComposer({ defaultMessage = "", defaultLink = "" }: Props) {
  const [message, setMessage] = useState(defaultMessage);
  const [link, setLink] = useState(defaultLink);
  const [mode, setMode] = useState<"now" | "schedule">("now");
  const [scheduledAt, setScheduledAt] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [postId, setPostId] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const body: Record<string, string> = { message };
    if (link.trim()) body.link = link.trim();
    if (mode === "schedule" && scheduledAt) body.scheduledAt = new Date(scheduledAt).toISOString();

    // Cookie-based auth — the httpOnly admin_session cookie is sent automatically
    const res = await fetch("/api/facebook/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (res.ok) {
      setStatus("success");
      setPostId(data.postId ?? "");
      setMessage("");
      setLink("");
      setScheduledAt("");
      setMode("now");
    } else {
      setStatus("error");
      setErrorMsg(data.error ?? "Error desconocido");
    }
  }

  const charsLeft = MAX_CHARS - message.length;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1">
        <label htmlFor="fb-message" className="text-sm font-medium">
          Mensaje
        </label>
        <textarea
          id="fb-message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          maxLength={MAX_CHARS}
          placeholder="Escribe tu publicación aquí…"
          className="w-full border rounded-md px-3 py-2 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <p className={`text-xs text-right ${charsLeft < 500 ? "text-destructive" : "text-muted-foreground"}`}>
          {charsLeft.toLocaleString()} caracteres restantes
        </p>
      </div>

      <div className="space-y-1">
        <label htmlFor="fb-link" className="text-sm font-medium">
          Enlace <span className="text-muted-foreground font-normal">(opcional)</span>
        </label>
        <input
          id="fb-link"
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://…"
          className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="flex gap-4">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="radio"
            name="fb-mode"
            value="now"
            checked={mode === "now"}
            onChange={() => setMode("now")}
          />
          Publicar ahora
        </label>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="radio"
            name="fb-mode"
            value="schedule"
            checked={mode === "schedule"}
            onChange={() => setMode("schedule")}
          />
          Programar
        </label>
      </div>

      {mode === "schedule" && (
        <div className="space-y-1">
          <label htmlFor="fb-scheduled-at" className="text-sm font-medium">
            Fecha y hora
          </label>
          <input
            id="fb-scheduled-at"
            type="datetime-local"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
            required={mode === "schedule"}
            min={new Date(Date.now() + 60_000).toISOString().slice(0, 16)}
            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      )}

      {status === "success" && (
        <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2">
          {mode === "schedule"
            ? "Publicación programada correctamente."
            : "Publicado en Facebook."}{" "}
          {postId && <span className="font-mono text-xs">{postId}</span>}
        </p>
      )}

      {status === "error" && (
        <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md px-3 py-2">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading" || message.trim().length === 0}
        className="bg-primary text-primary-foreground rounded-md px-5 py-2 text-sm font-medium disabled:opacity-50"
      >
        {status === "loading"
          ? "Publicando…"
          : mode === "schedule"
          ? "Programar publicación"
          : "Publicar en Facebook"}
      </button>
    </form>
  );
}
