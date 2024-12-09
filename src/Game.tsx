import React, { useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "./App.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const Game = () => {
  // Initial Layout for the grid
  const [layout, setLayout] = useState([
    { i: "1", x: 0, y: 0, w: 4, h: 2 },
    { i: "2", x: 2, y: 0, w: 4, h: 2 },
    { i: "3", x: 4, y: 0, w: 4, h: 2 },
    { i: "4", x: 6, y: 0, w: 4, h: 2 },
    { i: "5", x: 0, y: 2, w: 4, h: 2 },
    { i: "6", x: 2, y: 2, w: 4, h: 2 },
    { i: "7", x: 4, y: 2, w: 4, h: 2 },
    { i: "8", x: 6, y: 2, w: 4, h: 2 },
    { i: "9", x: 0, y: 4, w: 4, h: 2 },
  ]);

  // State to track dropped items in the grid
  const [gridItems, setGridItems] = useState([
    {
      id: 1,
      name: "Angular",
      content: "A popular framework for building dynamic web applications.",
    },
    {
      id: 2,
      name: "AWS",
      content:
        "A cloud platform offering a variety of services for development and hosting.",
    },
    {
      id: 3,
      name: "Bootstrap",
      content: "A popular CSS framework for building responsive web designs.",
    },
    {
      id: 4,
      name: "Docker",
      content:
        "A platform for developing, shipping, and running applications in containers.",
    },
    {
      id: 5,
      name: "Java",
      content:
        "A versatile programming language used for web, desktop, and mobile applications.",
    },
    {
      id: 6,
      name: "JavaScript",
      content:
        "A core programming language for building interactive web pages.",
    },
    {
      id: 7,
      name: "Python",
      content:
        "A programming language known for its simplicity and versatility in data science and web development.",
    },
    {
      id: 8,
      name: "React",
      content:
        "A JavaScript library for building user interfaces with reusable components.",
    },
    {
      id: 9,
      name: "Vite",
      content:
        "A modern build tool for faster development with a lean development server.",
    },
  ]);

  // State to track menu items
  const [menuItems, setMenuItems] = useState([
    { id: 6, url: "/src/assets/js.png" },
    { id: 7, url: "/src/assets/python.png" },
    { id: 8, url: "/src/assets/react.png" },
    { id: 9, url: "/src/assets/vite.png" },
    { id: 1, url: "/src/assets/angular.png" },
    { id: 2, url: "/src/assets/aw.png" },
    { id: 3, url: "/src/assets/bootstrap.png" },
    { id: 4, url: "/src/assets/docker.png" },
    { id: 5, url: "/src/assets/java.png" },
  ]);
  // Handle dropping an item
  const handleDrop = (gridId, data) => {
    const newDatatoGriposition = {
      url: data.url,
      isOnGrid: true,
      itemId: data.id,
    };

    // Add the dropped item to the grid and remove it from the menu

    setGridItems((prev) =>
      prev.map((item) =>
        item.id == gridId ? { ...item, ...newDatatoGriposition } : item
      )
    ); // Remove from grid

    setMenuItems((prev) => prev.filter((item) => item.id !== data.id)); // Remove from menu
  };

  // Handle returning an item to the menu
  const handleReturnToMenu = (gridId) => {
    const currentGridContent = gridItems.find((item) => item.id == gridId);

    const headerMenu = menuItems.find(
      (item) => item.id == currentGridContent.itemId
    );

    const removeImageToGrid = { url: null, isOnGrid: null, itemId: null };

    setGridItems((prev) =>
      prev.map((item) =>
        item.id == gridId ? { ...item, ...removeImageToGrid } : item
      )
    );

    const currentMenuItem = {
      id: currentGridContent.itemId,
      url: currentGridContent.url,
    };

    setMenuItems((prev) => [...prev, currentMenuItem]);
  };
  console.log("Menu Items:", gridItems);

  // Render the grid item content
  const renderGridContent = (id) => {
    const filterElement = {
      ...gridItems.find((item) => item.id == id),
    };

    return !filterElement.url ? (
      <div className="grid-content">
        <div className="">{filterElement.content}</div>
      </div>
    ) : (
      <>
        <img
          src={filterElement.url}
          alt=""
          width={50}
          height={50}
          key={filterElement.id}
        />
        {filterElement.isOnGrid && (
          <button
            onClick={() => handleReturnToMenu(id)}
            style={{
              marginTop: "10px",
              padding: "5px 10px",
              backgroundColor: "#e74c3c",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Return
          </button>
        )}
      </>
    );
  };
  const onLayoutChange = (newLayout) => {
    console.log("Layout changed:", newLayout);
    setLayout(newLayout); // Actualiza el estado con el nuevo layout
  };

  const validatePlacement = () => {
    const allCorrect = gridItems.every((cell) => {
      return +cell.itemId === +cell.id; // Comparación estricta
    });

    if (allCorrect) {
      alert("All items are correctly placed!");
    } else {
      alert("Some items are misplaced or missing!");
    }
  };

  return (
    <div className="game">
      {/* Menu with draggable elements */}
      <h1 className="title">Drag and Drop Game</h1>
      <div className="menu-icons">
        {menuItems.map((item) => (
          <img
            src={item.url}
            alt=""
            width={50}
            height={50}
            key={item.id}
            draggable
            onDragStart={(e) =>
              e.dataTransfer.setData("application/json", JSON.stringify(item))
            }
          />
        ))}
      </div>

      {/* Draggable Grid */}
      <GridLayout
        className=""
        layout={layout}
        cols={12} // Total de columnas en el grid
        rowHeight={50} // Altura de cada fila en px
        width={1200} // Ancho total del grid
        isDraggable={true} // Permite arrastrar elementos
        isResizable={true} // Permite redimensionar elementos
        margin={[10, 10]} // Margen entre elementos
        onLayoutChange={onLayoutChange} // Callback para cambios en el layout
      >
        {layout.map((grid) => (
          <div
            className="grid-child"
            key={grid.i}
            onDragOver={(e) => e.preventDefault()} // Allow dropping
            onDrop={(e) => {
              e.preventDefault();
              const data = e.dataTransfer.getData("application/json");
              const parseData = JSON.parse(data);
              handleDrop(grid.i, parseData); // Handle the drop
            }}
          >
            {renderGridContent(grid.i)}
          </div>
        ))}
      </GridLayout>

      {/* Validate Button */}
      <button className="validate-button" onClick={validatePlacement}>
        Validate
      </button>
    </div>
  );
};

export default Game;
