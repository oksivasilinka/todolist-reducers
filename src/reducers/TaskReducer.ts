
import {TaskAssocType} from "../App";

type TaskReducerType = RemoveTaskACType
type RemoveTaskACType = ReturnType<typeof RemoveTaskAC>

export const TaskReducer = (state: TaskAssocType, action: TaskReducerType): TaskAssocType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)}
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