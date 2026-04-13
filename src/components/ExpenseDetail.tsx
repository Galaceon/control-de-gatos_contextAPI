import { useMemo } from "react"
import { formatDate } from "../helpers"
import type { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/cagories"
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from "react-swipeable-list"
import 'react-swipeable-list/dist/styles.css'
import { useBudget } from "../hooks/useBudget"


type ExpenseDetailProps = {
    expense: Expense
}

export default function ExpenseDetail({expense} : ExpenseDetailProps) {

    const {dispatch} = useBudget()

    const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], [expense])

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction 
                onClick={() => dispatch({type: 'remove-expense', payload: {id: expense.id}})}
            >
                Actualizar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction 
                onClick={() => {}}
                destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem 
                maxSwipe={1}
                leadingActions={leadingActions()} 
                trailingActions={trailingActions()}
            >
                <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center first-of-type:mt-5">
                    <div>
                        <img 
                            src={`/icono_${categoryInfo.icon}.svg`}
                            alt="icono del gasto"
                            className="w-18"
                        />
                    </div>

                    <div className="flex-1 space-y-2">
                        <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>
                        <p>{expense.expenseName}</p>
                        <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
                    </div>

                    <AmountDisplay
                        amount={expense.amount}
                    />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}
