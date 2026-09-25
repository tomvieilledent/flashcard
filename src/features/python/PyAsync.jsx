import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { TOOL_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={TOOL_ACCENT}>Python — programmation asynchrone (asyncio)</H2>

      <H3>Synchrone vs asynchrone</H3>
      <P>
        En programmation <strong>synchrone</strong>, chaque opération s'exécute
        l'une après l'autre : si l'une est lente (requête réseau), tout le
        programme attend. La programmation <strong>asynchrone</strong> laisse
        certaines opérations s'exécuter « en arrière-plan » et libère le
        programme principal. Elle est idéale pour les tâches{" "}
        <strong>liées aux E/S</strong> (réseau, fichiers, base de données).
      </P>

      <H3>Les concepts de base</H3>
      <Table
        head={["Concept", "Rôle"]}
        rows={[
          ["Boucle d'événements (event loop)", "Cœur d'asyncio : boucle qui tourne en permanence, planifie et exécute les tâches et callbacks, gère les E/S. Elle bascule très vite entre les tâches, ce qui donne l'illusion de simultanéité"],
          ["Coroutine", "Fonction spéciale qui peut se mettre en pause et rendre la main à la boucle, puis reprendre là où elle s'était arrêtée"],
          ["async def", "Définit une coroutine : l'appeler ne l'exécute pas, elle renvoie un objet coroutine"],
          ["await", "Dans une fonction async : appelle une coroutine et attend son résultat, en rendant la main à la boucle pendant l'attente"],
          ["Task", "Coroutine planifiée sur la boucle (asyncio.create_task) sans attendre sa fin"],
        ]}
      />

      <H3>Exemple simple : exécution séquentielle</H3>
      <Code>{`import asyncio

async def say_after(delay, msg):
    await asyncio.sleep(delay)      # pause asynchrone : la boucle peut faire autre chose
    print(msg)

async def main():
    print("Started")
    await say_after(1, "Hello")
    await say_after(2, "World")     # ne démarre qu'à la fin du précédent
    print("Finished")

asyncio.run(main())                 # Python 3.7+ : lance la boucle et la coroutine principale
# Durée : 3 s`}</Code>
      <P>
        Avec du code synchrone, tout le programme s'arrêterait pendant les{" "}
        <InlineCode>sleep</InlineCode>. Ici, la boucle reste libre, mais{" "}
        <InlineCode>await</InlineCode> impose ici l'ordre : la seconde
        coroutine attend la première.
      </P>

      <H3>Exécution concurrente</H3>
      <Code>{`async def main():
    task1 = asyncio.create_task(say_after(1, "Hello"))
    task2 = asyncio.create_task(say_after(2, "World"))

    print("Started")
    await task1                      # attend la fin des deux tâches
    await task2
    print("Finished")

asyncio.run(main())                  # ≈ 2 s au lieu de 3`}</Code>
      <P>
        <InlineCode>create_task()</InlineCode> planifie la coroutine sur la
        boucle sans attendre sa fin : les deux appels tournent « en même
        temps ». Pour lancer plusieurs coroutines d'un coup :
      </P>
      <Code>{`async def say_hello():
    await asyncio.sleep(1); print("Hello")

async def say_world():
    await asyncio.sleep(1); print("World")

async def main():
    await asyncio.gather(say_hello(), say_world())   # ≈ 1 s au total`}</Code>

      <H3>Cas réel : plusieurs pages web en parallèle</H3>
      <Code>{`import aiohttp
import asyncio

async def fetch_url(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.text()

async def main():
    urls = ["https://example.com", "https://example.org", "https://example.net"]
    tasks = [fetch_url(url) for url in urls]
    pages = await asyncio.gather(*tasks)
    for url, page in zip(urls, pages):
        print(f"Content from {url}: {len(page)} bytes")

asyncio.run(main())`}</Code>
      <P>
        Les bibliothèques doivent être compatibles asynchrones (ici{" "}
        <InlineCode>aiohttp</InlineCode>, pas <InlineCode>requests</InlineCode>).
      </P>

      <H3>Coroutines ou multi-threading ?</H3>
      <Table
        head={["", "Coroutines (asyncio)", "Threads"]}
        rows={[
          ["Nature", "Coopératives : elles choisissent quand rendre la main (await)", "Préemptifs : l'OS décide quand basculer, n'importe où"],
          ["Cas d'usage", "Tâches liées aux E/S : réseau, fichiers, requêtes", "E/S et calcul ; parallélisme sur plusieurs cœurs"],
          ["Avantages", "Très légères (des milliers, voire millions) ; déterministes (points de bascule explicites) ; peu de conditions de course (un seul thread)", "Vrai parallélisme sur multicœur ; intégration facile de bibliothèques existantes"],
          ["Limites", "Un calcul CPU bloque toute la boucle ; le code et les bibliothèques doivent être adaptés à async/await", "Surcoût mémoire et de changement de contexte ; conditions de course, deadlocks difficiles à déboguer ; le GIL de CPython empêche l'exécution simultanée de bytecode Python"],
        ]}
      />
      <Ul>
        <li>Les coroutines ne remplacent pas universellement les threads : elles gèrent plus simplement et plus efficacement la concurrence d'E/S.</li>
        <li>Pour du calcul (CPU-bound) : <InlineCode>multiprocessing</InlineCode> ou threads selon le cas.</li>
        <li>Souvent, on combine : framework asynchrone pour les E/S, threads ou processus d'arrière-plan pour les calculs lourds.</li>
      </Ul>
      <Note accent={TOOL_ACCENT}>
        <InlineCode>async</InlineCode> / <InlineCode>await</InlineCode> convient
        aux E/S et au code réseau structuré, pas aux tâches CPU.
      </Note>

      <SourceLink href="https://docs.python.org/3/library/asyncio.html">
        docs.python.org — asyncio
      </SourceLink>
    </div>
  );
}

export default function PyAsync() {
  return <Fr />;
}
