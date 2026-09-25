import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { TOOL_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={TOOL_ACCENT}>Python sous le capot — bytecode, interpréteur & ramasse-miettes</H2>

      <H3>Du source à l'exécution</H3>
      <P>
        CPython compile le source en <strong>bytecode</strong> (mis en cache
        dans <InlineCode>__pycache__</InlineCode>, fichiers{" "}
        <InlineCode>.pyc</InlineCode>), puis une <strong>machine virtuelle à
        pile</strong> l'exécute instruction par instruction.
      </P>

      <H3>Le module dis</H3>
      <P>
        <InlineCode>dis</InlineCode> désassemble une fonction et montre son
        bytecode. Le bytecode est un détail d'implémentation de CPython : aucune
        garantie de stabilité d'une version à l'autre.
      </P>
      <Code>{`import dis

def myfunc(alist):
    return len(alist)

dis.dis(myfunc)          # sortie Python 3.8
#   2           0 LOAD_GLOBAL              0 (len)
#               2 LOAD_FAST                0 (alist)
#               4 CALL_FUNCTION            1
#               6 RETURN_VALUE

for instr in dis.Bytecode(myfunc):
    print(instr.opname)  # LOAD_GLOBAL, LOAD_FAST, CALL_FUNCTION, RETURN_VALUE`}</Code>
      <P>
        Colonnes : numéro de ligne, marqueur d'instruction courante{" "}
        <InlineCode>--&gt;</InlineCode>, cible de saut <InlineCode>&gt;&gt;</InlineCode>,
        adresse (offset), nom de l'opcode, argument, interprétation entre
        parenthèses.
      </P>
      <Table
        head={["Opcode", "Effet sur la pile"]}
        rows={[
          ["LOAD_FAST", "Empile une variable locale"],
          ["LOAD_CONST", "Empile une constante"],
          ["LOAD_GLOBAL", "Empile une variable globale"],
          ["LOAD_ATTR", "Remplace le sommet par getattr(sommet, nom)"],
          ["STORE_FAST", "Dépile le sommet dans une variable locale"],
          ["BINARY_ADD", "Dépile deux valeurs, empile leur somme (BINARY_OP en 3.11+)"],
          ["CALL_FUNCTION", "Appelle un objet appelable avec argc arguments positionnels"],
          ["POP_JUMP_IF_FALSE", "Dépile le sommet ; si faux, saute à la cible"],
          ["POP_TOP", "Retire le sommet de la pile"],
          ["RETURN_VALUE", "Rend le sommet à l'appelant"],
        ]}
      />

      <H3>Un interpréteur Python écrit en Python (Byterun)</H3>
      <P>
        Le chapitre d'AOSA présente <strong>Byterun</strong>, une machine à
        pile qui exécute du bytecode. Quatre objets suffisent :
      </P>
      <Table
        head={["Objet", "Rôle"]}
        rows={[
          ["VirtualMachine", "Gère la pile d'appels (call stack) de frames, distribue chaque instruction à la méthode correspondante, garde valeur de retour et exceptions"],
          ["Frame", "Contexte d'exécution d'un morceau de code : objet code, espaces de noms local / global, pile de données, pile de blocs. Une frame par appel de fonction"],
          ["Function", "Enveloppe une fonction ; à l'appel, crée une frame, associe les arguments et exécute le code"],
          ["Block", "Gère boucles et exceptions : type de bloc, cible du gestionnaire, hauteur de pile"],
        ]}
      />
      <Ul>
        <li>
          <strong>Trois piles</strong> : pile de données (par frame), pile
          d'appels (une frame par portée), pile de blocs (par frame).
        </li>
        <li>
          Un objet code peut avoir plusieurs frames : une par appel de la
          fonction.
        </li>
        <li>
          <InlineCode>RETURN_VALUE</InlineCode> dépile la frame et pousse la
          valeur de retour sur la pile de données de la frame suivante.
        </li>
        <li>
          Les blocs utilisent un indicateur <InlineCode>why</InlineCode> (
          <InlineCode>None</InlineCode>, <InlineCode>continue</InlineCode>,{" "}
          <InlineCode>break</InlineCode>, <InlineCode>exception</InlineCode>,{" "}
          <InlineCode>return</InlineCode>) ; les boucles reviennent au début par{" "}
          <InlineCode>JUMP_ABSOLUTE</InlineCode>.
        </li>
        <li>
          Typage dynamique : le compilateur génère le même bytecode quel que
          soit le type des arguments ; <InlineCode>BINARY_MODULO</InlineCode>{" "}
          marche aussi bien sur des entiers que sur des chaînes, c'est le type
          à l'exécution qui décide.
        </li>
      </Ul>
      <Code>{`def cond():
    x = 3
    if x < 5:
        return "yes"
    else:
        return "no"

# LOAD_CONST, STORE_FAST, LOAD_FAST, LOAD_CONST, COMPARE_OP,
# POP_JUMP_IF_FALSE -> saute à la branche "no" si la comparaison est fausse`}</Code>

      <H3>Gestion mémoire : comptage de références et GC cyclique</H3>
      <Table
        head={["Mécanisme", "Rôle"]}
        rows={[
          ["Comptage de références", "Chaque objet compte ses références ; à 0, il est libéré immédiatement. Simple, mais incapable de détecter les cycles"],
          ["Ramasse-miettes cyclique (module gc)", "Détecte les cycles (a → b → a). Développé en 1999, livré depuis Python 2.0 ; CPython 1.x n'avait que le comptage"],
          ["Générations", "Le GC de CPython est générationnel : les objets jeunes sont examinés plus souvent que les anciens"],
        ]}
      />
      <Code>{`import sys, gc

a = []
sys.getrefcount(a)        # nombre de références (+1 pour l'argument de l'appel)
gc.collect()              # force une collecte des cycles
gc.get_threshold()        # seuils des générations
gc.garbage                # objets non collectables (anciennes versions, avec __del__)`}</Code>
      <P>
        À cause du comptage de références, <InlineCode>open("test.txt", "w").write("hello world")</InlineCode>{" "}
        ferme le fichier dès que son compteur tombe à 0. Ce comportement est
        propre à CPython : PyPy, Jython ou IronPython finalisent l'objet plus
        tard, à la collecte.
      </P>
      <Code>{`# Portable : fermeture explicite
fp = open("test.txt", "w")
fp.write("hello world")
fp.close()

# Mieux : gestionnaire de contexte (PEP 343)
with open("test.txt", "w") as fp:
    fp.write("hello world")`}</Code>
      <Note accent={TOOL_ACCENT}>
        Selon le papier de 2012 (Python 2.7), CPython ne gérait pas l'ordre des
        finaliseurs (<InlineCode>__del__</InlineCode>) dans un cycle : les objets
        allaient dans <InlineCode>gc.garbage</InlineCode>, alors que PyPy
        (GC « Minimark ») garantit un appel au plus une fois. Depuis Python 3.4
        (PEP 442), CPython collecte aussi ces cycles.
      </Note>
      <P>
        PyPy propose plusieurs GC au choix à la compilation (mark-and-sweep,
        semispace, générationnel, hybride, mark &amp; compact, Minimark),
        écrits en RPython.
      </P>

      <SourceLink href="https://docs.python.org/3.8/library/dis.html">
        docs.python.org — dis
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.python.org/3.4/library/dis.html">
        docs.python.org — dis (3.4)
      </SourceLink>
      {" · "}
      <SourceLink href="https://aosabook.org/en/500L/a-python-interpreter-written-in-python.html">
        AOSA — A Python interpreter written in Python
      </SourceLink>
      {" · "}
      <SourceLink href="https://thp.io/2012/python-gc/python_gc_final_2012-01-22.pdf">
        thp.io — Python garbage collector implementations (PDF)
      </SourceLink>
    </div>
  );
}

export default function PyInternals() {
  return <Fr />;
}
