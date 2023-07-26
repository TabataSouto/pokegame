import Head from "next/head";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Quem é esse Pokémon?</title>
        <link
          rel="shortcut icon"
          href="/images/pokebola.png"
        />
      </Head>
      <main>{children}</main>
    </>
  );
};

export default Layout;
