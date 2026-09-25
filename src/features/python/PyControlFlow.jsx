import { Code, InlineCode, P, H2, H3, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { TOOL_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={TOOL_ACCENT}>Python — contrôle de flux, fonctions, modules & arguments</H2>
      <P>
        Python délimite les blocs par l'<strong>indentation</strong> (4
        espaces), pas par des accolades : le <InlineCode>:</InlineCode> ouvre
        le bloc, le retrait le définit.
      </P>

      <H3>Conditions : if / elif / else</H3>
      <Code>{`if x < 0:
    x = 0
    print("Négatif ramené à zéro")
elif x == 0:
    print("Zéro")
elif x == 1:
    print("Un")
else:
    print("Plus")`}</Code>

      <H3>match / case (3.10+)</H3>
      <P>
        Filtrage par motif : valeurs littérales, alternatives{" "}
        <InlineCode>|</InlineCode>, dépaquetage, classes, garde{" "}
        <InlineCode>if</InlineCode>. Le joker <InlineCode>_</InlineCode>{" "}
        capture le reste.
      </P>
      <Code>{`def http_error(status):
    match status:
        case 400:
            return "Bad request"
        case 401 | 403 | 404:
            return "Not allowed"
        case _:
            return "Autre erreur"

match point:                      # point est un tuple (x, y)
    case (0, 0):
        print("Origine")
    case (0, y):
        print(f"Y={y}")
    case (x, y) if x == y:        # garde
        print(f"Diagonale : {x}")
    case (x, y):
        print(f"X={x}, Y={y}")`}</Code>

      <H3>Boucles for, range, break, continue, else</H3>
      <Code>{`for w in ["chat", "fenêtre"]:
    print(w, len(w))

list(range(5))              # [0, 1, 2, 3, 4]
list(range(5, 10))          # [5, 6, 7, 8, 9]
list(range(0, 10, 3))       # [0, 3, 6, 9]  (pas de 3)
list(range(-10, -100, -30)) # [-10, -40, -70]

for n in range(2, 10):
    for x in range(2, n):
        if n % x == 0:
            print(n, "=", x, "*", n // x)
            break            # sort de la boucle interne
    else:
        print(n, "est premier")   # boucle finie SANS break

for num in range(2, 10):
    if num % 2 == 0:
        continue             # passe à l'itération suivante
    print("impair :", num)`}</Code>
      <Note accent={TOOL_ACCENT}>
        Le <InlineCode>else</InlineCode> d'une boucle s'exécute uniquement si
        elle se termine <strong>sans</strong> <InlineCode>break</InlineCode>.
        Pour modifier une collection en la parcourant, boucler sur une{" "}
        <strong>copie</strong> (<InlineCode>d.copy()</InlineCode>) ou construire
        une nouvelle collection.
      </Note>
      <P>
        <InlineCode>pass</InlineCode> ne fait rien : espace réservé quand une
        instruction est syntaxiquement requise (<InlineCode>class Vide: pass</InlineCode>,
        fonction à écrire plus tard).
      </P>

      <H3>Définir une fonction</H3>
      <Code>{`def fib(n):
    """Affiche la suite de Fibonacci jusqu'à n."""
    a, b = 0, 1
    while a < n:
        print(a, end=" ")
        a, b = b, a + b
    print()

fib(2000)`}</Code>
      <P>
        Sans <InlineCode>return</InlineCode>, la fonction renvoie{" "}
        <InlineCode>None</InlineCode>. La première ligne de la docstring est un
        résumé court, commençant par une majuscule et finissant par un point.
      </P>

      <H3>Arguments : valeurs par défaut, mots-clés</H3>
      <Code>{`def ask_ok(prompt, retries=4, reminder="Réessayez !"):
    ...

ask_ok("Quitter ?")                       # 1 positionnel
ask_ok("Écraser ?", 2)                    # 2 positionnels
ask_ok("Écraser ?", reminder="Oui/non")   # positionnel + mot-clé`}</Code>
      <Note accent={TOOL_ACCENT}>
        Piège : la valeur par défaut est évaluée <strong>une seule fois</strong>.
        Une valeur mutable est donc partagée entre les appels.
      </Note>
      <Code>{`# MAUVAIS : la liste est partagée
def f(a, L=[]):
    L.append(a)
    return L

f(1)   # [1]
f(2)   # [1, 2]   <- surprise
f(3)   # [1, 2, 3]

# BON : None comme sentinelle
def f(a, L=None):
    if L is None:
        L = []
    L.append(a)
    return L`}</Code>

      <H3>Paramètres spéciaux : / et *</H3>
      <Code>{`def f(pos1, pos2, /, pos_ou_mot, *, mot1, mot2):
    #  -------------   ----------   -------------
    #  positionnels    au choix     mots-clés
    #  seulement                    seulement

def pos_only(arg, /): ...
def kwd_only(*, arg): ...

pos_only(1)          # OK
pos_only(arg=1)      # TypeError
kwd_only(arg=3)      # OK
kwd_only(3)          # TypeError`}</Code>

      <H3>*args, **kwargs et dépaquetage</H3>
      <Code>{`def concat(*args, sep="/"):          # args : tuple
    return sep.join(args)

concat("terre", "mars")              # 'terre/mars'
concat("terre", "mars", sep=".")     # 'terre.mars'

def boutique(kind, *arguments, **keywords):   # keywords : dict
    ...

args = [3, 6]
list(range(*args))                   # range(3, 6) -> [3, 4, 5]

d = {"voltage": "quatre millions", "action": "VOOM"}
parrot(**d)                          # dépaquète un dict en mots-clés`}</Code>

      <H3>lambda et annotations</H3>
      <Code>{`def make_incrementor(n):
    return lambda x: x + n           # fonction anonyme (une expression)

f = make_incrementor(42)
f(1)                                  # 43

pairs = [(1, "one"), (2, "two"), (3, "three"), (4, "four")]
pairs.sort(key=lambda p: p[1])        # tri par le 2e élément

def f(ham: str, eggs: str = "eggs") -> str:   # indications, sans effet à l'exécution
    return ham + " and " + eggs

f.__annotations__`}</Code>

      <H3>Modules et import</H3>
      <P>
        Un module est un fichier <InlineCode>.py</InlineCode> ; son nom est le
        nom du fichier sans extension. Il n'est importé <strong>qu'une fois</strong>{" "}
        par session (<InlineCode>importlib.reload</InlineCode> pour le
        recharger).
      </P>
      <Code>{`import fibo                          # fibo.fib(1000)
from fibo import fib, fib2           # fib(500)
from fibo import *                   # tout sauf les noms en _  (à éviter)
import fibo as fib                   # alias
from fibo import fib as fibonacci

# fibo.py — exécutable ET importable
if __name__ == "__main__":           # __name__ vaut "__main__" si lancé directement
    import sys
    fib(int(sys.argv[1]))            # python fibo.py 50`}</Code>
      <Table
        head={["Notion", "Détail"]}
        rows={[
          ["sys.path", "Ordre de recherche : dossier du script, PYTHONPATH, défauts d'installation (site-packages)"],
          ["__pycache__", "Bytecode compilé (module.cpython-XY.pyc) ; ne change que le temps de chargement, pas la vitesse d'exécution"],
          ["dir(module)", "Liste les noms définis dans un module"],
          ["Paquet", "Dossier avec __init__.py ; import sound.effects.echo, imports relatifs : from . import echo, from .. import formats"],
          ["__all__", "Liste des noms exportés par from paquet import *"],
        ]}
      />

      <H3>Arguments de la ligne de commande</H3>
      <P>
        <InlineCode>sys.argv</InlineCode> est la liste des arguments :{" "}
        <InlineCode>argv[0]</InlineCode> est le nom du script (comme argv en C).
        Pour des options, de l'aide et de la validation :{" "}
        <InlineCode>argparse</InlineCode>.
      </P>
      <Code>{`# demo.py
import sys
print(sys.argv)              # python demo.py one two three
                             # ['demo.py', 'one', 'two', 'three']

import argparse
parser = argparse.ArgumentParser(
    prog="top",
    description="Affiche les premières lignes de chaque fichier")
parser.add_argument("filenames", nargs="+")
parser.add_argument("-l", "--lines", type=int, default=10)
args = parser.parse_args()   # python top.py --lines=5 a.txt b.txt
                             # args.lines == 5, args.filenames == ['a.txt', 'b.txt']`}</Code>

      <H3>Quelques modules de la bibliothèque standard</H3>
      <Table
        head={["Module", "Usage"]}
        rows={[
          ["os", "Système : os.getcwd(), os.chdir()"],
          ["glob", "Jokers de fichiers : glob.glob('*.py')"],
          ["sys", "argv, stdin, stdout, stderr"],
          ["re", "Expressions régulières : re.findall(r'\\bf[a-z]*', texte)"],
          ["math / random / statistics", "Maths, tirages, moyenne / médiane / variance"],
          ["datetime", "Dates et heures : datetime.date.today()"],
          ["doctest / unittest", "Tests intégrés aux docstrings / classes de tests"],
        ]}
      />

      <SourceLink href="https://docs.python.org/3/tutorial/controlflow.html">
        docs.python.org — Control flow
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.python.org/3/tutorial/modules.html">
        docs.python.org — Modules
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.python.org/3/tutorial/stdlib.html#command-line-arguments">
        docs.python.org — Command line arguments
      </SourceLink>
      {" · "}
      <SourceLink href="https://thepythonguru.com/">thepythonguru.com</SourceLink>
      {" · "}
      <SourceLink href="https://docs.python.org/3.8/index.html">
        docs.python.org — documentation 3.8
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.python.org/3.4/tutorial/index.html">
        docs.python.org — Python 3.4 tutorial
      </SourceLink>
    </div>
  );
}

export default function PyControlFlow() {
  return <Fr />;
}
