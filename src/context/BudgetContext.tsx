import { useReducer, createContext, type ActionDispatch, type ReactNode, useMemo } from "react"
import { budgetReducer, initialState, type BudgetState, type BudgetActions } from "../reducers/budgetReducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch: ActionDispatch<[action: BudgetActions]>,
    expenseAmount: number,
    availableBudget: number
}

type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({children} : BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState) 


    const expenseAmount = useMemo(() => state!.expenses.reduce((total, expense) => {
        return total + expense.amount
    }, 0), [state.expenses])

    const availableBudget = state!.budget - expenseAmount

    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                expenseAmount,
                availableBudget
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}