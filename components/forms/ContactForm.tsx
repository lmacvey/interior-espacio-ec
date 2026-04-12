"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";
import { contactSchema, type ContactFormValues } from "@/lib/validations";
import { trackFormSubmit } from "@/lib/analytics";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormValues) {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      trackFormSubmit();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <CheckCircle className="w-8 h-8 text-success" strokeWidth={1.5} />
        <h3
          className="font-display text-xl font-medium text-text-primary"
          style={{ lineHeight: "var(--leading-heading)" }}
        >
          Mensaje recibido
        </h3>
        <p className="text-text-secondary text-sm" style={{ lineHeight: "var(--leading-body)" }}>
          Te respondo en un día hábil.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-[var(--radius-md)] border-[1.5px] border-border bg-background px-4 py-3.5 text-[15px] text-text-primary placeholder:text-text-muted placeholder:italic transition-[border-color,box-shadow] duration-150 focus:outline-none focus:border-border-strong focus:shadow-[0_0_0_3px_var(--primary-light)]";

  const inputErrorClass =
    "w-full rounded-[var(--radius-md)] border-[1.5px] border-destructive bg-destructive-light px-4 py-3.5 text-[15px] text-text-primary placeholder:text-text-muted placeholder:italic transition-[border-color,box-shadow] duration-150 focus:outline-none focus:border-destructive focus:shadow-[0_0_0_3px_var(--destructive-light)]";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2" htmlFor="name">
          Nombre completo
        </label>
        <input
          id="name"
          {...register("name")}
          className={errors.name ? inputErrorClass : inputClass}
          placeholder="Tu nombre"
        />
        {errors.name && (
          <p className="mt-1.5 flex items-center gap-1 text-xs text-destructive">
            <AlertCircle className="w-3 h-3 flex-shrink-0" strokeWidth={1.5} />
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2" htmlFor="email">
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className={errors.email ? inputErrorClass : inputClass}
          placeholder="tucorreo@ejemplo.com"
        />
        {errors.email && (
          <p className="mt-1.5 flex items-center gap-1 text-xs text-destructive">
            <AlertCircle className="w-3 h-3 flex-shrink-0" strokeWidth={1.5} />
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2" htmlFor="message">
          Mensaje
        </label>
        <textarea
          id="message"
          {...register("message")}
          rows={5}
          className={`${errors.message ? inputErrorClass : inputClass} resize-none min-h-[140px]`}
          placeholder="Cuéntame un poco de lo que estás buscando o lo que estás viviendo..."
        />
        {errors.message && (
          <p className="mt-1.5 flex items-center gap-1 text-xs text-destructive">
            <AlertCircle className="w-3 h-3 flex-shrink-0" strokeWidth={1.5} />
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        aria-label={status === "loading" ? "Enviando mensaje..." : "Enviar mensaje"}
        className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
      >
        {status === "loading" ? "Enviando..." : "Enviar mensaje"}
      </button>

      {status === "error" && (
        <p className="flex items-center justify-center gap-1.5 text-sm text-destructive">
          <AlertCircle className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
          Algo salió mal. Por favor, intenta de nuevo.
        </p>
      )}
    </form>
  );
}
