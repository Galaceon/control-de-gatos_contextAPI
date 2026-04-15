import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'

import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import "react-circular-progressbar/dist/styles.css"


export default function BudgetTracker() {

    const {state, expenseAmount, availableBudget} = useBudget()

    const percentage = +((expenseAmount / state.budget) * 100).toFixed(2)

    console.log(percentage)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <CircularProgressbar 
                    value={percentage}
                    background
                    backgroundPadding={6}
                    styles={buildStyles({

                        backgroundColor: percentage === 100 ? '#dc3939' : '#3b82f6',
                        textColor: '#E5F5F5',
                        pathColor: '#E5F5F5',
                        trailColor: "transparent",
                        strokeLinecap: "butt",
                        textSize: 16
                    })}
                    text={`${percentage}%`}
                />
            </div>

            <div className="flex flex-col justify-center items-center gap-8">
                <button
                    type="button"
                    className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
                >
                    Resetear App
                </button>

                <AmountDisplay 
                    label="Presupuesto"
                    amount={state.budget}
                />

                <AmountDisplay 
                    label="Disponible"
                    amount={availableBudget}
                />

                <AmountDisplay 
                    label="Gastado"
                    amount={expenseAmount}
                />
            </div>
        </div>
    )
}
