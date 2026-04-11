import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, PRIVACY_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Conoce cómo Espacio Interior EC protege tu información personal y el tratamiento de datos en el marco de la atención psicológica en línea.",
  alternates: { canonical: `${SITE_URL}/privacy` },
};

const LAST_UPDATED = "abril de 2025";

function PolicySection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-12 scroll-mt-24">
      <h2 className="font-display text-xl md:text-2xl mb-4 text-text-primary">
        {title}
      </h2>
      <div className="text-text-muted text-sm leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <article className="py-16 md:py-24 px-4 md:px-6">
      <div className="mx-auto max-w-4xl">

        {/* Page header */}
        <div className="mb-10">
          <h1 className="font-display text-3xl md:text-4xl mb-2 text-text-primary">
            Política de Privacidad
          </h1>
          <p className="text-xs text-text-muted">
            Última actualización: {LAST_UPDATED}
          </p>
          <p className="mt-4 text-text-muted text-sm leading-relaxed max-w-2xl">
            En Espacio Interior EC nos comprometemos a proteger tu privacidad y a
            tratar tu información con responsabilidad, transparencia y respeto. Esta
            política describe qué información recopilamos, cómo la usamos y cuáles
            son tus derechos.
          </p>
        </div>

        {/* Table of contents */}
        <nav
          aria-label="Contenido de esta página"
          className="mb-12 rounded-2xl border border-border bg-surface-2 p-5 md:p-6"
        >
          <p className="font-semibold text-sm mb-3 text-text-primary">
            En esta página
          </p>
          <ol className="space-y-1.5 text-sm text-text-muted list-decimal list-inside">
            <li>
              <a href="#informacion-recopilada" className="hover:text-text-primary transition-colors">
                Información que recopilamos
              </a>
            </li>
            <li>
              <a href="#uso-informacion" className="hover:text-text-primary transition-colors">
                Uso de la información
              </a>
            </li>
            <li>
              <a href="#confidencialidad" className="hover:text-text-primary transition-colors">
                Confidencialidad terapéutica
              </a>
            </li>
            <li>
              <a href="#divulgaciones" className="hover:text-text-primary transition-colors">
                Cuándo podemos divulgar información
              </a>
            </li>
            <li>
              <a href="#aviso-practicas" className="hover:text-text-primary transition-colors">
                Aviso de Prácticas de Privacidad
              </a>
            </li>
            <li>
              <a href="#tus-derechos" className="hover:text-text-primary transition-colors">
                Tus derechos
              </a>
            </li>
            <li>
              <a href="#seguridad" className="hover:text-text-primary transition-colors">
                Medidas de seguridad
              </a>
            </li>
            <li>
              <a href="#terceros" className="hover:text-text-primary transition-colors">
                Servicios de terceros
              </a>
            </li>
            <li>
              <a href="#lopdp" className="hover:text-text-primary transition-colors">
                Marco legal ecuatoriano (LOPDP)
              </a>
            </li>
            <li>
              <a href="#cambios" className="hover:text-text-primary transition-colors">
                Cambios a esta política
              </a>
            </li>
            <li>
              <a href="#contacto-privacidad" className="hover:text-text-primary transition-colors">
                Contacto
              </a>
            </li>
          </ol>
        </nav>

        {/* Section 1 */}
        <PolicySection id="informacion-recopilada" title="1. Información que recopilamos">
          <p className="font-medium text-text-primary">
            a) Información que tú nos proporcionas directamente
          </p>
          <p>
            A través del formulario de contacto recopilamos tu nombre completo, dirección de
            correo electrónico y el contenido del mensaje. Esta información es enviada
            directamente a Grace P. Pacheco a través de Amazon Web Services Simple Email
            Service (AWS SES). No se almacena en los servidores del sitio web ni en ninguna
            base de datos de la aplicación.
          </p>
          <p className="font-medium text-text-primary">
            b) Información de sesiones terapéuticas
          </p>
          <p>
            Las sesiones se realizan a través de plataformas externas de videoconferencia. Las
            notas clínicas, registros de sesión e información de salud mental son mantenidos
            exclusivamente por la profesional de acuerdo con sus obligaciones éticas y legales,
            y <strong>no son almacenados en este sitio web</strong>.
          </p>
          <p className="font-medium text-text-primary">
            c) Información recopilada automáticamente
          </p>
          <p>
            Como la mayoría de los sitios web, nuestro servidor puede registrar automáticamente
            ciertos datos técnicos: dirección IP, tipo de navegador, sistema operativo, páginas
            visitadas y fecha/hora de acceso. Estos datos se utilizan únicamente para el
            correcto funcionamiento técnico del sitio y no se usan para crear perfiles de
            usuarios ni para fines comerciales.
          </p>
        </PolicySection>

        {/* Section 2 */}
        <PolicySection id="uso-informacion" title="2. Uso de la información">
          <p>Utilizamos la información recopilada para:</p>
          <ul className="space-y-2 pl-4">
            {[
              "Responder a tus consultas y coordinar sesiones terapéuticas.",
              "Enviarte confirmaciones, recordatorios o información relacionada con tu proceso, si así lo has autorizado.",
              "Mejorar el funcionamiento técnico del sitio web.",
              "Cumplir con obligaciones legales o éticas aplicables a la práctica psicológica.",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p>
            No utilizamos tu información para fines comerciales ni publicitarios. No vendemos,
            cedemos ni transferimos tus datos personales a terceros, salvo en los casos
            específicos descritos en esta política.
          </p>
        </PolicySection>

        {/* Section 3 — highlighted card */}
        <section id="confidencialidad" className="mb-12 scroll-mt-24">
          <h2 className="font-display text-xl md:text-2xl mb-4 text-text-primary">
            3. Confidencialidad terapéutica
          </h2>
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 text-sm leading-relaxed space-y-3 text-text-muted">
            <p>
              La relación terapéutica está regida por el principio ético de{" "}
              <strong className="text-text-primary">confidencialidad</strong>. Todo lo que
              compartes en el contexto de la terapia es tratado con estricta reserva
              profesional.
            </p>
            <p>
              Como Psicóloga Clínica, Grace P. Pacheco está sujeta al Código de Ética del
              Colegio de Psicólogos del Ecuador y a los estándares internacionales de la
              práctica psicológica, que establecen la confidencialidad como una obligación
              deontológica fundamental.
            </p>
            <p className="italic">
              "La confidencialidad es un elemento esencial del espacio terapéutico: no existe
              proceso sin confianza."
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <PolicySection
          id="divulgaciones"
          title="4. Cuándo podemos divulgar información"
        >
          <p>
            La confidencialidad tiene excepciones legales y éticas reconocidas. Podemos estar
            obligados a divulgar información únicamente en los siguientes casos:
          </p>
          <ul className="space-y-3 pl-4">
            {[
              {
                title: "Riesgo grave e inminente",
                body: "Cuando existe un riesgo real de daño grave para ti o para una tercera persona, la profesional puede estar obligada a comunicar dicha situación a las autoridades competentes o a terceros necesarios para prevenir el daño.",
              },
              {
                title: "Obligación legal",
                body: "Cuando una autoridad judicial o administrativa competente requiera información mediante orden legal debidamente fundamentada.",
              },
              {
                title: "Consentimiento explícito",
                body: "Cuando tú hayas otorgado consentimiento expreso, específico e informado para compartir información con un tercero (por ejemplo, con otro profesional de salud).",
              },
              {
                title: "Menores de edad",
                body: "En caso de atender a menores de edad, los tutores legales tienen derechos de acceso conforme a la ley ecuatoriana, dentro de los límites que el interés superior del menor permite.",
              },
            ].map(({ title, body }) => (
              <li key={title} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                  <strong className="text-text-primary">{title}:</strong> {body}
                </span>
              </li>
            ))}
          </ul>
          <p>
            En cualquier otra circunstancia, tu información no será divulgada a terceros sin
            tu consentimiento expreso.
          </p>
        </PolicySection>

        {/* Section 5 — elevated card */}
        <section id="aviso-practicas" className="mb-12 scroll-mt-24">
          <h2 className="font-display text-xl md:text-2xl mb-4 text-text-primary">
            5. Aviso de Prácticas de Privacidad
          </h2>
          <div className="rounded-2xl border border-border bg-surface-2 p-6 text-sm leading-relaxed space-y-4 text-text-muted">
            <p className="font-semibold text-text-primary">
              Espacio Interior EC se compromete a:
            </p>
            <ol className="space-y-2 list-decimal list-inside">
              <li>Mantener la privacidad de tu información de salud y datos personales.</li>
              <li>
                Proporcionarte este Aviso con las prácticas sobre privacidad que aplican a tu
                información.
              </li>
              <li>Seguir los términos de este Aviso mientras esté vigente.</li>
              <li>
                Notificarte en caso de que se produzca una vulneración de seguridad que afecte
                tu información personal.
              </li>
            </ol>
            <p>
              Tienes derecho a solicitar una copia electrónica de este Aviso en cualquier
              momento escribiendo a{" "}
              <a
                href={`mailto:${PRIVACY_EMAIL}`}
                className="text-primary underline underline-offset-2"
              >
                {PRIVACY_EMAIL}
              </a>
              .
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <PolicySection id="tus-derechos" title="6. Tus derechos">
          <p>
            De acuerdo con la legislación ecuatoriana y los principios equivalentes a la
            normativa HIPAA, tienes los siguientes derechos sobre tu información:
          </p>
          <ul className="space-y-3 pl-4">
            {[
              {
                title: "Derecho de acceso",
                body: "Puedes solicitar acceso a los datos personales que mantenemos sobre ti, incluida información enviada a través del formulario de contacto.",
              },
              {
                title: "Derecho de rectificación",
                body: "Puedes solicitar la corrección o actualización de tu información si es inexacta o está incompleta.",
              },
              {
                title: "Derecho a conocer las divulgaciones",
                body: "Puedes solicitar un registro de las ocasiones en que tu información ha sido compartida con terceros, salvo las excepciones descritas anteriormente.",
              },
              {
                title: "Derecho a solicitar restricciones",
                body: "Puedes solicitar limitaciones sobre el uso o divulgación de tu información, aunque en algunos casos podría no ser posible aceptar dicha solicitud si afecta la prestación del servicio terapéutico.",
              },
              {
                title: "Derecho a presentar una queja",
                body: "Si consideras que tus derechos de privacidad han sido vulnerados, puedes presentar una queja ante la Superintendencia de Protección de Datos Personales del Ecuador o directamente con nosotros.",
              },
              {
                title: "Derecho a recibir este Aviso",
                body: "Tienes derecho a recibir este aviso de prácticas de privacidad antes de iniciar el proceso terapéutico.",
              },
            ].map(({ title, body }) => (
              <li key={title} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                  <strong className="text-text-primary">{title}:</strong> {body}
                </span>
              </li>
            ))}
          </ul>
          <p>
            Para ejercer cualquiera de estos derechos, escríbenos a{" "}
            <a
              href={`mailto:${PRIVACY_EMAIL}`}
              className="text-primary underline underline-offset-2"
            >
              {PRIVACY_EMAIL}
            </a>
            .
          </p>
        </PolicySection>

        {/* Section 7 */}
        <PolicySection id="seguridad" title="7. Medidas de seguridad">
          <p>
            Tomamos medidas razonables para proteger tu información personal contra acceso no
            autorizado, pérdida o divulgación:
          </p>
          <ul className="space-y-2 pl-4">
            {[
              "El formulario de contacto transmite información cifrada mediante HTTPS/TLS. Los mensajes son procesados por AWS SES, que cuenta con certificaciones de seguridad de nivel empresarial.",
              "Las sesiones terapéuticas se realizan a través de plataformas con cifrado de extremo a extremo.",
              "El acceso a la información de contacto recibida está restringido exclusivamente a Grace P. Pacheco.",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p>
            Ningún método de transmisión electrónica es 100% seguro. Aunque nos esforzamos
            por proteger tu información, no podemos garantizar seguridad absoluta.
          </p>
        </PolicySection>

        {/* Section 8 */}
        <PolicySection id="terceros" title="8. Servicios de terceros">
          <p>
            Este sitio utiliza servicios de terceros que pueden recopilar o procesar
            información de acuerdo con sus propias políticas de privacidad:
          </p>

          <div className="space-y-4 pt-1">
            {[
              {
                name: "Amazon Web Services (AWS SES)",
                body: "Los mensajes enviados a través del formulario de contacto son procesados por AWS SES. AWS no almacena el contenido de los mensajes más allá del tiempo necesario para la entrega.",
                href: "https://aws.amazon.com/privacy/",
                label: "Política de privacidad de AWS",
              },
              {
                name: "WhatsApp / Meta",
                body: "El botón de WhatsApp redirige a la aplicación de Meta Platforms, Inc. Al usar esta función, la comunicación queda sujeta a las políticas de privacidad de WhatsApp/Meta.",
                href: "https://www.whatsapp.com/legal/privacy-policy",
                label: "Política de privacidad de WhatsApp",
              },
              {
                name: "Substack",
                body: "Si te suscribes a nuestra newsletter, tu correo electrónico será gestionado por Substack, Inc. Puedes darte de baja en cualquier momento mediante el enlace incluido en cada correo.",
                href: "https://substack.com/privacy",
                label: "Política de privacidad de Substack",
              },
              {
                name: "Pinterest",
                body: "Este sitio puede incrustar contenido de Pinterest. Al visualizarlo, Pinterest puede recopilar datos técnicos conforme a sus propias políticas.",
                href: "https://policy.pinterest.com/privacy-policy",
                label: "Política de privacidad de Pinterest",
              },
            ].map(({ name, body, href, label }) => (
              <div key={name}>
                <p className="font-medium text-text-primary mb-1">{name}</p>
                <p>
                  {body}{" "}
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2"
                  >
                    {label}
                  </a>
                  .
                </p>
              </div>
            ))}

            {/* Facebook — rendered separately to support inline link */}
            <div>
              <p className="font-medium text-text-primary mb-1">Facebook / Meta</p>
              <p>
                Este sitio muestra contenido público de nuestra página de Facebook mediante
                la API de lectura de Meta. No solicitamos autorización a usuarios de Facebook
                ni almacenamos datos de cuentas personales. Puedes consultar nuestras{" "}
                <Link
                  href="/facebook/data-deletion"
                  className="text-primary underline underline-offset-2"
                >
                  instrucciones de eliminación de datos
                </Link>
                . Al interactuar con contenido de Facebook, aplican las{" "}
                <a
                  href="https://www.facebook.com/privacy/policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2"
                >
                  políticas de privacidad de Meta
                </a>
                .
              </p>
            </div>
          </div>
        </PolicySection>

        {/* Section 9 */}
        <PolicySection
          id="lopdp"
          title="9. Marco legal aplicable — LOPDP Ecuador"
        >
          <p>
            Este sitio opera bajo la jurisdicción de la República del Ecuador y cumple con la{" "}
            <strong className="text-text-primary">
              Ley Orgánica de Protección de Datos Personales
            </strong>{" "}
            (LOPDP, Registro Oficial Suplemento N.° 459, 26 de mayo de 2021) y su reglamento
            de aplicación. La LOPDP reconoce la protección de datos personales como un derecho
            fundamental.
          </p>
          <ul className="space-y-2 pl-4">
            {[
              "Responsable del tratamiento: Grace P. Pacheco, Psicóloga Clínica — contacto@espaciointeriorec.com",
              "Base legal (a): ejecución de la relación terapéutica a solicitud del interesado.",
              "Base legal (b): cumplimiento de obligaciones legales y éticas de la profesional.",
              "Base legal (c): consentimiento explícito del titular cuando corresponda.",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p>
            Para clientes fuera del Ecuador que residan en la Unión Europea: el tratamiento
            también puede estar sujeto al Reglamento General de Protección de Datos (GDPR).
            Puedes ejercer los derechos contemplados en el GDPR contactándonos directamente.
          </p>
        </PolicySection>

        {/* Section 10 */}
        <PolicySection id="cambios" title="10. Cambios a esta política">
          <p>
            Podemos actualizar esta Política de Privacidad periódicamente para reflejar
            cambios en nuestras prácticas o en las leyes aplicables. La fecha de "Última
            actualización" al inicio de esta página indica cuándo fue revisada por última vez.
          </p>
          <p>
            Te recomendamos revisar esta página periódicamente. El uso continuado del sitio
            después de publicados los cambios constituye aceptación de los mismos.
          </p>
        </PolicySection>

        {/* Section 11 — contact CTA card */}
        <section id="contacto-privacidad" className="scroll-mt-24">
          <h2 className="font-display text-xl md:text-2xl mb-4 text-text-primary">
            11. Contacto para asuntos de privacidad
          </h2>
          <div className="rounded-2xl border border-border bg-surface-2 p-8 text-center">
            <p className="text-sm text-text-muted mb-4 leading-relaxed">
              Para cualquier consulta, solicitud o queja relacionada con esta Política de
              Privacidad, puedes escribirnos a:
            </p>
            <p className="font-semibold text-text-primary">Grace P. Pacheco</p>
            <p className="text-sm text-text-muted">
              Psicóloga Clínica — Espacio Interior EC
            </p>
            <a
              href={`mailto:${PRIVACY_EMAIL}`}
              className="mt-1 inline-block text-sm text-primary underline underline-offset-2"
            >
              {PRIVACY_EMAIL}
            </a>
            <p className="text-sm text-text-muted mt-1">Quito, Ecuador</p>
            <Link
              href="/contact"
              className="mt-6 inline-block rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary-hover"
            >
              Enviar consulta
            </Link>
          </div>
        </section>

      </div>
    </article>
  );
}
