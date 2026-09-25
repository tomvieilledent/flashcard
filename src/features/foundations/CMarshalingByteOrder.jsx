import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { CI_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={CI_ACCENT}>C — marshaling et ordre des octets (endianness)</H2>

      <H3>L'ordre des octets</H3>
      <P>
        L'ordre dans lequel les octets d'un type multi-octets (
        <InlineCode>int</InlineCode>, <InlineCode>float</InlineCode>…) sont
        rangés en mémoire s'appelle le <strong>byte order</strong>.
      </P>
      <Table
        head={["Ordre", "Stockage", "Où"]}
        rows={[
          ["Big Endian", "L'octet de poids fort (MSB) en premier, à l'adresse la plus basse", "Ordre réseau ; anciennes architectures, certains RISC"],
          ["Little Endian", "L'octet de poids faible (LSB) en premier", "x86 / x86-64, ARM en mode usuel"],
        ]}
      />
      <Code>{`/* 0x12345678 en mémoire, adresses croissantes :
   Big Endian    : 12 34 56 78
   Little Endian : 78 56 34 12          */

#include <stdio.h>

int main(void)
{
	unsigned int n = 1;

	if (*(unsigned char *)&n == 1)
		printf("Little Endian\\n");
	else
		printf("Big Endian\\n");
	return (0);
}`}</Code>

      <H3>Pourquoi le marshaling ?</H3>
      <P>
        Quand des données transitent entre deux systèmes d'architectures
        différentes, rien ne garantit qu'ils interprètent les entiers de la
        même façon. Un <InlineCode>int</InlineCode> envoyé tel quel d'une machine
        Little Endian vers une machine Big Endian serait lu de travers. Le{" "}
        <strong>marshaling</strong> standardise le format d'envoi et de
        réception, pour que la donnée reste cohérente d'un système à l'autre.
      </P>

      <H3>Les fonctions de conversion</H3>
      <Table
        head={["Fonction", "Conversion"]}
        rows={[
          ["htonl()", "host to network long : entier 32 bits, ordre hôte → ordre réseau (Big Endian)"],
          ["ntohl()", "network to host long : ordre réseau → ordre hôte"],
          ["htons() / ntohs()", "Idem pour les entiers courts (16 bits)"],
        ]}
      />
      <Code>{`#include <stdio.h>
#include <stdint.h>
#include <arpa/inet.h>

int main(void)
{
	int number = 12345;

	/* Marshaling : ordre hôte -> ordre réseau (Big Endian) */
	uint32_t marshaled = htonl(number);

	/* 'marshaled' peut maintenant être transmis sur le réseau ; quelle que soit
	   l'architecture du destinataire, il l'interprète en ordre réseau. */

	/* À la réception */
	uint32_t received = marshaled;

	/* Unmarshaling : ordre réseau -> ordre hôte */
	uint32_t unmarshaled = ntohl(received);

	printf("Unmarshaled number: %u\\n", unmarshaled);
	return (0);
}`}</Code>
      <Ul>
        <li>Les en-têtes : <InlineCode>&lt;arpa/inet.h&gt;</InlineCode> (POSIX) pour les fonctions, <InlineCode>&lt;stdint.h&gt;</InlineCode> pour les types à largeur fixe.</li>
        <li>Utiliser des types de taille fixe (<InlineCode>uint32_t</InlineCode>) plutôt que <InlineCode>int</InlineCode>, dont la taille varie.</li>
      </Ul>
      <Note accent={CI_ACCENT}>
        Le marshaling garantit que des données échangées entre systèmes
        hétérogènes restent cohérentes ; les fonctions d'ordre des octets
        préservent l'intégrité des valeurs multi-octets.
      </Note>
      <P>
        Voir aussi la section « Marshaling et sérialisation » côté Python :
        le principe est le même, avec des formats de plus haut niveau (JSON,
        pickle).
      </P>
      <SourceLink href="https://man7.org/linux/man-pages/man3/byteorder.3.html">
        man byteorder — htonl, ntohl, htons, ntohs
      </SourceLink>
    </div>
  );
}

export default function CMarshalingByteOrder() {
  return <Fr />;
}
