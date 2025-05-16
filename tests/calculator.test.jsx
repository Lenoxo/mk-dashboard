import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";

const rows = [
    [ 7, 8, 9 ], 
    [ 4, 5, 6 ],
    [ 1, 2, 3 ],
    [ 0 ]
]

const Calculator = () => {
    return (
        <section>
            <h1>Calculator</h1>
        <div role="grid">
        {rows.map((row, index) => {
        return <div key={index} role="row">
            {row.map(num => {
                return <span key={num}>{num}</span>
            })}
        </div>
        })}
        </div>
        </section>
    )
}

describe('Calculator', () => {
    afterEach(cleanup)
    test('should render', () => {
        render(<Calculator />)
    })
    
    test('should show title', () => {
        render(<Calculator />)
        
        screen.getByText('Calculator')
    })
    
    
    test('should show numbers', () => {
        render(<Calculator />)
        const numbers = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

        
        numbers.forEach(number => { screen.getByText(number) }) })
    
    test('should have 4 rows for numbers', () => {
        render(<Calculator />)
        
        expect(screen.getAllByRole('row').length).toBe(4)
    })
    
})