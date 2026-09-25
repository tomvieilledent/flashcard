import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { TOOL_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={TOOL_ACCENT}>Python — listes, tuples, dictionnaires, ensembles</H2>
      <Table
        head={["Type", "Syntaxe", "Mutable", "Particularité"]}
        rows={[
          ["list", "[1, 2, 3]", "oui", "ordonnée, doublons permis"],
          ["tuple", "(1, 2, 3)", "non", "ordonné, clé de dict possible"],
          ["dict", '{"a": 1}', "oui", "clé → valeur, ordre d'insertion conservé"],
          ["set", "{1, 2, 3}", "oui", "sans doublon, non ordonné"],
        ]}
      />

      <H3>Méthodes des listes</H3>
      <Table
        head={["Méthode", "Effet"]}
        rows={[
          ["append(x)", "Ajoute à la fin"],
          ["extend(iterable)", "Ajoute tous les éléments d'un itérable"],
          ["insert(i, x)", "Insère à l'index i (insert(0, x) : en tête)"],
          ["remove(x)", "Retire la première occurrence (ValueError si absent)"],
          ["pop(i=-1)", "Retire et renvoie l'élément (le dernier par défaut)"],
          ["clear()", "Vide la liste (comme del a[:])"],
          ["index(x, start, stop)", "Index de la première occurrence (ValueError si absent)"],
          ["count(x)", "Nombre d'occurrences"],
          ["sort(key=None, reverse=False)", "Tri sur place"],
          ["reverse()", "Inverse sur place"],
          ["copy()", "Copie superficielle (comme a[:])"],
        ]}
      />
      <Code>{`fruits = ["orange", "apple", "pear", "banana", "kiwi", "apple", "banana"]
fruits.count("apple")        # 2
fruits.index("banana")       # 3
fruits.index("banana", 4)    # 6  (cherche à partir de l'index 4)
sorted(fruits)               # renvoie une copie triée ; sort() modifie sur place

l = [3, 1, 2]
l[1:3]                       # tranche (slice)
l[::-1]                      # liste inversée
len(l), 2 in l               # taille, appartenance`}</Code>

      <H3>Liste comme pile ou comme file</H3>
      <Code>{`# Pile (LIFO) : append + pop
stack = [3, 4, 5]
stack.append(6)
stack.pop()                  # 6

# File (FIFO) : deque, car list.pop(0) déplace tous les éléments
from collections import deque
queue = deque(["Eric", "John", "Michael"])
queue.append("Terry")
queue.popleft()              # 'Eric'`}</Code>
      <Note accent={TOOL_ACCENT}>
        Une liste est rapide aux ajouts/retraits en fin, lente en tête
        (décalage de tous les éléments).
      </Note>

      <H3>del</H3>
      <Code>{`a = [-1, 1, 66.25, 333, 333, 1234.5]
del a[0]         # par index (remove() : par valeur)
del a[2:4]       # une tranche
del a[:]         # vide la liste
del a            # supprime la variable : NameError ensuite`}</Code>

      <H3>Tuples</H3>
      <Code>{`t = 12345, 54321, "hello!"   # empaquetage
x, y, z = t                  # dépaquetage
t[0] = 1                     # TypeError : immuable

vide = ()
singleton = "hello",         # la virgule finale fait le tuple
v = ([1, 2, 3], [3, 2, 1])   # peut contenir des objets mutables`}</Code>
      <P>
        Convention : un tuple regroupe des éléments hétérogènes (accès par
        dépaquetage), une liste des éléments homogènes (accès par itération).
      </P>

      <H3>Ensembles</H3>
      <Code>{`basket = {"apple", "orange", "apple", "pear"}   # doublons supprimés
"orange" in basket           # True (test rapide)

a = set("abracadabra")       # {'a', 'r', 'b', 'c', 'd'}
b = set("alacazam")
a - b                        # différence
a | b                        # union
a & b                        # intersection
a ^ b                        # différence symétrique

vide = set()                 # {} crée un dict vide, pas un set !`}</Code>

      <H3>Dictionnaires</H3>
      <P>
        Les clés doivent être <strong>immuables</strong> (chaînes, nombres,
        tuples d'immuables).
      </P>
      <Code>{`tel = {"jack": 4098, "sape": 4139}
tel["guido"] = 4127
tel["jack"]                  # 4098
tel["irv"]                   # KeyError
tel.get("irv")               # None ; tel.get("irv", 0) : valeur par défaut
del tel["sape"]
list(tel)                    # clés, dans l'ordre d'insertion
sorted(tel)                  # clés triées
"guido" in tel               # True

dict([("sape", 4139), ("jack", 4098)])
dict(sape=4139, jack=4098)   # clés chaînes simples
{x: x**2 for x in (2, 4, 6)} # {2: 4, 4: 16, 6: 36}`}</Code>

      <H3>Techniques de boucle</H3>
      <Code>{`for k, v in tel.items():                 # dictionnaire
    print(k, v)
for i, v in enumerate(["tic", "tac", "toe"]):   # position + valeur
    print(i, v)
for q, a in zip(questions, reponses):    # plusieurs séquences en parallèle
    print(q, a)
for i in reversed(range(1, 10, 2)):      # 9, 7, 5, 3, 1
    ...
for f in sorted(set(basket)):            # uniques, triés
    ...`}</Code>
      <Note accent={TOOL_ACCENT}>
        Pour filtrer pendant une boucle, créez une nouvelle liste plutôt que
        de modifier celle qu'on parcourt.
      </Note>

      <H3>Compréhensions</H3>
      <Code>{`carres = [x**2 for x in range(10)]               # [0, 1, 4, ..., 81]
positifs = [x for x in [-4, -2, 0, 2, 4] if x >= 0]
propres = [w.strip() for w in ["  banane", "kiwi  "]]
couples = [(x, y) for x in [1, 2, 3] for y in [3, 1, 4] if x != y]
plat = [n for ligne in [[1, 2], [3, 4]] for n in ligne]   # aplatir

matrice = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]
[[ligne[i] for ligne in matrice] for i in range(4)]       # transposée
list(zip(*matrice))                                       # idem, plus simple

{x for x in "abracadabra" if x not in "abc"}     # set : {'r', 'd'}
{x: x**2 for x in (2, 4, 6)}                     # dict`}</Code>

      <H3>Conditions</H3>
      <Ul>
        <li><InlineCode>in</InlineCode> / <InlineCode>not in</InlineCode> : appartenance ; <InlineCode>is</InlineCode> / <InlineCode>is not</InlineCode> : même objet.</li>
        <li>Comparaisons chaînées : <InlineCode>a &lt; b == c</InlineCode> signifie <InlineCode>a &lt; b and b == c</InlineCode>.</li>
        <li>Priorité : <InlineCode>not</InlineCode> &gt; <InlineCode>and</InlineCode> &gt; <InlineCode>or</InlineCode> ; évaluation en court-circuit.</li>
        <li><InlineCode>a or b or c</InlineCode> renvoie le premier élément « vrai » : <InlineCode>"" or "Trondheim"</InlineCode> vaut <InlineCode>"Trondheim"</InlineCode>.</li>
        <li>Opérateur morse (3.8+) : <InlineCode>if (n := len(a)) &gt; 10:</InlineCode>.</li>
        <li>Séquences comparées dans l'ordre lexicographique : <InlineCode>(1, 2, 3) &lt; (1, 2, 4)</InlineCode> est vrai.</li>
      </Ul>

      <H3>lambda, map, filter, reduce</H3>
      <Code>{`from functools import reduce

somme = lambda x, y: x + y                       # fonction anonyme
list(map(lambda x: x * 9 / 5 + 32, [39.2, 36.5]))          # appliquer à chaque élément
list(map(lambda x, y, z: x + y + z, [1, 2], [17, 12], [-1, -4]))  # plusieurs itérables
list(filter(lambda x: x % 2, [0, 1, 1, 2, 3, 5, 8]))       # garde les impairs
reduce(lambda x, y: x + y, [47, 11, 42, 13])               # 113`}</Code>
      <P>
        <InlineCode>map</InlineCode> et <InlineCode>filter</InlineCode> renvoient
        des itérateurs (d'où <InlineCode>list(...)</InlineCode>). Une
        compréhension est en général plus lisible.
      </P>

      <SourceLink href="https://docs.python.org/3/tutorial/introduction.html#lists">
        docs.python.org — Lists (introduction)
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.python.org/3/tutorial/datastructures.html">
        docs.python.org — Data structures
      </SourceLink>
      {" · "}
      <SourceLink href="https://python-course.eu/advanced-python/lambda-filter-reduce-map.php">
        python-course.eu — lambda, filter, reduce, map
      </SourceLink>
    </div>
  );
}

export default function PyDataStructures() {
  return <Fr />;
}
