import { Navbar, Dropdown, Text, Button} from "@nextui-org/react";
import { Layout } from "./Layout.js";


export default function Barra() {

  const MisPublicaciones = () => {
    window.location="/hacer_publicacion"
  };

  const AmigosPublicaciones = () => {
    window.location="/publicaciones"
  };


  return (
    <Layout>
      <Navbar isBordered variant="sticky">
        <Navbar.Toggle showIn="xs" />
        <Navbar.Brand
          css={{
            "@xs": {
              w: "12%",
            },
          }}
        >
          <Text b color="inherit" hideIn="xs">
            uLink
          </Text>
        </Navbar.Brand>
        <Navbar.Content
          enableCursorHighlight
          activeColor="primary"
          hideIn="xs"
          variant="highlight"
        >
          

          <Navbar.Link href="/agregar_amigos">Amigos</Navbar.Link>
          <Navbar.Link href="/solicitudes">Solicitudes</Navbar.Link>
          <Navbar.Link isActive href="/informacion">Informacion</Navbar.Link>
          <Navbar.Link href="/mensajes">Chat</Navbar.Link>
          <Navbar.Link href="/">Log Out</Navbar.Link>




          <Dropdown isBordered>
          <Navbar.Item>
            <Dropdown.Button
              auto
              light
              css={{
                px: 0,
                dflex: "center",
                svg: { pe: "none" },
              }}
              ripple={false}
            >
              Publicaciones
            </Dropdown.Button>
          </Navbar.Item>
          <Dropdown.Menu
            aria-label="Publicaciones"
            css={{
              $$dropdownMenuWidth: "340px",
              $$dropdownItemHeight: "70px",
              "& .nextui-dropdown-item": {
                py: "$4",
                // dropdown item left icon
                svg: {
                  color: "$secondary",
                  mr: "$4",
                },
                // dropdown item title
                "& .nextui-dropdown-item-content": {
                  w: "100%",
                  fontWeight: "$semibold",
                },
              },
            }}
          >
            <Dropdown.Item
              key="mispublicaciones"
              showFullDescription
              description="Hacer una publicacion"
            >
            <Button color="gradient" rounded bordered auto ghost onClick={MisPublicaciones}>
                Mis publicaciones
            </Button>
            </Dropdown.Item>
            <Dropdown.Item
              key="amigospublicaciones"
              showFullDescription
              description="Ver las publicaciones de mis amigos"
            >
            <Button color="gradient" rounded bordered auto ghost onClick={AmigosPublicaciones}>
              Publicaciones amigos
            </Button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>




        </Navbar.Content>
        <Navbar.Content
          css={{
            "@xs": {
              w: "12%",
              jc: "flex-end",
            },
          }}
        >
        </Navbar.Content>
      </Navbar>
    </Layout>
  );
}
