import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, PRIVACY_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Eliminación de datos de Facebook",
  description:
    "Instrucciones sobre la eliminación de datos de usuario relacionados con la integración de Facebook en el sitio de Espacio Interior EC.",
  alternates: { canonical: `${SITE_URL}/facebook/data-deletion` },
  robots: { index: false },
};

export default async function FacebookDataDeletionPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { code } = await searchParams;
  const confirmationCode = typeof code === "string" ? code : null;

  return (
    <article className="py-16 md:py-24 px-4 md:px-6">
      <div className="mx-auto max-w-2xl">

        <div className="mb-10">
          <p className="text-xs font-medium uppercase tracking-widest text-text-muted mb-3">
            Facebook / Meta
          </p>
          <h1 className="font-display text-3xl md:text-4xl mb-4 text-text-primary">
            Eliminación de datos de usuario
          </h1>
          <p className="text-text-muted text-sm leading-relaxed">
            Esta página cumple con el requisito de Meta Platforms, Inc. de publicar
            instrucciones de eliminación de datos para aplicaciones que utilizan
            la plataforma de Facebook.
          </p>
        </div>

        {/* Confirmation state — shown when Facebook redirects here after callback */}
        {confirmationCode && (
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8 text-sm leading-relaxed space-y-2 text-text-muted mb-8">
            <p className="font-semibold text-text-primary">
              Solicitud de eliminación registrada
            </p>
            <p>
              Hemos recibido tu solicitud. Dado que no almacenamos datos de usuario
              de Facebook, no existe información que eliminar.
            </p>
            <p className="text-xs pt-1">
              Código de confirmación:{" "}
              <span className="font-mono text-text-primary">{confirmationCode}</span>
            </p>
          </div>
        )}

        <div className="rounded-2xl border border-border bg-surface-2 p-6 md:p-8 text-sm leading-relaxed space-y-4 text-text-muted mb-8">
          <h2 className="font-display text-lg text-text-primary">
            No almacenamos datos de Facebook
          </h2>
          <p>
            El sitio web de Espacio Interior EC utiliza la API pública de Facebook
            únicamente para mostrar publicaciones de nuestra página oficial. Esta
            integración es de <strong className="text-text-primary">solo lectura</strong>:
            el sitio no solicita autorización a usuarios de Facebook, no accede a
            perfiles personales ni almacena ningún dato vinculado a cuentas de
            Facebook.
          </p>
          <p>
            Dado que no recopilamos ni guardamos datos de usuario de Facebook, no
            existe información personal que eliminar de nuestros sistemas.
          </p>
        </div>

        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8 text-sm leading-relaxed space-y-3 text-text-muted mb-8">
          <h2 className="font-display text-lg text-text-primary">
            ¿Tienes una solicitud de eliminación?
          </h2>
          <p>
            Si crees que Espacio Interior EC pudiera tener algún dato tuyo y deseas
            solicitar su eliminación, escríbenos y lo verificaremos de inmediato:
          </p>
          <a
            href={`mailto:${PRIVACY_EMAIL}?subject=Solicitud%20de%20eliminaci%C3%B3n%20de%20datos%20%E2%80%94%20Facebook`}
            className="inline-block font-medium text-primary underline underline-offset-2"
          >
            {PRIVACY_EMAIL}
          </a>
          <p>
            Responderemos en un plazo máximo de{" "}
            <strong className="text-text-primary">30 días</strong>.
          </p>
        </div>

        <p className="text-xs text-text-muted">
          Para más información sobre cómo tratamos los datos personales, consulta
          nuestra{" "}
          <Link
            href="/privacy"
            className="text-primary underline underline-offset-2"
          >
            Política de Privacidad
          </Link>
          .
        </p>

      </div>
    </article>
  );
}
