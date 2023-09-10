import { useEffect, useState } from "react"
import IDataList from "../Models/IDataList"
import { getDataFromServer } from "../Services/DataService"
import ExpenseTracker from "./ExpenseTracker"


     function ShowList() {

        const [items,setItems] = useState< IDataList[]>([])
        const [error,setError] = useState<Error | null>(null)
        const [sum, setSum] = useState<number | null>(0)
        const [rahulSpent, setrameshSpent] = useState<number | null>(0)
        const [rameshSpent, setrahulSpent] = useState<number | null>(0)
        const [showForm,setShowForm] = useState<boolean>(false)

        var rahulSpent1 = 0
        var rameshSpent1 = 0


    useEffect (() =>{

        const fetchData = async () =>{

            try {
                const data = await getDataFromServer()
                setItems(data)
                setSum(data.reduce((res: any, each: { price: any })  => res = res + each.price,0))
                shares(data)   
            }
            catch(error:any){

                setError(error)

            }
        }
        fetchData()

    } ,[])

    const shares = (data: IDataList[]) => {
        data.map(
            each => (
                each.payeeName === "Rahul" ? (
                    rahulSpent1 = rahulSpent1 + each.price
                )
            )
        )
        setrahulSpent(rahulSpent1)
        setrameshSpent(rameshSpent1)

    }

    return (
     <>
     <header id="page-Header">Expense Tracker</header>
     <button id="Add-Button" onClick={() =>  setShowForm(true)}>Add</button>
     {showForm &&(
        <div className="form">
            <ExpenseTracker onTrue={ success} onClose={ cancel }></ExpenseTracker>
            

        </div>
     )}

     <div className="use-inline date header-color">Date</div>
     <div className="use-inline header-color">Product Purchased</div>
     <div className="use-inline price header-color">price</div>
     <div className="use-inline  header-color">Payee</div>
     {

        items &&
        items.map(
            (user,ind) =>(
                <div>
                 
                 <div className="use-inline date">{user.setDate}</div>
                 <div className="use-inline">{user.Product}</div>
                 <div className="use-inline price">{user.price}</div>
                 <div className="use-inline">{user.payeeName}</div>
                 

                </div>
            )
        )
     }

     <div className="use-inline">Total Sum </div>
     <div className="use-inline total">{sum}</div><hr />
     <div className="use-inline">Ramesh Spent</div>
     <div className="use-inline total Ramesh">{rameshSpent} </div>
     <div className="use-inline">Rahul Spent  </div>
     <div className="use-inline total">{rahulSpent}</div><hr />
     <div className="use-inline payable">{ rahulSpent1 > rameshSpent1 ? "Pay Rahul " : "Pay Ramesh"}</div>
     <div className="use-inline payableprice">{Math.abs((rahulSpent1 - rameshSpent1)/2)}</div>
     

     {
        error && (
            <>
            {error?.message}
            </>
        )
     }

   </>


    )

   }

export default ShowList