import { FC, useState } from "react"
import { ItemProps } from "../../components/item";
import ShoppingCart from "./shoppingCart";
import { Button } from "react-bootstrap"

interface HomeHeaderProps {
    search: string | undefined;
    setSearch: (value: string) => void;
    clearSearch: () => void
    items:ItemProps[] | undefined
    setItems:React.Dispatch<React.SetStateAction<ItemProps[] | undefined>>
    cartItems: ItemProps[] | undefined
    setCartItems:React.Dispatch<React.SetStateAction<ItemProps[] | undefined>>
}

const HomeHeader = ({cartItems, setCartItems,items, setItems, search, setSearch, clearSearch}:HomeHeaderProps) =>{
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)
    
    const handleSubmit = (e:React.FormEvent) =>{
        e.preventDefault()
        clearSearch()
    }
    
    return(
        <section>
            <form action="" onSubmit={handleSubmit}>
            <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} />
            <button>search</button>
            </form>
            <Button style={{backgroundColor: "white"}} onClick={openCart}>🛒</Button>
            <ShoppingCart cartItems={cartItems} setCartItems={setCartItems} isOpen={isOpen} openCart={openCart} closeCart={closeCart}/>
        </section>
    )
}

export default HomeHeader;