import { Code, InlineCode, P, H2, H3, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { TOOL_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={TOOL_ACCENT}>Python — classes, attributs, propriétés & représentation</H2>
      <P>
        Une <strong>classe</strong> est la description formelle de la façon
        dont un objet est conçu ; une <strong>instance</strong> est un objet
        précis créé à partir de ce modèle. La POO repose sur quatre principes :
      </P>
      <Table
        head={["Principe", "Idée"]}
        rows={[
          ["Encapsulation", "Regrouper les données et les méthodes qui les manipulent"],
          ["Abstraction", "Encapsulation + masquage des détails internes"],
          ["Polymorphisme", "Des objets différents répondent à la même interface"],
          ["Héritage", "Une classe reprend et étend une classe parente (section suivante)"],
        ]}
      />

      <H3>Classe, __init__ et self</H3>
      <Code>{`class Person:
    """Une personne."""

    def __init__(self, name):     # exécuté à la création de l'instance
        self.name = name          # attribut d'instance

    def say_hi(self):
        print("Bonjour, je suis", self.name)

p = Person("Swaroop")
p.say_hi()                        # équivaut à Person.say_hi(p)`}</Code>
      <P>
        <InlineCode>self</InlineCode> désigne l'objet lui-même (comme{" "}
        <InlineCode>this</InlineCode> en Java ou C++). Il est obligatoire comme
        premier paramètre de chaque méthode, mais Python le passe
        automatiquement à l'appel.
      </P>

      <H3>Attributs de classe et d'instance</H3>
      <Code>{`class Dog:
    kind = "canine"              # attribut de CLASSE : partagé

    def __init__(self, name):
        self.name = name         # attribut d'INSTANCE : propre à chaque objet

d, e = Dog("Fido"), Dog("Buddy")
d.kind, e.kind                   # ('canine', 'canine')
d.name, e.name                   # ('Fido', 'Buddy')

d.kind = "loup"                  # crée un attribut d'instance : la classe est inchangée
Dog.kind = "chien"               # modifie l'attribut de classe
d.__dict__                       # {'name': 'Fido', 'kind': 'loup'}
Dog.__dict__                     # espace de noms de la classe`}</Code>
      <Note accent={TOOL_ACCENT}>
        Assigner via l'instance ne modifie jamais l'attribut de classe : cela
        crée un attribut d'instance qui le masque. Une valeur mutable en
        attribut de classe (liste, dict) est <strong>partagée</strong> par
        toutes les instances.
      </Note>
      <Code>{`# MAUVAIS : tricks est partagée
class Dog:
    tricks = []
    def add_trick(self, trick):
        self.tricks.append(trick)

# BON : une liste par instance
class Dog:
    def __init__(self, name):
        self.name = name
        self.tricks = []

# Compteur d'instances : type(self) plutôt que le nom de la classe
class C:
    counter = 0
    def __init__(self):
        type(self).counter += 1`}</Code>

      <H3>Méthodes de classe et méthodes statiques</H3>
      <Table
        head={["Décorateur", "Premier paramètre", "Usage"]}
        rows={[
          ["(aucun)", "self (l'instance)", "Méthode d'instance"],
          ["@classmethod", "cls (la classe)", "Fabriques, comportement adapté à la sous-classe"],
          ["@staticmethod", "aucun", "Fonction utilitaire rangée dans la classe"],
        ]}
      />
      <Code>{`class Date:
    def __init__(self, y, m, d):
        self.y, self.m, self.d = y, m, d

    @classmethod
    def from_string(cls, s):         # fabrique : cls fonctionne aussi pour les sous-classes
        y, m, d = map(int, s.split("-"))
        return cls(y, m, d)

    @staticmethod
    def is_leap(year):
        return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)`}</Code>

      <H3>Visibilité : conventions et name mangling</H3>
      <Table
        head={["Forme", "Signification"]}
        rows={[
          ["name", "Public : librement accessible"],
          ["_name", "Protégé (convention) : à usage interne / sous-classes"],
          ["__name", "« Privé » : renommé en _Classe__name (name mangling), évite les collisions dans les sous-classes"],
        ]}
      />
      <P>
        Python n'impose rien : le name mangling décourage l'accès externe mais
        ne l'empêche pas.
      </P>

      <H3>Propriétés plutôt que getters / setters</H3>
      <P>
        La façon pythonique : rendre les attributs <strong>publics</strong>{" "}
        (<InlineCode>p1.x + p2.x</InlineCode>, pas <InlineCode>get_x()</InlineCode>).
        Si une validation devient nécessaire plus tard,{" "}
        <InlineCode>@property</InlineCode> l'ajoute sans changer l'interface.
      </P>
      <Code>{`class P:
    def __init__(self, x):
        self.x = x                    # passe par le setter

    @property
    def x(self):
        return self.__x

    @x.setter
    def x(self, x):
        self.__x = max(0, min(x, 1000))   # borne la valeur entre 0 et 1000

p1 = P(1001)
p1.x            # 1000
p1.x = -5       # p1.x vaut 0`}</Code>
      <P>
        Réserver les getters/setters explicites aux cas de validation complexe,
        de compatibilité d'API ou de setter à paramètres supplémentaires.
      </P>

      <H3>__str__ et __repr__</H3>
      <Table
        head={["Méthode", "Public visé", "Rôle"]}
        rows={[
          ["__str__", "Utilisateur final", "Texte lisible (str(), print())"],
          ["__repr__", "Développeur", "Idéalement du code qui recrée l'objet (repr(), débogueur, console)"],
        ]}
      />
      <Code>{`class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y
    def __repr__(self):
        return f"Point({self.x!r}, {self.y!r})"   # eval(repr(p)) recrée p
    def __str__(self):
        return f"({self.x}, {self.y})"

str(Point(1, 2))     # '(1, 2)'
repr(Point(1, 2))    # 'Point(1, 2)'

repr("Python")       # "'Python'"  (guillemets en plus, valide pour eval)
str("Python")        # 'Python'`}</Code>
      <Note accent={TOOL_ACCENT}>
        Si <InlineCode>__str__</InlineCode> est absente, Python utilise{" "}
        <InlineCode>__repr__</InlineCode> : définissez toujours{" "}
        <InlineCode>__repr__</InlineCode> en premier.
      </Note>
      <P>
        <InlineCode>__del__</InlineCode> (destructeur) existe mais s'utilise
        avec parcimonie : son moment d'appel n'est pas fiable.
      </P>

      <H3>Portée : global et nonlocal</H3>
      <Code>{`def scope_test():
    def do_local():
        spam = "local"              # variable locale, sans effet extérieur
    def do_nonlocal():
        nonlocal spam               # lie la variable de la fonction englobante
        spam = "nonlocal"
    def do_global():
        global spam                 # lie la variable du module
        spam = "global"

    spam = "test"
    do_local();    print(spam)      # test
    do_nonlocal(); print(spam)      # nonlocal
    do_global();   print(spam)      # nonlocal

scope_test()
print(spam)                          # global`}</Code>
      <P>
        Recherche d'un nom : local → fonctions englobantes → global →
        intégré (builtins).
      </P>

      <H3>Dataclass : structure de données</H3>
      <Code>{`from dataclasses import dataclass

@dataclass
class Employee:
    name: str
    dept: str
    salary: int

john = Employee("john", "labo", 1000)
john.salary        # 1000  (__init__, __repr__, __eq__ générés)`}</Code>

      <SourceLink href="https://docs.python.org/3/tutorial/classes.html">
        docs.python.org — Classes
      </SourceLink>
      {" · "}
      <SourceLink href="https://python.swaroopch.com/oop.html">
        Byte of Python — Object oriented programming
      </SourceLink>
      {" · "}
      <SourceLink href="https://python-course.eu/oop/object-oriented-programming.php">
        python-course.eu — Object-oriented programming
      </SourceLink>
      {" · "}
      <SourceLink href="https://python-course.eu/oop/class-instance-attributes.php">
        python-course.eu — Class and instance attributes
      </SourceLink>
      {" · "}
      <SourceLink href="https://python-course.eu/oop/properties-vs-getters-and-setters.php">
        python-course.eu — Properties vs getters and setters
      </SourceLink>
      {" · "}
      <SourceLink href="https://shipit.dev/posts/python-str-vs-repr.html">
        shipit.dev — str() vs repr()
      </SourceLink>
    </div>
  );
}

export default function PyClasses() {
  return <Fr />;
}
