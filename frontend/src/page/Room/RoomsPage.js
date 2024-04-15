import React, { useState } from "react";
import { Floor } from "./Floor.js";
import "./style.css"
export const RoomsPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const data = [
    {
      RoomName: "P101",
      RoomType: 3,
      Status: 0,
    },
    {
      RoomName: "P102",
      RoomType: 1,
      Status: 0,
    },
    {
      RoomName: "P103",
      RoomType: 1,
      Status: 1,
    },
    {
      RoomName: "P104",
      RoomType: 2,
      Status: 1,
    },
    {
      RoomName: "P105",
      RoomType: 3,
      Status: 0,
    },
    {
      RoomName: "P106",
      RoomType: 1,
      Status: 1,
    },
    {
      RoomName: "P107",
      RoomType: 1,
      Status: 1,
    },
    {
      RoomName: "P108",
      RoomType: 2,
      Status: 1,
    },
    {
      RoomName: "P109",
      RoomType: 2,
      Status: 1,
    },
    {
      RoomName: "P110",
      RoomType: 2,
      Status: 1,
    },
    {
      RoomName: "P111",
      RoomType: 1,
      Status: 0,
    },
    {
      RoomName: "P112",
      RoomType: 1,
      Status: 0,
    },
    {
      RoomName: "P113",
      RoomType: 2,
      Status: 0,
    },
    {
      RoomName: "P114",
      RoomType: 2,
      Status: 1,
    },
    {
      RoomName: "P115",
      RoomType: 2,
      Status: 0,
    },
    {
      RoomName: "P116",
      RoomType: 3,
      Status: 0,
    },
    {
      RoomName: "P117",
      RoomType: 3,
      Status: 0,
    },
    {
      RoomName: "P118",
      RoomType: 1,
      Status: 0,
    },
    {
      RoomName: "P119",
      RoomType: 1,
      Status: 1,
    },
    {
      RoomName: "P120",
      RoomType: 3,
      Status: 1,
    },
    {
      RoomName: "P121",
      RoomType: 2,
      Status: 1,
    },
    {
      RoomName: "P122",
      RoomType: 2,
      Status: 0,
    },
    {
      RoomName: "P123",
      RoomType: 3,
      Status: 0,
    },
    {
      RoomName: "P124",
      RoomType: 3,
      Status: 1,
    },
    {
      RoomName: "P125",
      RoomType: 2,
      Status: 1,
    },
    {
      RoomName: "P126",
      RoomType: 2,
      Status: 0,
    },
    {
      RoomName: "P127",
      RoomType: 2,
      Status: 1,
    },
    {
      RoomName: "P128",
      RoomType: 1,
      Status: 0,
    },
    {
      RoomName: "P129",
      RoomType: 1,
      Status: 1,
    },
    {
      RoomName: "P130",
      RoomType: 2,
      Status: 0,
    },
    {
      RoomName: "P131",
      RoomType: 1,
      Status: 0,
    },
    {
      RoomName: "P132",
      RoomType: 1,
      Status: 1,
    },
    {
      RoomName: "P133",
      RoomType: 3,
      Status: 1,
    },
    {
      RoomName: "P134",
      RoomType: 3,
      Status: 0,
    },
    {
      RoomName: "P135",
      RoomType: 1,
      Status: 0,
    },
    {
      RoomName: "P136",
      RoomType: 1,
      Status: 1,
    },
    {
      RoomName: "P137",
      RoomType: 2,
      Status: 1,
    },
    {
      RoomName: "P138",
      RoomType: 1,
      Status: 1,
    },
    {
      RoomName: "P139",
      RoomType: 2,
      Status: 1,
    },
    {
      RoomName: "P140",
      RoomType: 1,
      Status: 1,
    },
    {
      RoomName: "P141",
      RoomType: 3,
      Status: 1,
    },
    {
      RoomName: "P142",
      RoomType: 1,
      Status: 0,
    },
    {
      RoomName: "P143",
      RoomType: 3,
      Status: 0,
    },
    {
      RoomName: "P144",
      RoomType: 3,
      Status: 1,
    },
    {
      RoomName: "P145",
      RoomType: 2,
      Status: 0,
    },
    {
      RoomName: "P146",
      RoomType: 1,
      Status: 0,
    },
    {
      RoomName: "P147",
      RoomType: 2,
      Status: 0,
    },
    {
      RoomName: "P148",
      RoomType: 3,
      Status: 1,
    },
    {
      RoomName: "P149",
      RoomType: 2,
      Status: 0,
    },
    {
      RoomName: "P150",
      RoomType: 3,
      Status: 1,
    },
    {
      RoomName: "P151",
      RoomType: 1,
      Status: 0,
    },
    {
      RoomName: "P152",
      RoomType: 3,
      Status: 1,
    },
    {
      RoomName: "P153",
      RoomType: 3,
      Status: 1,
    },
    {
      RoomName: "P154",
      RoomType: 1,
      Status: 1,
    },
    {
      RoomName: "P155",
      RoomType: 2,
      Status: 0,
    },
    {
      RoomName: "P156",
      RoomType: 2,
      Status: 0,
    },
    {
      RoomName: "P157",
      RoomType: 3,
      Status: 0,
    },
    {
      RoomName: "P158",
      RoomType: 3,
      Status: 1,
    },
    {
      RoomName: "P159",
      RoomType: 3,
      Status: 0,
    },  
  ];
  return (
    <div className={`fade-in ${isVisible ? "visible" : ""}`} style={{display:"flex",flexWrap:"wrap"}}>
      <Floor data={data} />
      <Floor data={data} />
      <Floor data={data} />
    </div>
  );
};
