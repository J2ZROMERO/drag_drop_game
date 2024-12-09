import { useState } from "react";
import GridLayout, { WidthProvider, Layout } from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "./App.css";
import "react-resizable/css/styles.css";

/**
 * Interface for items in the grid layout
 */
interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * Interface for items in the draggable menu
 */
interface MenuItem {
  id: number;
  url: string;
}

/**
 * Interface for items in the grid state
 */
interface GridItem {
  id: number;
  name: string;
  content: string;
  itemId?: number;
  url?: string;
  isOnGrid?: boolean;
}

/**
 * Game component implementing a drag-and-drop grid layout game.
 * @component
 * @returns {JSX.Element} The rendered Game component.
 */
const Game = (): JSX.Element => {
  // Wrap GridLayout with WidthProvider for responsive resizing
  const ResponsiveGridLayout = WidthProvider(GridLayout);

  // State to track the layout configuration of the grid
  const layout: LayoutItem[] = [
    { i: "1", x: 0, y: 0, w: 4, h: 2 },
    { i: "2", x: 4, y: 0, w: 4, h: 2 },
    { i: "3", x: 8, y: 0, w: 4, h: 2 },
    { i: "4", x: 0, y: 0, w: 4, h: 2 },
    { i: "5", x: 4, y: 2, w: 4, h: 2 },
    { i: "6", x: 8, y: 2, w: 4, h: 2 },
    { i: "7", x: 0, y: 2, w: 4, h: 2 },
    { i: "8", x: 4, y: 2, w: 4, h: 2 },
    { i: "9", x: 8, y: 4, w: 4, h: 2 },
  ];

  /**
   * State to track the items placed in the grid.
   * Each item includes metadata such as name, description, and content.
   */
  const [gridItems, setGridItems] = useState<GridItem[]>([
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

  /**
   * State to track the draggable menu items.
   * Each item includes metadata such as the image URL.
   */
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
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

  /**
   * Handle dropping an item into a grid cell.
   * @param {string} gridId - The ID of the grid cell.
   * @param {MenuItem} data - The data of the dropped item (from the menu).
   */
  const handleDrop = (gridId: string, data: MenuItem): void => {
    const element = document.getElementById(gridId);

    // Check if the grid cell already contains an image
    if (element) {
      const hasImage = element.querySelector("img") !== null;
      if (hasImage) {
        return;
      }
    }

    // Prepare the new data for the grid position
    const newDatatoGriposition = {
      url: data.url,
      isOnGrid: true,
      itemId: data.id,
    };

    // Update the grid items state
    setGridItems((prev) =>
      prev.map((item) =>
        item.id.toString() === gridId
          ? { ...item, ...newDatatoGriposition }
          : item
      )
    );

    // Remove the item from the menu
    setMenuItems((prev) => prev.filter((item) => item.id !== data.id));
  };

  /**
   * Handle returning an item from the grid to the menu.
   * @param {string} gridId - The ID of the grid cell.
   */
  const handleReturnToMenu = (gridId: string): void => {
    const currentGridContent = gridItems.find(
      (item) => item.id.toString() === gridId
    );

    if (!currentGridContent) return;

    const removeImageToGrid = {
      url: undefined,
      isOnGrid: undefined,
      itemId: undefined,
    };

    // Update the grid items state to remove the item
    setGridItems((prev) =>
      prev.map((item) =>
        item.id.toString() === gridId ? { ...item, ...removeImageToGrid } : item
      )
    );

    // Add the item back to the menu
    const currentMenuItem: MenuItem = {
      id: currentGridContent.itemId!,
      url: currentGridContent.url!,
    };
    setMenuItems((prev) => [...prev, currentMenuItem]);
  };

  /**
   * Render the content of a grid cell.
   * @param {string} id - The ID of the grid cell.
   * @returns {JSX.Element} The content of the grid cell.
   */
  const renderGridContent = (id: string): JSX.Element => {
    const filterElement = {
      ...gridItems.find((item) => item.id.toString() === id),
    };
    return !filterElement.url ? (
      <div className="grid-content">{filterElement.content}</div>
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

  /**
   * Validate the placement of all grid items.
   * Alerts if all items are correctly placed or if there are issues.
   */
  const validatePlacement = (): void => {
    const allCorrect = gridItems.every((cell) => +cell.itemId === cell.id);

    if (allCorrect) {
      alert("All items are correctly placed!");
    } else {
      alert("Some items are misplaced or missing!");
    }
  };

  return (
    <div className="game">
      <h1 className="title">Drag and Drop Game</h1>
      <button className="validate-button" onClick={validatePlacement}>
        Validate
      </button>
      <div className="menu-icons">
        {menuItems.map((item) => (
          <img
            className="menu-icon"
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

      <ResponsiveGridLayout
        className=""
        layout={layout}
        cols={12}
        width={1200}
        rowHeight={50}
        isDraggable={true}
        isResizable={true}
        margin={[40, 40]}
      >
        {layout.map((grid) => (
          <div
            className="grid-child"
            key={grid.i}
            id={grid.i}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const data = e.dataTransfer.getData("application/json");
              const parseData: MenuItem = JSON.parse(data);
              handleDrop(grid.i, parseData);
            }}
          >
            {renderGridContent(grid.i)}
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default Game;
