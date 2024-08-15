import axios from "axios";
const getIndex = (tasks, type, id, container) => {
    if (type === "task")
      return tasks[container].findIndex((el, i) => el._id === id);
  };
  export const handleDragStart = (event, setAddTask, setActive, tasks) => {
    setAddTask(false)
    const { active } = event;
    const { id } = active;
    console.log("START")

    setActive(tasks[active.data.current.section].find((el) => el._id === id));
  };

  export const onHandleMove = (event, setData, setTasks,tasks, arrayMove) => {
    if (!event.over || !event.active) {
      setData(null);
      return;
    }
    const { active, over } = event;
    const activeData = active.data.current;
    const overData = over.data.current;

    const activeContainer = [...tasks[activeData.section]];
    const overContainer = [...tasks[overData.section]];

    if (!activeContainer || !overContainer) return;

    const activeIndex = getIndex(
        tasks,
      activeData.type,
      active.id,
      activeData.section
    );
    const overIndex = getIndex(tasks,overData.type, over.id, overData.section);

    if (
      activeData.type === "task" &&
      overData.type === "task" &&
      active.id !== over.id &&
      activeIndex !== -1 &&
      overIndex !== -1
    ) {
      if (activeData.section === overData.section) {
        //For sorting tasks in same container

        const updatedArray = arrayMove(activeContainer, activeIndex, overIndex);
        setTasks((prev) => ({
          ...prev,
          [activeData.section]: [...updatedArray],
        }));

        setData({
          section: overData.section,
          array: [...updatedArray],
        });
      } else if (activeData.section !== overData.section) {
        //For sorting tasks in different container
        console.log("Different container");

        const [removedItem] = activeContainer.splice(activeIndex, 1);
        removedItem.status = overData.section;
        overContainer.splice(overIndex, 0, removedItem);
          
        setTasks((prev) => ({
          ...prev,
          [activeData.section]: [...activeContainer],
          [overData.section]: [...overContainer],
        }));

        setData({
          section: overData.section,
          array: [...overContainer],
        });
      }
    }

    if (
      activeData.type === "task" &&
      overData.type === "container" &&
      active.id !== over.id &&
      overData.section !== activeData.section &&
      activeIndex !== -1
    ) {
      //For sorting task over another container
      console.log("Task in separate empty container")
      const [removedItem] = activeContainer.splice(activeIndex, 1);
      removedItem.status = overData.section;
      overContainer.push(removedItem);

      setTasks((prev) => ({
        ...prev,
        [activeData.section]: [...activeContainer],
        [overData.section]: [...overContainer],
      }));

      setData({
        section: overData.section,
        array: [...overContainer],
      });
    }
  };
 export const handleDragEnd = async (setActive, data) => {
setActive(null)
console.log(data)
    if (data) {
      try {
        await axios.patch(
          `${import.meta.env.VITE_URL}/api/tasks/updateOrder`,
          { data },
          { withCredentials: true }
        );
      } catch (err) {
        console.log(err);
      }
    }
  };