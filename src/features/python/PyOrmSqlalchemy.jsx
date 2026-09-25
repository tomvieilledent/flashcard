import { Code, InlineCode, P, H2, H3, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { TOOL_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={TOOL_ACCENT}>Python — ORM et tutoriel SQLAlchemy (session, requêtes, relations)</H2>

      <H3>Qu'est-ce qu'un ORM ?</H3>
      <P>
        Un <strong>ORM</strong> (Object-Relational Mapper) est une bibliothèque
        qui automatise le transfert des données des tables relationnelles vers
        des objets du code applicatif : on écrit du Python, pas du SQL.
      </P>
      <Code>{`users = Users.objects.filter(zip_code=94107)   # Django ORM, au lieu d'un SELECT à la main`}</Code>
      <Table
        head={["Avantages", "Inconvénients"]}
        rows={[
          ["Un seul langage, moins de bascules de contexte", "Décalage d'impédance : objets et tables ne s'alignent pas naturellement"],
          ["Code plus lisible, prototypage rapide", "SQL généré parfois non optimisé ; « facile à essayer, difficile à maîtriser »"],
          ["Portabilité théorique entre bases", "La logique passe des procédures de base vers le code applicatif"],
        ]}
      />
      <P>
        Principaux ORM Python : <strong>SQLAlchemy</strong> (bon équilibre
        entre niveaux d'abstraction), <strong>Django ORM</strong> (intégré à
        Django), Peewee (plus simple), Pony ORM, SQLObject. Un ORM couvre
        environ 80 à 90 % des besoins ; le reste peut demander du SQL direct.
      </P>

      <H3>Connexion et modèle déclaratif</H3>
      <Code>{`from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

engine = create_engine("sqlite:///:memory:", echo=True)   # echo=True : affiche le SQL généré
Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    fullname = Column(String)
    nickname = Column(String)

    def __repr__(self):
        return "<User(name='%s', fullname='%s', nickname='%s')>" % (
            self.name, self.fullname, self.nickname)

Base.metadata.create_all(engine)         # CREATE TABLE`}</Code>

      <H3>Session : ajouter, valider, annuler</H3>
      <Code>{`from sqlalchemy.orm import sessionmaker
Session = sessionmaker(bind=engine)
session = Session()

ed_user = User(name="ed", fullname="Ed Jones", nickname="edsnickname")
session.add(ed_user)
session.add_all([
    User(name="wendy", fullname="Wendy Williams", nickname="windy"),
    User(name="mary", fullname="Mary Contrary", nickname="mary")])

ed_user.nickname = "eddie"     # modification suivie par la session
session.commit()               # INSERT / UPDATE envoyés et validés

ed_user.name = "Edwardo"
session.rollback()             # annule les changements non validés`}</Code>

      <H3>Requêtes</H3>
      <Code>{`session.query(User).order_by(User.id).all()
session.query(User).filter_by(name="ed").first()
session.query(User).filter(User.name == "ed").one()          # exactement une (sinon exception)
session.query(User).filter(User.id == 99).one_or_none()
session.query(User.id).filter(User.name == "ed").scalar()
session.query(User).filter(User.name.like("%ed")).count()`}</Code>
      <Table
        head={["Opérateur", "Code"]}
        rows={[
          ["=, !=", "User.name == 'ed', User.name != 'ed'"],
          ["LIKE / ILIKE", "User.name.like('%ed%'), User.name.ilike('%ed%')"],
          ["IN / NOT IN", "User.name.in_(['ed', 'wendy']), ~User.name.in_([...])"],
          ["IS NULL / NOT NULL", "User.name == None, User.name != None"],
          ["AND / OR", "and_(a, b), or_(a, b)  (from sqlalchemy import and_, or_)"],
        ]}
      />
      <Code>{`from sqlalchemy import text
session.query(User).filter(text("id<:value and name=:name")).params(value=224, name="fred").one()`}</Code>

      <H3>Relations : ForeignKey et relationship</H3>
      <Code>{`from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class Address(Base):
    __tablename__ = "addresses"
    id = Column(Integer, primary_key=True)
    email_address = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="addresses")

User.addresses = relationship("Address", order_by=Address.id, back_populates="user")

jack = User(name="jack", fullname="Jack Bean", nickname="gjffdd")
jack.addresses = [Address(email_address="jack@google.com"),
                  Address(email_address="j25@yahoo.com")]
session.add(jack)
session.commit()
jack.addresses          # chargement paresseux (lazy) à la première lecture`}</Code>

      <H3>Jointures, alias, sous-requêtes, EXISTS</H3>
      <Code>{`session.query(User).join(Address).filter(Address.email_address == "jack@google.com").all()
session.query(User).join(User.addresses)              # jointure via la relation
session.query(User).outerjoin(User.addresses)         # LEFT OUTER JOIN

from sqlalchemy.orm import aliased
adalias1 = aliased(Address)                            # même table jointe deux fois

from sqlalchemy.sql import func, exists
stmt = session.query(Address.user_id, func.count("*").label("address_count")) \\
              .group_by(Address.user_id).subquery()
session.query(User, stmt.c.address_count).outerjoin(stmt, User.id == stmt.c.user_id)

session.query(User.name).filter(User.addresses.any())                       # EXISTS
session.query(User.name).filter(User.addresses.any(Address.email_address.like("%google%")))`}</Code>

      <H3>Chargement anticipé (eager loading)</H3>
      <Table
        head={["Stratégie", "Effet"]}
        rows={[
          ["selectinload", "Une seconde requête SELECT ... IN pour toutes les collections"],
          ["joinedload", "Une jointure LEFT OUTER JOIN dans la même requête"],
          ["contains_eager", "Utilise une jointure explicite que vous avez écrite"],
        ]}
      />
      <Code>{`from sqlalchemy.orm import selectinload
jack = session.query(User).options(selectinload(User.addresses)).filter_by(name="jack").one()`}</Code>
      <P>
        Évite le problème « N+1 » : une requête par objet parent lorsqu'on
        parcourt les relations.
      </P>

      <H3>Suppression et cascades</H3>
      <Code>{`session.delete(jack)

class User(Base):
    ...
    addresses = relationship("Address", back_populates="user",
                             cascade="all, delete, delete-orphan")   # supprime aussi les adresses`}</Code>
      <Note accent={TOOL_ACCENT}>
        Les exemples suivent le tutoriel SQLAlchemy 1.3 ;{" "}
        <InlineCode>declarative_base</InlineCode> se trouve dans{" "}
        <InlineCode>sqlalchemy.orm</InlineCode> dans les versions récentes, et
        la version 2.0 privilégie <InlineCode>select()</InlineCode> à{" "}
        <InlineCode>session.query()</InlineCode>.
      </Note>

      <SourceLink href="https://docs.sqlalchemy.org/en/13/orm/tutorial.html">
        SQLAlchemy 1.3 — Object Relational Tutorial
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.sqlalchemy.org/en/13/">
        docs.sqlalchemy.org — SQLAlchemy 1.3
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.fullstackpython.com/object-relational-mappers-orms.html">
        Full Stack Python — ORMs
      </SourceLink>
    </div>
  );
}

export default function PyOrmSqlalchemy() {
  return <Fr />;
}
