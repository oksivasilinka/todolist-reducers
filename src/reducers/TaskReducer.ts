
import {TaskAssocType} from "../App";
import {v1} from "uuid";

type TaskReducerType = RemoveTaskACType | AddTaskACType | ChangeStatusACType | UpdateTaskACType
type RemoveTaskACType = ReturnType<typeof RemoveTaskAC>
type AddTaskACType = ReturnType<typeof AddTaskAC>
type ChangeStatusACType = ReturnType<typeof ChangeStatusAC>
type UpdateTaskACType = ReturnType<typeof UpdateTaskAC>

export const TaskReducer = (state: TaskAssocType, action: TaskReducerType): TaskAssocType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)}
        }
        case "ADD-TASK": {
            let newTask = {id: v1(), title: action.payload.title, isDone: false};
            return {...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        }
        case "CHANGE-STATUS": {
            return {...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId
                    ? {...el, isDone: action.payload.isDone}
                    : el)}

        }
        case "UPDATE-TASK": {
            return {...state,
                [action.payload.todolistTd]: state[action.payload.todolistTd].map(el => el.id === action.payload.taskId
                    ? {...el, title: action.payload.updateTitle}
                    : el)}
        }

        default:
            return state
    }
}

export const RemoveTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {todolistId, taskId}

    } as const
}

export const AddTaskAC = (todolistId: string, title: string) => {
    return{
        type: "ADD-TASK",
        payload: {todolistId, title}
    } as const
}

export const ChangeStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {
        type: "CHANGE-STATUS",
        payload: {todolistId, taskId, isDone}
    } as const
}

export const UpdateTaskAC = (todolistTd: string, taskId: string, updateTitle: string) => {
    return {
        type: "UPDATE-TASK",
        payload: {todolistTd, taskId, updateTitle}
    } as const
}