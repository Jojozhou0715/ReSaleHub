import React, {useState}from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css"


export interface ItemProps {
    id?: number;
    name?: string;
    description?: string;
    like_count?: number;
    comment_count?: number;
    price?: number;
    is_sold_out?: boolean;
    shipping_fee?: string;
    image?: string;
    category_id?: number;
    handleAddToCart?: () => void;
}

const Item: React.FC<ItemProps> = ({id, name, is_sold_out, image, price, like_count, description, handleAddToCart}) => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/detail/${id}`)
    }


    return(
        <div className={styles.container}>
        <h1 onClick={handleClick}>{name}</h1>
        <p className={styles["mutiple-line-ellipsis"]}>{description}</p> 
        <span>${price}</span>
        <span className={styles["like-count"]}>💙{like_count}</span>
        <button onClick={() => { handleAddToCart && handleAddToCart(); console.log("Add to cart clicked."); }}>BUY</button>
        </div> 
    )
}

export default Item;