import { Code, InlineCode, P, H2, H3, Ul, Note } from "../../shared/ui/primitives.jsx";
import { AI_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={AI_ACCENT}>Tutoriel — le Pre-Hook HITL pas-à-pas (bac à sable)</H2>
      <P>
        Objectif : mettre un script Node.js asynchrone « en pause » pour
        demander une validation au clavier (Human-in-the-Loop) avant d'exécuter
        la suite.
      </P>

      <H3>Étape 1 — Le module readline/promises</H3>
      <P>
        Node.js ne s'arrête jamais (I/O non bloquantes). Pour forcer l'attente
        d'une saisie humaine, on utilise le module natif{" "}
        <InlineCode>readline/promises</InlineCode>.
      </P>

      <H3>Étape 2 — Le code (tuto-hook.js)</H3>
      <P>Pas d'IA ici : on simule seulement le mécanisme d'interception.</P>
      <Code>{`import * as readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

// === 1. LA FONCTION D'INTERCEPTION (le Pre-Hook) ===
async function demanderValidationHumaine(action) {
    console.log(\`\\n🛑 [SÉCURITÉ] L'application veut exécuter l'action suivante :\`);
    console.log(\`👉 "\${action}"\`);

    // Ouverture du canal de communication avec le terminal
    const rl = readline.createInterface({ input, output });

    // 'await' met le script en pause jusqu'à la saisie de l'utilisateur
    const reponse = await rl.question('🛡️ Approuvez-vous cette action ? (Oui=o / Non=n) : ');

    rl.close();

    // true si l'utilisateur a tapé 'o', sinon false
    return reponse.trim().toLowerCase() === 'o';
}

// === 2. LE SCRIPT PRINCIPAL (simulation) ===
async function executerWorkflow() {
    console.log("1. Le système démarre...");

    // Action dangereuse qu'une IA aurait pu proposer
    const intention = "Supprimer toutes les factures de la base de données.";

    // 3. APPEL DU PRE-HOOK : le code s'arrête ici !
    const estAutorise = await demanderValidationHumaine(intention);

    // 4. RÉSOLUTION DU HOOK
    if (estAutorise) {
        console.log("\\n✅ ACCÈS ACCORDÉ : Suppression en cours (Simulation)...");
    } else {
        console.log("\\n⛔ ACCÈS REFUSÉ : Action annulée par l'administrateur.");
        // Arrêt propre du script pour éviter tout dérapage
        process.exit(1);
    }
}

executerWorkflow();`}</Code>

      <H3>Étape 3 — Exécution et résultats</H3>
      <Ul>
        <li>
          <InlineCode>node tuto-hook.js</InlineCode> : le curseur clignote après{" "}
          <InlineCode>Approuvez-vous cette action ? (Oui=o / Non=n) :</InlineCode>{" "}
          — le script est en pause.
        </li>
        <li>
          Test du refus : taper <InlineCode>n</InlineCode> + Entrée → «{" "}
          <InlineCode>⛔ ACCÈS REFUSÉ</InlineCode> » et arrêt immédiat.
        </li>
      </Ul>
      <Note accent={AI_ACCENT}>
        Dans l'architecture Agentic Ops, ce hook se place exactement entre le
        moment où l'IA propose son action et celui où votre code l'exécute avec
        de vraies fonctions.
      </Note>
    </div>
  );
}

export default function PreHookTutorial() {
  return <Fr />;
}
