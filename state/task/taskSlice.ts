import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

export const TasksFilters = {
  ALL: "ALL",
  COMPLETED: "COMPLETED",
  UNCOMPLETED: "UNCOMPLETED",
};

const initialState: TasksState = {
  tasks: [
    { id: "1", text: "First Task", completed: false },
    { id: "2", text: "Second Task", completed: true },
    { id: "3", text: "Third Task", completed: false },
  ],
  filterBy: TasksFilters.ALL,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const id = nanoid();
      // Mutating state here, but redux toolkit handles immutability under the hood.
      state.tasks.push({
        id,
        text: action.payload,
        completed: false,
      });
    },
    toggleCompletedTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    editTask: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.text = action.payload.text;
      }
    },
    removeTask: (state, action: PayloadAction<string>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        state.tasks.splice(index, 1);
      }
    },
    //filter tasks based on completed or uncompleted or all
    tasksFilter: (state, action: PayloadAction<string>) => {
      state.filterBy = action.payload;
    },
  },
});

export const {
  addTask,
  toggleCompletedTask,
  removeTask,
  editTask,
  tasksFilter,
} = taskSlice.actions;
export default taskSlice.reducer;

// import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

// interface Task {
//   id: string;
//   text: string;
//   completed: boolean;
// }
// interface TaskState {
//   tasks: Task[];
// }

// const initialState: TaskState = {
//   tasks: [
//     { id: "1", text: "First Task", completed: false },
//     { id: "2", text: "Second Task", completed: true },
//   ],
// };
// const taskSlice = createSlice({
//   name: "task",
//   initialState,
//   reducers: {
//     addTask: (state, action: PayloadAction<string>) => {
//       const id = nanoid();
//       // Mutating state here, but redux toolkit handles immutability under the hood.
//       state.tasks.push({
//         id,
//         text: action.payload,
//         completed: false,
//       });
//     },
//     // removeTask: (state, action: PayloadAction<string>) => {
//     //   state.tasks = state.tasks.filter((task) => task.id !== action.payload);
//     // },
//     // completeTask: (state, action: PayloadAction<string>) => {
//     //   const task = state.tasks.find((task) => task.id === action.payload);
//     //   if (task) {
//     //     task.completed = !task.completed;
//     //   }
//     // },
//   },
// });

// export const { addTask } = taskSlice.actions;
// export default taskSlice.reducer;
