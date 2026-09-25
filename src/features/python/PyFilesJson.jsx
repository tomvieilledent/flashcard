import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { TOOL_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={TOOL_ACCENT}>Python — fichiers, JSON & module sys</H2>

      <H3>Lire et écrire des fichiers</H3>
      <Code>{`f = open(nom_fichier, mode, encoding="utf-8")`}</Code>
      <Table
        head={["Mode", "Effet"]}
        rows={[
          ["'r'", "Lecture seule (défaut)"],
          ["'w'", "Écriture ; écrase le fichier existant"],
          ["'a'", "Ajout en fin de fichier"],
          ["'r+'", "Lecture et écriture"],
          ["+ 'b'", "Mode binaire : 'rb', 'wb'"],
        ]}
      />
      <Code>{`# with ferme le fichier automatiquement, même en cas d'erreur
with open("workfile", encoding="utf-8") as f:
    data = f.read()
f.closed                      # True

f.read()                      # tout le fichier ('' à la fin)
f.readline()                  # une ligne (garde le retour à la ligne)
for line in f:                # itération : efficace en mémoire
    print(line, end="")
list(f)                       # ou f.readlines() : toutes les lignes

f.write("Ceci est un test\\n")   # renvoie le nombre de caractères écrits
f.write(str(("la réponse", 42)))   # convertir les autres types en str d'abord`}</Code>
      <Ul>
        <li>Toujours préciser <InlineCode>encoding="utf-8"</InlineCode> en mode texte.</li>
        <li><InlineCode>f.tell()</InlineCode> donne la position ; <InlineCode>f.seek(offset, whence)</InlineCode> la change (0 : début, 1 : courante, 2 : fin).</li>
        <li>En mode texte, on ne peut se placer que depuis le début, ou à la fin avec <InlineCode>seek(0, 2)</InlineCode>.</li>
      </Ul>
      <Code>{`f = open("workfile", "rb+")
f.write(b"0123456789abcdef")
f.seek(5); f.read(1)          # b'5'
f.seek(-3, 2); f.read(1)      # b'd'  (3e octet avant la fin)`}</Code>
      <P>
        Le <InlineCode>with</InlineCode> est le mécanisme de « nettoyage
        prédéfini » du tutoriel : voir aussi la section « Erreurs et
        exceptions ».
      </P>

      <H3>JSON : échanger des données structurées</H3>
      <Table
        head={["Fonction", "Rôle"]}
        rows={[
          ["json.dumps(obj)", "Objet Python → chaîne JSON"],
          ["json.dump(obj, f)", "Objet Python → fichier"],
          ["json.loads(s)", "Chaîne JSON → objet Python"],
          ["json.load(f)", "Fichier → objet Python"],
        ]}
      />
      <Code>{`import json

x = [1, "simple", "list"]
json.dumps(x)                                # '[1, "simple", "list"]'
json.dumps({"6": 7, "4": 5}, sort_keys=True, indent=4)   # lisible, clés triées
json.dumps([1, 2, 3], separators=(",", ":"))              # compact : '[1,2,3]'

with open("file.json", "w", encoding="utf-8") as f:
    json.dump(x, f)
with open("file.json", encoding="utf-8") as f:
    x = json.load(f)`}</Code>
      <Table
        head={["Python", "JSON"]}
        rows={[
          ["dict", "object"],
          ["list, tuple", "array"],
          ["str", "string"],
          ["int, float", "number"],
          ["True / False", "true / false"],
          ["None", "null"],
        ]}
      />
      <P>
        Au retour, un tuple redevient une liste : le JSON n'a pas de tuple.
      </P>
      <Code>{`# Types personnalisés : default= (écriture) et object_hook= (lecture)
def custom_json(obj):
    if isinstance(obj, complex):
        return {"__complex__": True, "real": obj.real, "imag": obj.imag}
    raise TypeError(f"Cannot serialize object of {type(obj)}")

json.dumps(1 + 2j, default=custom_json)

def as_complex(dct):
    if "__complex__" in dct:
        return complex(dct["real"], dct["imag"])
    return dct

json.loads('{"__complex__": true, "real": 1, "imag": 2}', object_hook=as_complex)

try:
    json.loads("invalid json")
except json.JSONDecodeError as e:
    print(e.msg, e.pos, e.lineno, e.colno)`}</Code>
      <Note accent={TOOL_ACCENT}>
        JSON venant d'une source non fiable : limiter la taille des données à
        analyser (un JSON malveillant peut consommer beaucoup de CPU et de
        mémoire). En ligne de commande : <InlineCode>python -m json fichier.json</InlineCode>{" "}
        valide et embellit.
      </Note>

      <H3>Le module sys</H3>
      <Table
        head={["Élément", "Rôle"]}
        rows={[
          ["sys.argv", "Arguments de la ligne de commande (argv[0] : le script)"],
          ["sys.exit(n)", "Quitte le programme (0 : succès ; une chaîne : message d'erreur, code 1)"],
          ["sys.path", "Chemins de recherche des modules (initialisé depuis PYTHONPATH)"],
          ["sys.modules", "Modules déjà chargés"],
          ["sys.platform", "'linux', 'darwin' (macOS), 'win32'"],
          ["sys.version / sys.version_info", "Version de Python : if sys.version_info >= (3, 10):"],
          ["sys.byteorder", "'little' ou 'big' (ordre des octets)"],
          ["sys.stdin / stdout / stderr", "Flux standards : sys.stderr.write('erreur')"],
          ["sys.executable", "Chemin de l'interpréteur"],
          ["sys.getrefcount(obj)", "Nombre de références (+1 pour l'appel)"],
          ["sys.getsizeof(obj)", "Taille en mémoire, en octets"],
          ["sys.getrecursionlimit()", "Profondeur de récursion maximale (1000 par défaut)"],
          ["sys.maxsize", "Plus grand Py_ssize_t (2**63 - 1 sur 64 bits)"],
        ]}
      />

      <SourceLink href="https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files">
        docs.python.org — Reading and writing files
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.python.org/3/tutorial/errors.html#predefined-clean-up-actions">
        docs.python.org — Predefined clean-up actions
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.python.org/3/library/json.html">
        docs.python.org — json
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.python.org/3/library/sys.html">
        docs.python.org — sys
      </SourceLink>
      {" · "}
      <SourceLink href="https://automatetheboringstuff.com/">
        Automate the Boring Stuff with Python
      </SourceLink>
      {" · "}
      <SourceLink href="https://web.archive.org/web/20260312163534/https://histo.ucsf.edu/BMS270/diveintopython3-r802.pdf">
        Dive Into Python 3 (PDF archivé)
      </SourceLink>
    </div>
  );
}

export default function PyFilesJson() {
  return <Fr />;
}
