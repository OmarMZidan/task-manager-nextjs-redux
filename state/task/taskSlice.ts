import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

const initialState: Task[] = [
  { id: "1", text: "First Task", completed: false },
];

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const id = nanoid();
      // Mutating state here, but redux toolkit handles immutability under the hood.
      state.push({
        id,
        text: action.payload,
        completed: false,
      });
    },
    // removeTask: (state, action: PayloadAction<string>) => {
    //   state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    // },
    // completeTask: (state, action: PayloadAction<string>) => {
    //   const task = state.tasks.find((task) => task.id === action.payload);
    //   if (task) {
    //     task.completed = !task.completed;
    //   }
    // },
  },
});

export const { addTask } = taskSlice.actions;
export default taskSlice.reducer;
