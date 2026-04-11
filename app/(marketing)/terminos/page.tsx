import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_URL, LEGAL_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Términos y Condiciones | ${SITE_NAME}`,
  description:
    "Lee los términos y condiciones de uso de los servicios de acompañamiento psicológico en línea de Espacio Interior EC.",
  alternates: { canonical: `${SITE_URL}/terminos` },
};

const EFFECTIVE_DATE = "10 de abril de 2025";

export default function TerminosPage() {
  return (
    <article className="py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <h1 className="font-display text-3xl md:text-4xl mb-3">
            Términos y Condiciones
          </h1>
          <p className="text-sm text-muted-foreground">
            Vigentes desde el {EFFECTIVE_DATE}
          </p>
        </div>

        {/* Intro */}
        <p className="text-muted-foreground leading-relaxed mb-10">
          Los presentes Términos y Condiciones regulan el acceso y uso de los
          servicios ofrecidos por <strong className="text-foreground font-medium">Espacio Interior EC</strong>,
          a través del sitio web{" "}
          <span className="font-medium text-foreground">espaciointeriorec.com</span>.
          Los servicios son prestados por{" "}
          <strong className="text-foreground font-medium">Grace P. Pacheco</strong>,
          Psicóloga Clínica graduada de la Universidad San Francisco de Quito (USFQ),
          en representación de Espacio Interior EC. Al agendar una sesión o utilizar
          este sitio, usted acepta estos términos en su totalidad.
        </p>

        <div className="space-y-10">

          {/* 1. Descripción del servicio */}
          <section>
            <h2 className="font-display text-xl md:text-2xl mb-3">
              1. Descripción del servicio
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Espacio Interior EC ofrece servicios de acompañamiento psicológico
              individual en modalidad online, mediante videollamada. Las sesiones
              son conducidas por Grace P. Pacheco, Psicóloga Clínica, y están
              orientadas a personas que atraviesan procesos de cambio, transiciones
              de vida y situaciones que requieren un espacio de reflexión y apoyo.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Los servicios están disponibles en español e inglés. Espacio Interior
              EC se reserva el derecho de modificar, suspender o descontinuar
              cualquier aspecto del servicio con aviso previo razonable.
            </p>
          </section>

          {/* 2. Servicios de emergencia — callout */}
          <div className="rounded-2xl border border-border bg-muted p-6">
            <h2 className="font-display text-xl md:text-2xl mb-3">
              2. Atención a emergencias y crisis
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              <strong className="text-foreground font-semibold">
                Los servicios de Espacio Interior EC no constituyen atención de
                emergencias ni soporte en crisis agudas.
              </strong>{" "}
              Si usted o alguien de su entorno se encuentra en peligro inmediato
              o experimenta una crisis de salud mental, por favor comuníquese de
              inmediato con los servicios de emergencia correspondientes.
            </p>
            <ul className="text-muted-foreground text-sm space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                <span>Ecuador — Línea de emergencias: <strong className="text-foreground">171</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                <span>Línea de Salud Mental IESS / MSP: consulte el número de su región</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                <span>Para usuarios fuera de Ecuador, contacte la línea de emergencias de su país</span>
              </li>
            </ul>
          </div>

          {/* 3. Sesiones y disponibilidad */}
          <section>
            <h2 className="font-display text-xl md:text-2xl mb-3">
              3. Sesiones y disponibilidad
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Las sesiones se realizan exclusivamente bajo cita previa acordada
              entre el cliente y Espacio Interior EC. La disponibilidad de horarios
              es variable y está sujeta a la agenda de Grace P. Pacheco.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Espacio Interior EC se reserva el derecho de reagendar una sesión por
              causas justificadas (enfermedad, fuerza mayor, circunstancias
              imprevistas). En tal caso, se notificará al cliente con la mayor
              antelación posible y se ofrecerá una nueva fecha sin costo adicional.
            </p>
          </section>

          {/* 4. Política de cancelación */}
          <section>
            <h2 className="font-display text-xl md:text-2xl mb-3">
              4. Política de cancelación y reprogramación
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {[
                {
                  title: "Cancelación con más de 24 horas",
                  body: "El cliente puede cancelar o reprogramar su sesión sin cargo, siempre que lo haga con al menos 24 horas de antelación a la hora acordada.",
                },
                {
                  title: "Cancelación con menos de 24 horas o inasistencia",
                  body: "Las cancelaciones realizadas con menos de 24 horas de anticipación o la inasistencia sin aviso previo podrán ser cobradas en su totalidad, a criterio de Espacio Interior EC.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border bg-muted p-5"
                >
                  <h3 className="font-semibold mb-2 text-sm">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Retrasos superiores a 15 minutos sin aviso previo se considerarán
              inasistencia. Espacio Interior EC se compromete a aplicar esta
              política con flexibilidad en circunstancias excepcionales debidamente
              comunicadas.
            </p>
          </section>

          {/* 5. Tarifas y pagos */}
          <section>
            <h2 className="font-display text-xl md:text-2xl mb-3">
              5. Tarifas y pagos
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Las tarifas vigentes serán comunicadas al cliente antes de confirmar
              cualquier sesión. Espacio Interior EC se reserva el derecho de
              actualizar sus tarifas con aviso previo; los cambios no afectarán
              sesiones ya pagadas.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Los métodos de pago aceptados serán informados al momento de agendar.
              El pago deberá realizarse según las condiciones acordadas. Una vez
              iniciada la sesión, no se realizarán reembolsos, salvo a discreción
              de Espacio Interior EC en casos excepcionales.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              La sesión de exploración inicial de 15 minutos, cuando se ofrezca, es
              gratuita y sin compromiso.
            </p>
          </section>

          {/* 6. Confidencialidad */}
          <section>
            <h2 className="font-display text-xl md:text-2xl mb-3">
              6. Confidencialidad
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Todo el contenido compartido durante las sesiones es estrictamente
              confidencial. Grace P. Pacheco, en su ejercicio profesional como
              Psicóloga Clínica, está sujeta al secreto profesional conforme a la
              ética y normativa aplicable en Ecuador.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-3">
              La confidencialidad tiene las siguientes excepciones legales y éticas:
            </p>
            <ul className="text-muted-foreground text-sm space-y-2 mb-3">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                Riesgo inminente para la vida del cliente o de terceros.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                Obligación legal de revelar información por mandato judicial o autoridad competente.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                Supervisión clínica profesional, realizada siempre de forma anonimizada.
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              En cualquier caso, Espacio Interior EC comunicará al cliente la
              situación en la medida en que sea posible y legalmente permitido.
            </p>
          </section>

          {/* 7. Uso aceptable */}
          <section>
            <h2 className="font-display text-xl md:text-2xl mb-3">
              7. Uso aceptable
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              El cliente se compromete a tratar a Grace P. Pacheco y al equipo de
              Espacio Interior EC con respeto en todo momento, incluyendo las
              comunicaciones escritas y las sesiones en línea.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Queda expresamente prohibido:
            </p>
            <ul className="text-muted-foreground text-sm space-y-2 mb-3">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                Grabar las sesiones —en audio o video— sin el consentimiento
                expreso y por escrito de Espacio Interior EC.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                Compartir, publicar o difundir el contenido de las sesiones sin
                autorización.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                Utilizar el servicio para fines distintos al acompañamiento
                psicológico personal.
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Espacio Interior EC se reserva el derecho de dar por terminado el
              vínculo terapéutico si se produce una conducta abusiva, irrespetuosa
              o que comprometa el bienestar de Grace P. Pacheco o del propio
              cliente. En tal caso, se ofrecerá derivación a otro profesional cuando
              sea posible.
            </p>
          </section>

          {/* 8. Menores de edad */}
          <section>
            <h2 className="font-display text-xl md:text-2xl mb-3">
              8. Menores de edad
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Los servicios de Espacio Interior EC están dirigidos a personas
              mayores de 18 años. En caso de que un menor de edad desee acceder al
              servicio, será imprescindible el consentimiento informado y por escrito
              de su padre, madre o representante legal, quien deberá comunicarse
              directamente con Espacio Interior EC antes de agendar cualquier sesión.
            </p>
          </section>

          {/* 9. Propiedad intelectual */}
          <section>
            <h2 className="font-display text-xl md:text-2xl mb-3">
              9. Propiedad intelectual
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Todos los contenidos publicados en este sitio web —incluyendo textos,
              imágenes, artículos del blog, logotipo y elementos visuales— son
              propiedad de Espacio Interior EC y están protegidos por las leyes de
              propiedad intelectual aplicables. Queda prohibida su reproducción,
              distribución o uso con fines comerciales sin autorización escrita previa
              de Espacio Interior EC.
            </p>
          </section>

          {/* 10. Limitación de responsabilidad */}
          <section>
            <h2 className="font-display text-xl md:text-2xl mb-3">
              10. Limitación de responsabilidad
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Espacio Interior EC presta sus servicios con el máximo cuidado y
              rigor profesional. Sin embargo, el acompañamiento psicológico no
              garantiza resultados específicos, ya que el proceso terapéutico
              depende de múltiples factores individuales y contextuales.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Espacio Interior EC no será responsable por interrupciones del
              servicio derivadas de fallas técnicas, problemas de conectividad a
              internet u otras circunstancias fuera de su control. En caso de
              inconveniente técnico durante una sesión, se coordinará una solución
              o reprogramación sin costo para el cliente.
            </p>
          </section>

          {/* 11. Modificaciones */}
          <section>
            <h2 className="font-display text-xl md:text-2xl mb-3">
              11. Modificaciones a estos términos
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Espacio Interior EC puede actualizar estos Términos y Condiciones en
              cualquier momento. Los cambios serán publicados en esta página con la
              fecha de vigencia actualizada. El uso continuado del servicio tras la
              publicación de cambios significativos implica la aceptación de los
              nuevos términos.
            </p>
          </section>

          {/* 12. Ley aplicable */}
          <section>
            <h2 className="font-display text-xl md:text-2xl mb-3">
              12. Ley aplicable y jurisdicción
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Estos Términos y Condiciones se rigen por las leyes de la República
              del Ecuador. Cualquier controversia derivada de o relacionada con el
              uso de los servicios de Espacio Interior EC se someterá a la
              jurisdicción de los tribunales competentes de la ciudad de Quito,
              Ecuador.
            </p>
          </section>

          {/* 13. Contacto */}
          <div className="rounded-2xl bg-muted border border-border p-8">
            <h2 className="font-display text-xl md:text-2xl mb-3">
              13. Contacto
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Si tienes preguntas sobre estos términos o sobre el funcionamiento del
              servicio, puedes escribirnos a:
            </p>
            <p className="font-medium text-foreground mb-6">
              {LEGAL_EMAIL}
            </p>
            <Link
              href="/contact"
              className="inline-block rounded-full bg-primary px-7 py-3 text-primary-foreground font-medium transition-colors duration-200 hover:bg-primary-hover active:scale-[0.98]"
            >
              Escríbenos
            </Link>
          </div>

        </div>
      </div>
    </article>
  );
}
