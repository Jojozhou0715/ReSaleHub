import React, { FC, useState, useEffect } from "react";
import { useRequest, useDebounce } from "ahooks";
import { getItems, getCategories } from "../../api/home";
import Item, { ItemProps } from "../../components/item";
import { notification, Spin, Radio } from 'antd';
import HomeHeader from "./home-header";
import styles from './index.module.css'

const RadioGroup = Radio.Group

interface HomeProps {}

const Home: FC<HomeProps> = () => {
    const [items, setItems] = useState<ItemProps[] | undefined>([])
    const [category, setCategory] = useState<string | undefined>(undefined)
    const [search, setSearch] = useState<string | undefined>(undefined)
    const [cartItems, setCartItems] = useState<ItemProps[] | undefined>(() => {
      const storedCartItems = localStorage.getItem('cartItems')
      return storedCartItems ? JSON.parse(storedCartItems) : []
    });
    
    const { loading: isCategoryLoading, data: categoriesData } = useRequest(
        getCategories,
        {
          manual: false,
          onError: (err: Error) => {
            notification.error({
              message: 'Category Error',
              description: err.message,
            });
          },
        }
      );
    
      const { loading: isItemsLoading, data: itemsData } = useRequest(
        getItems,
        {
          manual: false,
          onError: (err: Error) => {
            notification.error({
              message: 'Item Error',
              description: err.message,
            });
          },
        }
      );

      useEffect(()=>{
        // let filteredItems = itemsData?.data || []
        let filteredItems: ItemProps[] = itemsData?.data || [];

        if (category !== undefined){
          filteredItems = filteredItems.filter(item => {
            return String(item.category_id) === String(category)
          })
        }
        if (search !== undefined && search !== null && search !== ""){
          filteredItems = filteredItems.filter(item => {
            return item.name && item.name.toLowerCase().includes(search.toLowerCase())
          })
        }
        setItems(filteredItems)
      },[category, itemsData, search])

      // setItems(itemsData?.data)
        console.log(category)
        console.log(itemsData)
        console.log(categoriesData?.data)

        const clearSearch = () =>{
          setCategory(undefined)
          setSearch('')
        }

        const handleSelect = (value:string) =>{
          setCategory(value)
        }

        useEffect(()=>{
          localStorage.setItem('cartItems', JSON.stringify(cartItems))
        },[cartItems])

        const handleAddToCart = (id: number) => {
          if (!items) {
            return;
          }
          if (cartItems?.find(item => item.id === id)) {
            return;
          }
          const selectedItem = items?.find(item => item.id === id);
          if (selectedItem) {
            setCartItems(prevItems => [...(prevItems || []), selectedItem]);
          }

        };
        console.log(cartItems)
    
      return (
        isCategoryLoading || isItemsLoading ? (
          <Spin />
        ) : (
          <main className={styles.container}>
            <HomeHeader 
            clearSearch={clearSearch} 
            setSearch={setSearch} 
            search={search}
            items={items}
            setItems={setItems}
            cartItems={cartItems}
            setCartItems={setCartItems}/>      
            <div className="ant-design-overrides">
            <RadioGroup
              onChange={e => handleSelect(e.target.value)}
              className={styles.selector}
              value={category}
              // style={{ border: 'none', boxShadow: 'none' }}
              >
                {(categoriesData?.data || []).map(e => (
                  <Radio.Button 
                  key={e?.id} 
                  value={String(e?.id)} 
                  className={styles.radio} 
                  style={{boxShadow:'none', border: 'none', outline: 'none', height: '60%', color: "black"}}>
                    {e?.name}
                  </Radio.Button>
                ))}
              </RadioGroup>
              </div>
          <div className={styles.box}>
            {(items || []).map((e: ItemProps) => (
              <Item key={e.id} {...e} handleAddToCart={() => e.id && handleAddToCart(e.id)}
              />
            ))}
          </div>
          
          </main>
        )
      );
    };

export default Home;