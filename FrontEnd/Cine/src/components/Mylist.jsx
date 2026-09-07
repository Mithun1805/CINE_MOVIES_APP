
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "./forms/Axios";

export default function MyList() {
    const [myList, setMyList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyList = async () => {
            try {
                const response = await api.get("/mylist/");

                console.log("My List:", response.data);

                setMyList(response.data);
            } catch (error) {
                console.error("MyList error:", error);
            }
        };

        fetchMyList();
    }, []);

    return (
        <div
            style={{
                padding: "30px",
                color: "white",
            }}
        >
            <h1>My List</h1>

            {myList.length === 0 ? (
                <p>No items in your list yet.</p>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(180px, 1fr))",
                        gap: "25px",
                    }}
                >
                    {myList.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => {
                                navigate(`/movie/${item.tmdb_id}`);
                            }}
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
                                Added:{" "}
                                {new Date(
                                    item.added_at
                                ).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

