import React, { FC, useEffect } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { getItemDetail } from "../../api/detail"
import { useRequest } from "ahooks"
import { notification, Spin } from "antd"

interface DetailPorps {}

const Detail: FC<DetailPorps> = () =>{
    const { id } = useParams()

    const { loading, data, run } = useRequest(getItemDetail, {
        manual: true,
        onError: (err: Error) => {
          notification.error({
            message: 'Detail Error',
            description: err.message,
          })
        }
    })

    console.log(data)

    useEffect(()=>{
        run(Number(id))
    },[])

    return(
        loading ? <Spin /> : (
            <div>
                <Link to={"/"}><button>⬅</button></Link>
                <h1>{data?.name}</h1>
                <p>{data?.price}</p>
                <p>{data?.description}</p>
            </div>
        )
    )
}

export default Detail;