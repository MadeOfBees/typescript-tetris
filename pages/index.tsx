import Head from "next/head";
import Navbar from "./components/navbar";
import Modal from "./components/modal";
import Footer from "./components/footer";
import Game from "./components/game/game";

export default function Home(): JSX.Element {
  return (
    <>
      <Modal />
      <Head>
        <title>TSTetris</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <h1 className="text-6xl font-bold text-center">TSTetris</h1>
        <div className="flex justify-center">
          <Game />
        </div>
      </main>
      <Footer />
    </>
  );
}