import React, { useEffect, useState } from "react";

const AuthorIcon = ({ name }) => {
  const [colorrender, setColorrender] = useState("");

  useEffect(() => {
    const uniqueSeed = Math.abs(
      name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    );

    // Generate an HSL color spread across the spectrum
    const hue = 100 + (uniqueSeed % 300);
    const color = `hsl(${hue}, 60%, 70%)`;
    setColorrender(color);
  }, [name]);

  const Iconstyle = {
    display: "inline-block",
    backgroundColor: colorrender,
    borderRadius: "10px",
    padding: "0.25rem",
    fontWeight: "bold",
    fontSize: "0.65rem",
    marginBottom: "10px"
  };

  return (
    <div style={Iconstyle}>
      {name.includes("- You")
        ? `${
            name.split("@")[0].charAt(0).toUpperCase() +
            name.split("@")[0].slice(1)
          } (You)`
        : name.split("@")[0].charAt(0).toUpperCase() +
          name.split("@")[0].slice(1)}{" "}
    </div>
  );
};

export default AuthorIcon;
