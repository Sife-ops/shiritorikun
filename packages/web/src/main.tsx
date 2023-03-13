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

const Icon: React.FC<{ shiritori: Shiritori }> = (p) => {
  const [image, setImage] = useState<string>();

  useEffect(() => {
    const { guildIcon, guildId } = p.shiritori;
    fetch(`https://cdn.discordapp.com/icons/${guildId}/${guildIcon}.png`)
      .then((res) => res.blob())
      .then((blob) => URL.createObjectURL(blob))
      .then((img) => setImage(img));
  }, []);

  const size = "72px";
  const styleSize = {
    maxWidth: size,
    minWidth: size,
    maxHeight: size,
    minHeight: size,
  };

  return (
    <div style={styleSize}>
      {image && (
        <img
          style={{
            borderRadius: "50%",
            ...styleSize,
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            style={{
              maxWidth: "72px",
            }}
            src="/stk.svg"
          />
          <h1
            style={{
              marginTop: "0",
            }}
          >
            しりとりくんランキング
          </h1>
        </div>
      </div>
      <div>
        {ranking && (
          <table
            style={{
              width: "100%",
            }}
          >
            <tr>
              <th
                style={{
                  width: "10%",
                }}
              ></th>
              <th>ギルド名</th>
              <th>しりとりの長さ</th>
            </tr>
            {ranking.map((shiritori, i) => (
              <tr key={shiritori.shiritoriId}>
                <td
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  #{i + 1}
                  <Icon shiritori={shiritori} />
                </td>
                <td>{shiritori.guildName}</td>
                <td>{shiritori.length}</td>
              </tr>
            ))}
          </table>
        )}
      </div>
    </div>
  );
}
