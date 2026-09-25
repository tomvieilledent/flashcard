import { InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { AI_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={AI_ACCENT}>Saturation de contexte & « Lost in the Middle »</H2>

      <H3>La dégradation silencieuse</H3>
      <P>
        Après 20 minutes d'allers-retours pour corriger un bug tenace, l'agent
        se met à halluciner : il invente des variables ou oublie les directives
        d'architecture. À chaque itération, l'IA <strong>relit tout
        l'historique</strong> ; les copier-coller de logs engorgent la fenêtre
        de contexte.
      </P>
      <P>
        L'étude de Stanford sur le <em>Lost in the Middle</em> le montre :
        l'attention se concentre sur le tout début du prompt (System Prompt) et
        sa toute fin (dernière question), et devient aveugle au milieu.
      </P>

      <H3>Crash test d'attention</H3>
      <Table
        head={["Itérations", "Événement"]}
        rows={[
          ["1 à 5", "Le fichier d'instructions (exigeant TailwindCSS) est respecté"],
          ["6 à 15", "Injection de logs serveurs massifs (5 000 lignes) : l'historique enfle"],
          ["16", "« Ajoute un bouton » → l'IA écrit du CSS en ligne au lieu de Tailwind"],
        ]}
      />
      <Note accent={AI_ACCENT}>
        Le poids des logs a écrasé l'instruction système : ce n'est pas un bug
        du modèle, c'est un contexte mal géré.
      </Note>

      <H3>Les remèdes</H3>
      <Ul>
        <li>
          <strong>Troncature (context truncation)</strong> — règle d'or : bug
          résolu, nouvelle session. Moins de tokens facturés, lucidité
          restaurée.
        </li>
        <li>
          <strong>Résumé d'étape (Summarize &amp; Restart)</strong> : demander
          un résumé technique des choix validés en 5 points, l'ouvrir dans un
          chat vierge : « Voici notre état d'avancement, on continue. »
        </li>
        <li>
          <strong>Mise à jour de la mémoire</strong> : fonctionnalité terminée
          → « Mets à jour le <InlineCode>MEMORY.md</InlineCode> ».
        </li>
      </Ul>

      <SourceLink href="https://arxiv.org/abs/2307.03172">
        arXiv:2307.03172 — Lost in the Middle: How Language Models Use Long Contexts
      </SourceLink>
    </div>
  );
}

export default function ContextSaturation() {
  return <Fr />;
}
