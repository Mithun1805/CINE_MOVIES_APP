import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./forms/Axios";

export default function History() {

    const [history, setHistory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchHistory = async () => {
            try {
                const response = await api.get("/history/");
                setHistory(response.data);
            } catch (error) {
                console.error("History error:", error);
            }
        };

        fetchHistory();

    }, []);

    return (
        <div style={{ padding: "30px", color: "white" }}>

            <h1>Watch History</h1>

            {history.length === 0 ? (
                <p>No watch history yet.</p>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(180px, 1fr))",
                        gap: "25px",
                    }}
                >

                    {history.map((item) => (

                        <div
                            key={item.id}
                            onClick={() =>{
                                navigate(`/movie/${item.tmdb_id}`)}
                            }
                            style={{
                                cursor: "pointer",
                            }}
                        >

                            <img
                                src={
                                    item.poster_path
                                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                                        : ""
                                }
                                alt={item.title}
                                style={{
                                    width: "100%",
                                    borderRadius: "10px",
                                }}
                            />

                            <h3>{item.title}</h3>

                            <p>
                                Watched:{" "}
                                {new Date(
                                    item.watched_at
                                ).toLocaleString()}
                            </p>

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}