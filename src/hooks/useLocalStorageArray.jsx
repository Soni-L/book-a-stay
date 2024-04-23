import useLocalStorage from "use-local-storage";
import { v4 as uuidv4 } from "uuid";

const useLocalStorageArray = (key) => {
  const [items, setItems] = useLocalStorage(key, []);

  const addItem = (newItem) => {
    const newItemWithId = { ...newItem, id: uuidv4() };
    setItems([...items, newItemWithId]);
  };

  const getItemById = (id) => {
    return items.find((item) => item.id === id);
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems([...updatedItems]);
  };

  const updateItem = (updatedItem) => {
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      }
      return item;
    });
    setItems([...updatedItems]);
  };

  return {
    addItem,
    items,
    getItemById,
    deleteItem,
    updateItem,
  };
};

export default useLocalStorageArray;
