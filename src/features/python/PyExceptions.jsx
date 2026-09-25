import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { TOOL_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={TOOL_ACCENT}>Python — erreurs et exceptions</H2>
      <P>
        Deux familles : les <strong>erreurs de syntaxe</strong> (détectées au
        parsing, avant l'exécution) et les <strong>exceptions</strong> (levées
        pendant l'exécution, non fatales si on les gère).
      </P>
      <Code>{`while True print("Hello")     # SyntaxError: invalid syntax

10 * (1 / 0)      # ZeroDivisionError: division by zero
4 + spam * 3      # NameError: name 'spam' is not defined
"2" + 2           # TypeError: can only concatenate str (not "int") to str`}</Code>

      <H3>try / except / else / finally</H3>
      <Code>{`while True:
    try:
        x = int(input("Un nombre : "))
        break
    except ValueError:
        print("Pas un nombre valide, réessayez...")

try:
    f = open("myfile.txt")
    i = int(f.readline().strip())
except OSError as err:
    print("Erreur système :", err)
except ValueError:
    print("Conversion en entier impossible")
except Exception as err:
    print(f"Inattendu : {err=}, {type(err)=}")
    raise                              # relance l'exception courante
else:
    print("aucune erreur")             # seulement si le try n'a rien levé
finally:
    print("toujours exécuté")          # nettoyage`}</Code>
      <Ul>
        <li>Le <InlineCode>try</InlineCode> s'exécute d'abord ; à la première exception, on cherche un <InlineCode>except</InlineCode> compatible.</li>
        <li>Intercepter des exceptions <strong>précises</strong>, jamais un <InlineCode>except:</InlineCode> nu.</li>
        <li><InlineCode>else</InlineCode> évite d'intercepter par erreur une exception levée par le code qui suit le <InlineCode>try</InlineCode>.</li>
        <li><InlineCode>finally</InlineCode> s'exécute toujours : exception ou non, y compris avant <InlineCode>break</InlineCode>, <InlineCode>continue</InlineCode> ou <InlineCode>return</InlineCode>. Une exception non gérée est relancée après lui.</li>
      </Ul>
      <Code>{`try:
    raise Exception("spam", "eggs")
except Exception as inst:
    print(type(inst))       # <class 'Exception'>
    print(inst.args)        # ('spam', 'eggs')
    x, y = inst.args`}</Code>

      <H3>Lever une exception : raise</H3>
      <Code>{`raise NameError("HiThere")
raise ValueError               # équivaut à raise ValueError()

def retirer(solde, montant):
    if montant > solde:
        raise ValueError("solde insuffisant")
    return solde - montant`}</Code>

      <H3>Chaînage d'exceptions</H3>
      <Table
        head={["Forme", "Effet"]}
        rows={[
          ["raise B dans un except A", "Chaînage implicite : les deux apparaissent dans la trace"],
          ["raise B from A", "Chaînage explicite : A est la cause directe de B"],
          ["raise B from None", "Masque l'exception d'origine"],
        ]}
      />
      <Code>{`try:
    func()
except ConnectionError as exc:
    raise RuntimeError("Échec d'ouverture de la base") from exc

try:
    open("database.sqlite")
except OSError:
    raise RuntimeError from None`}</Code>

      <H3>Exceptions personnalisées</H3>
      <Code>{`class ErreurMetier(Exception):
    """Base des erreurs de l'application."""

class StockInsuffisant(ErreurMetier):
    pass`}</Code>
      <P>
        Convention : le nom se termine par <InlineCode>Error</InlineCode> quand
        c'est une erreur ; on hérite de <InlineCode>Exception</InlineCode> (ou
        d'une exception plus précise).
      </P>

      <H3>Actions de nettoyage : with</H3>
      <Code>{`# Fichier laissé ouvert jusqu'à sa collecte
for line in open("myfile.txt"):
    print(line, end="")

# Fermeture garantie, même en cas d'erreur
with open("myfile.txt") as f:
    for line in f:
        print(line, end="")`}</Code>

      <H3>Groupes d'exceptions et notes (3.11+)</H3>
      <Code>{`# Lever plusieurs exceptions à la fois
excs = [OSError("erreur 1"), SystemError("erreur 2")]
raise ExceptionGroup("il y a des problèmes", excs)

# Les traiter par type avec except*
try:
    f()
except* OSError as e:
    print("Il y avait des OSError")
except* SystemError as e:
    print("Il y avait des SystemError")   # le non traité est relancé

# Enrichir une exception
try:
    raise TypeError("mauvais type")
except Exception as e:
    e.add_note("Contexte utile")
    raise`}</Code>
      <Note accent={TOOL_ACCENT}>
        Style Python : « plus facile de demander pardon que la permission »
        (EAFP) — essayer, puis gérer l'exception, plutôt que tester chaque
        précondition.
      </Note>

      <SourceLink href="https://docs.python.org/3/tutorial/errors.html">
        docs.python.org — Errors and exceptions
      </SourceLink>
    </div>
  );
}

export default function PyExceptions() {
  return <Fr />;
}
