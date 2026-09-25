import { P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { AI_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={AI_ACCENT}>L'observabilité LLM vs le monitoring traditionnel</H2>

      <H3>1. Les limites de Datadog et New Relic</H3>
      <P>
        Les outils d'APM (Datadog, Prometheus, Grafana) sont excellents pour
        vérifier l'uptime d'un serveur Node.js, mesurer le CPU ou compter les
        erreurs HTTP 500. Face à une application qui intègre de l'IA, ils sont
        <strong> aveugles</strong> : si l'agent hallucine et insulte un client,
        le serveur renvoie un parfait <strong>HTTP 200 OK</strong>. Le serveur
        va bien, le produit est un désastre.
      </P>

      <H3>2. L'observabilité spécifique aux LLM</H3>
      <P>
        L'Agentic Ops passe du monitoring de l'infrastructure à l'
        <strong>observabilité cognitive</strong> (Langfuse, LangSmith) : ces
        outils regardent le « cerveau », pas le CPU.
      </P>
      <Table
        head={["Capacité", "Ce qu'elle apporte"]}
        rows={[
          ["Tracing", "Capture la conversation entière : prompt exact, System Message, réponse brute"],
          ["Arbre de raisonnement", "Pour un agent ReAct (Thought > Action > Observation), chaque étape apparaît en « spans » imbriqués : on voit à quel moment l'IA a mal décidé"],
          ["Time to First Token (TTFT)", "Temps mis par le LLM pour produire son premier mot : essentiel pour l'UX"],
        ]}
      />
      <Ul>
        <li>APM classique : la machine est-elle vivante ?</li>
        <li>Observabilité LLM : la réponse est-elle correcte, sûre, et à quel coût ?</li>
      </Ul>
      <Note accent={AI_ACCENT}>
        Les deux sont complémentaires : l'APM surveille l'infrastructure,
        l'observabilité LLM surveille le comportement.
      </Note>

      <SourceLink href="https://langfuse.com/docs/observability/overview">
        langfuse.com — LLM observability overview
      </SourceLink>
    </div>
  );
}

export default function LlmObservability() {
  return <Fr />;
}
