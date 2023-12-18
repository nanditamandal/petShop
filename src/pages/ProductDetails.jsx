import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { client } from "../lib/sanity"
import { MyContext } from "../context/MyContext";


function ProductDetails() {

  const {id} =useParams();
  const {addToCart} =useContext(MyContext);
  // const {handelCard} =useContext(MyContext);



  //   // console.log(productDetails);
  //   const {title, description, images, thumbnail}=productDetails;

    
    const [productDetails, setProductDetails]= useState({});

    const specificMovieDetails = async (selectedId) => {
      const query = `*[_type == "pet" && _id=="${selectedId}"]{item, price, _id, image, description, category->{categoryName}, "imageUrl": image.asset->url}`
      const data = await client.fetch(query)
      setProductDetails(data[0]);
  }

    useEffect(()=>{
      specificMovieDetails(id)
    },[id])


        // console.log(productDetails.description[0]?.children[0]?.text)
        
  return (
    <>
  
  
    <div className="card w-96 bg-base-100 shadow-xl">
    <figure><img src={productDetails.imageUrl} alt="Shoes" /></figure>
    <div className="card-body">
        <h2 className="card-title">
        {productDetails.item}
        <div className="badge badge-secondary">{productDetails.category?.categoryName}</div>
        </h2>
        <p>
        {
             productDetails.description?.map(des=> des.children?.map(c=>c.text) )
        
        
        }
        </p>

        <div className="card-actions justify-end">
                <button  onClick={()=>addToCart(productDetails)} className='btn btn-primary btn-sm'>Add To Cart</button>
                <Link to={`/`}>
                    <button className='btn btn-info btn-sm'>Home</button>
                </Link>
        </div>
    </div>
    </div>
    </>
    
  )
}

export default ProductDetails