import { Code, InlineCode, P, H2, H3, Ul, Note } from "../../shared/ui/primitives.jsx";
import { AI_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={AI_ACCENT}>Tutoriel — Langfuse pas-à-pas (bac à sable)</H2>
      <P>
        Objectif : configurer Langfuse et tracer un appel IA, de zéro, dans un
        environnement indépendant du projet final.
      </P>

      <H3>Étape 1 — Compte et clés</H3>
      <Ul>
        <li>Langfuse.com → « Sign Up » (l'offre Hobby/Free suffit).</li>
        <li>« New Project », nommé « Tuto-Sandbox ».</li>
        <li>Menu latéral → tout en bas « Settings » → « Create new API Keys ».</li>
        <li>Garder la fenêtre ouverte : Public Key, Secret Key et Host seront copiés.</li>
      </Ul>

      <H3>Étape 2 — Dossier de test</H3>
      <Code>{`mkdir tuto-langfuse && cd tuto-langfuse
npm init -y
npm install langfuse openai dotenv`}</Code>
      <P>
        Ajouter <InlineCode>"type": "module"</InlineCode> dans{" "}
        <InlineCode>package.json</InlineCode>.
      </P>

      <H3>Étape 3 — Fichier .env</H3>
      <Code>{`LANGFUSE_PUBLIC_KEY="pk-lf-..."
LANGFUSE_SECRET_KEY="sk-lf-..."
LANGFUSE_HOST="https://cloud.langfuse.com"
OPENAI_API_KEY="sk-proj-..."`}</Code>
      <Note accent={AI_ACCENT}>
        Le <InlineCode>.env</InlineCode> contient des secrets : ne jamais le
        commiter (<InlineCode>.gitignore</InlineCode>).
      </Note>

      <H3>Étape 4 — Le code de traçage (tuto-langfuse.js)</H3>
      <P>
        Au lieu du client OpenAI normal, on le « wrappe » avec{" "}
        <InlineCode>observeOpenAI</InlineCode> : le wrapper intercepte la
        requête de manière invisible.
      </P>
      <Code>{`import { observeOpenAI } from "langfuse";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// 1. Initialisation avec le wrapper Langfuse
const openai = observeOpenAI(new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
}));

async function lancerTest() {
    console.log("⏳ Envoi de la requête à OpenAI (et interception par Langfuse)...");

    // 2. Appel API standard
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: "Traduis 'Bonjour le monde' en espagnol." }],
        // 3. Optionnel : tags pour retrouver la trace
        langfuseConfig: {
            tags: ["tutoriel-sandbox"],
            metadata: { environnement: "local" }
        }
    });

    console.log("✅ Réponse de l'IA :", completion.choices[0].message.content);
}

lancerTest();`}</Code>

      <H3>Étape 5 — Exécution et résultats</H3>
      <Ul>
        <li>
          <InlineCode>node tuto-langfuse.js</InlineCode> affiche{" "}
          <InlineCode>✅ Réponse de l'IA : Hola mundo.</InlineCode>
        </li>
        <li>
          Dans Langfuse, onglet « Traces » : une nouvelle ligne avec
          l'arborescence exacte, le prompt envoyé, la latence au millième de
          seconde et le coût estimé (ex. 0,00001 $).
        </li>
      </Ul>
    </div>
  );
}

export default function LangfuseTutorial() {
  return <Fr />;
}
