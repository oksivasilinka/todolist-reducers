import {FilterValuesType, TodolistsType} from "../App";


type TodolistsReducerType = RemoveTodolistsACType | ChangeFilterACType | AddTodolistACType | UpdateTodolistACType
type RemoveTodolistsACType = ReturnType<typeof RemoveTodolistsAC>
type ChangeFilterACType = ReturnType<typeof ChangeFilterAC>
type AddTodolistACType = ReturnType<typeof AddTodolistAC>
type UpdateTodolistACType = ReturnType<typeof UpdateTodolistAC>

export const TodolistsReducer = (state: TodolistsType[], action: TodolistsReducerType): TodolistsType[] => {
    switch (action.type) {
        case "REMOVE-TODOLISTS": {
            return state.filter(el => el.id !== action.payload.id)
        }
        case "CHANGE-FILTER": {
            return state.map((el => el.id === action.payload.id
                ? {...el, filter: action.payload.value}
                : el))
        }
        case "ADD-TODOLIST": {
            const newTodolist: TodolistsType = {
                id: action.payload.todolistId,
                title: action.payload.newTitle,
                filter: 'all'
            }
            return [newTodolist, ...state]
        }
        case "UPDATE-TODOLIST": {
            return state.map(el => el.id === action.payload.todolistTd
                ? {...el, title: action.payload.updateTitle}
            : el)
        }
        default:
            return state

    }
}


export const RemoveTodolistsAC = (id: string) => {
    return {
        type: "REMOVE-TODOLISTS",
        payload: {id}
    } as const
}

export const ChangeFilterAC = (id: string, value: FilterValuesType) => {
    return {
        type: "CHANGE-FILTER",
        payload: {id, value}
    } as const
}

export const AddTodolistAC = (newTitle: string, todolistId: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {newTitle, todolistId}
    } as const
}

export const UpdateTodolistAC = (todolistTd: string, updateTitle: string) => {
    return {
        type: "UPDATE-TODOLIST",
        payload: {todolistTd, updateTitle}
    } as const
}