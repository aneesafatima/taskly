const overContainer = event.over.data.current.section;
    const activeContainer = event.active.data.current.section;
    if(!activeContainer || !overContainer) return;
    const activeIndex = event.active.id.split("-")[1];
    const overIndex = event.over.id.split("-")[1];
    const overArray =
      overContainer === "todo"
        ? todo
        : overContainer === "progress"
        ? progress
        : completed;
    const activeArray =
      activeContainer === "todo"
        ? todo
        : activeContainer === "progress"
        ? progress
        : completed;
    console.log(overContainer);
    console.log(activeContainer);
    console.log(activeIndex);

    if(event.active.id !== event.over.id){
      if (event.over.data.current.type === "Container" && activeContainer !== overContainer) {
        console.log("Over Container");
        overArray.push(activeArray[activeIndex]);
        activeArray.splice(activeIndex, 1);
        console.log(overIndex);
        console.log(activeArray);
        setTasks((prev) => ({
          ...prev,
          [activeContainer]: activeArray,
          [overContainer]: overArray,
        }));
      } else if (event.over.data.current.type === "task") {
        if (activeContainer === overContainer) {
          console.log("Over TASK in same container");
          const updatedArray = arrayMove(activeArray, activeIndex, overIndex);
          setTasks((prev) => ({ ...prev, [activeContainer]: updatedArray }));
        }
        else if(activeContainer !== overContainer){
          overArray.splice(overIndex,0, activeArray[activeIndex]);
          activeArray.splice(activeIndex, 1);
          setTasks(prev => ({...prev, [activeContainer] : activeArray, [overContainer] : overArray}))
        }
      }
    }
