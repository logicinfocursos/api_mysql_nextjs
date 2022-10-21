import { useEffect, useState } from 'react'



export default function Home() {

  const [products, setProducts] = useState([])

  useEffect(() => {

    async function getPageData() {

      const response = await fetch("api/products")
      const res = await response.json()

      setProducts(res)
    }

    getPageData()

  }, [])

 
  if (!products) return <h3>lendo...</h3>

  return (
    <>
      <h1>lista de produtos</h1>
      {

        products && products.length > 0
          ?
          products.map((item, key) => {
            return <><h3 key={key}>{key+1 + " - " + item.name}</h3><p>{item.details}</p><br/></>
          })
          : <></>
      }
    </>
  )
}
