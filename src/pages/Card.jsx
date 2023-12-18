import { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../context/MyContext";
import { useAuth0 } from "@auth0/auth0-react";


function Card({element}) {

  
//   console.log(element.item);
//   console.log(element.category.categoryName ) ;

  const {addToCart} =useContext(MyContext);

  // const {item, price, _id, image, description, category->{categoryName}, "imageUrl": image.asset->url} =props.element;
  return (
    <div>
    <div className="card w-96 bg-base-100 shadow-xl">
        <figure><img src={element.imageUrl} alt="Shoes" /></figure>
        <div className="card-body">
            <h2 className="card-title">
                {element.item}
                <div className="badge badge-secondary">{element.category.categoryName }</div>
            </h2>
            <div className="card-actions justify-end">
                <button  onClick={()=>addToCart(element)} className='btn btn-primary btn-sm'>Add To Cart</button>
                <Link to={`/productDetails/${element._id}`}>
                    <button className='btn btn-info btn-sm'>Details</button>
                </Link>
            </div>
        </div>
    </div>
</div>
  )
}

export default Card