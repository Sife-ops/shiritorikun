import "./index.css";
import ReactDOM from "react-dom/client";
import { Shiritori } from "@shiritorikun/graphql/genql";
import { createClient, Provider } from "urql";
import { useEffect, useState } from "react";
import { useTypedQuery } from "@shiritorikun/graphql/urql";

const urql = createClient({
  url: import.meta.env.VITE_API_URL + "/graphql",
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <Provider value={urql}>
    <App />
  </Provider>
  // </React.StrictMode>
);

const Av: React.FC<{ shiritori: Shiritori }> = (p) => {
  const [image, setImage] = useState<string>();

  useEffect(() => {
    const { guildIcon, guildId } = p.shiritori;
    fetch(`https://cdn.discordapp.com/icons/${guildId}/${guildIcon}.png`)
      .then((res) => res.blob())
      .then((blob) => URL.createObjectURL(blob))
      .then((img) => setImage(img));
  }, []);

  return (
    <div>
      {image && (
        <img
          style={{
            borderRadius: "50%",
            maxWidth: "72px",
            minWidth: "72px",
          }}
          src={image}
          alt="guild icon"
        />
      )}
    </div>
  );
};

function App() {
  const [rankingQ] = useTypedQuery({
    query: {
      ranking: {
        shiritoriId: true,
        guildId: true,
        guildName: true,
        guildIcon: true,
        length: true,
      },
    },
  });

  const [ranking, setRanking] = useState<Array<Shiritori>>();

  useEffect(() => {
    const { fetching, data } = rankingQ;
    if (!fetching && data) {
      setRanking(data.ranking as Shiritori[]);
    }
  }, [rankingQ]);

  return (
    <div>
      <div>しりとりくんランキング</div>
      <div>
        {ranking &&
          ranking.map((shiritori) => {
            return (
              <div key={shiritori.shiritoriId}>
                <Av shiritori={shiritori} />
                <div>ギルド名： {shiritori.guildName}</div>
                <div>しりとりの長さ： {shiritori.length}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
