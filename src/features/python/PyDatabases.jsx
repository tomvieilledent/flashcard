import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { TOOL_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={TOOL_ACCENT}>Python & MySQL — mysqlclient et SQLAlchemy</H2>

      <H3>mysqlclient (MySQLdb)</H3>
      <P>
        <InlineCode>mysqlclient</InlineCode> est un connecteur Python pour
        MySQL / MariaDB : un fork de MySQLdb1 qui ajoute la prise en charge de
        Python 3 et corrige de nombreux bogues.
      </P>
      <Code>{`# Prérequis de compilation
sudo apt install python3-dev default-libmysqlclient-dev build-essential pkg-config   # Debian / Ubuntu
# Red Hat / CentOS : python3-devel mysql-devel pkgconfig
# macOS (Homebrew) : brew install mysql pkg-config

pip install mysqlclient`}</Code>
      <Code>{`import MySQLdb

db = MySQLdb.connect(host="localhost", user="app", passwd="motdepasse", db="ma_base")
cur = db.cursor()
cur.execute("SELECT * FROM states WHERE name = %s", ("California",))   # paramètres, jamais de concaténation
for row in cur.fetchall():
    print(row)
cur.close()
db.close()`}</Code>
      <Note accent={TOOL_ACCENT}>
        Toujours passer les valeurs en <strong>paramètres</strong> (
        <InlineCode>%s</InlineCode> + tuple) : le pilote échappe la valeur, ce
        qui empêche l'injection SQL.
      </Note>

      <H3>SQLAlchemy : Core et ORM</H3>
      <P>
        SQLAlchemy abstrait la génération du SQL. <strong>Core</strong> :
        tables, expressions, connexions. <strong>ORM</strong> : des classes
        Python mappées sur des tables, manipulées via une session.
      </P>
      <Code>{`from sqlalchemy import create_engine

engine = create_engine("sqlite:///:memory:")                       # SQLite
engine = create_engine("postgresql://user:pass@localhost/dbname")
engine = create_engine("mysql+mysqldb://user:pass@localhost/dbname")   # mysqlclient
engine = create_engine("mysql+pymysql://user:pass@localhost/dbname")   # PyMySQL`}</Code>
      <Table
        head={["Élément", "Rôle"]}
        rows={[
          ["Engine", "Gère le pool de connexions et le dialecte SQL"],
          ["Session", "Unité de travail : regroupe les changements avant le commit"],
          ["Base déclarative", "Classe mère de tous les modèles mappés"],
          ["Metadata", "Catalogue des tables ; create_all(engine) les crée"],
        ]}
      />

      <H3>Core : SQL brut et tables</H3>
      <Code>{`from sqlalchemy import text, MetaData, Table, Column, Integer, String, select, insert, update, delete

with engine.begin() as conn:                 # commit automatique en fin de bloc
    conn.execute(text("INSERT INTO test VALUES (:id, :name)"), {"id": 1, "name": "Alice"})

metadata = MetaData()
users = Table("users", metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String(50)),
    Column("email", String(100)))
metadata.create_all(engine)

with engine.begin() as conn:
    conn.execute(insert(users).values(name="Alice"))
    conn.execute(insert(users), [{"name": "Bob"}, {"name": "Carol"}])   # insertion multiple
    conn.execute(update(users).where(users.c.name == "Alice").values(name="Alicia"))
    conn.execute(delete(users).where(users.c.name == "Bob"))

with engine.connect() as conn:
    rows = conn.execute(select(users).where(users.c.id > 1)).fetchall()`}</Code>

      <H3>ORM : modèles et session</H3>
      <Code>{`from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import declarative_base, relationship, sessionmaker

Base = declarative_base()

class Movie(Base):
    __tablename__ = "movies"
    id = Column(Integer, primary_key=True)
    title = Column(String(100))
    release_date = Column(Date)
    actors = relationship("Actor", secondary="movies_actors")   # plusieurs-à-plusieurs

Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
session = Session()

session.add(Movie(title="Skyfall"))          # constructeur fourni par défaut
session.commit()

session.query(Movie).all()
session.query(Movie).filter(Movie.title == "Skyfall").first()
session.query(Movie).join(Actor).filter(Actor.name == "Dwayne")
session.query(Movie).count()
session.close()`}</Code>
      <Table
        head={["Relation", "Mise en place"]}
        rows={[
          ["Un-à-plusieurs / plusieurs-à-un", "Clé étrangère + relationship(..., backref=...)"],
          ["Un-à-un", "relationship(..., backref=backref('x', uselist=False))"],
          ["Plusieurs-à-plusieurs", "Table d'association + relationship(secondary=table)"],
        ]}
      />

      <H3>10 pièges classiques de SQLAlchemy</H3>
      <Ul>
        <li>Suivre la documentation officielle : de nombreux tutoriels sont périmés ou faux.</li>
        <li>Inutile d'écrire des constructeurs : la déclarative en fournit un (<InlineCode>Company(name="Foo")</InlineCode>).</li>
        <li>Modifier une classe ne modifie <strong>pas</strong> la table existante : utiliser une migration (Alembic) ou du SQL manuel.</li>
        <li>Importer tous les modules de modèles avant <InlineCode>metadata.create_all()</InlineCode>, sinon les tables sont ignorées.</li>
        <li><InlineCode>.one()</InlineCode> : exactement une ligne (sinon exception) ; <InlineCode>.first()</InlineCode> : la première ou <InlineCode>None</InlineCode> ; <InlineCode>.scalar()</InlineCode> : la première colonne ou <InlineCode>None</InlineCode>.</li>
        <li><InlineCode>sessionmaker</InlineCode> est une fabrique de sessions ; <InlineCode>scoped_session</InlineCode> gère des sessions par thread.</li>
        <li>Pour sélectionner des colonnes ou des agrégats, passer par la session : <InlineCode>session.query(Company.address)</InlineCode>.</li>
        <li>Une relation n'a pas d'attribut de colonne : utiliser un alias (<InlineCode>aliased(Category)</InlineCode>).</li>
        <li>Inutile de committer pour obtenir un identifiant : ajouter parent et enfant, la cascade gère les ID.</li>
        <li>Tester avec la base de production (pas seulement SQLite) pour détecter les incompatibilités.</li>
      </Ul>

      <SourceLink href="https://github.com/PyMySQL/mysqlclient">
        github.com/PyMySQL/mysqlclient
      </SourceLink>
      {" · "}
      <SourceLink href="https://mysqlclient.readthedocs.io/">
        mysqlclient.readthedocs.io
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.mikusa.com/python-mysql-docs/index.html">
        Python MySQL docs (MySQLdb)
      </SourceLink>
      {" · "}
      <SourceLink href="https://overiq.com/sqlalchemy-101/">
        OverIQ — SQLAlchemy 101
      </SourceLink>
      {" · "}
      <SourceLink href="https://auth0.com/blog/sqlalchemy-orm-tutorial-for-python-developers/">
        Auth0 — SQLAlchemy ORM tutorial
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.pythonsheets.com/notes/database/python-sqlalchemy.html">
        pythonsheets — SQLAlchemy
      </SourceLink>
      {" · "}
      <SourceLink href="https://alextechrants.blogspot.com/2013/11/10-common-stumbling-blocks-for.html">
        10 common stumbling blocks (SQLAlchemy)
      </SourceLink>
    </div>
  );
}

export default function PyDatabases() {
  return <Fr />;
}
