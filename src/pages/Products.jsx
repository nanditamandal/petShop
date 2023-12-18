import { useContext } from "react"
import { MyContext } from "../context/MyContext"
import { urlFor } from "../lib/sanity";
import Card from "./Card";
import Loader from "../component/Loader";


function Products() {

    const {items, loading, categories, userSearch, selectedCategory, page, prevPage, nextPage} =useContext(MyContext);
    
    console.log(categories);
  
  return (
    <>
      <div className='container mx-auto'>

<div className='flex justify-center gap-4'>
    <input type="search" placeholder="Type here" onChange={userSearch} className="input input-bordered input-primary w-full max-w-xs" />

    <select className="select select-bordered  max-w-xs" onChange={selectedCategory}>
        <option disabled selected>Category</option>
        {
            categories?.map(category => <option key={category._id}>{category?.categoryName}</option>)
        }
    </select>
    {/* <select
            onChange={selectedCategory}
            className="select select-info w-full max-w-xs"
          >
            {categories.map((category) => (
              <option key={category._id}>{category.categoryName}</option>
            ))}
          </select> */}
</div>


<div className='flex flex-wrap gap-3 justify-center mt-5'>

    {
        loading && <Loader />
    }


    {
        items?.map(item => <Card key={item._id} element={item} />)
    }
</div>
<div>
    <div className='my-4'>
        <div className='flex justify-between'>
            {/* <button  className='btn btn-primary'>Previous</button>
            <button className='btn btn-secondary' >Next</button> */}
            <button onClick={prevPage} disabled={page == 1} className='btn btn-primary'>Previous</button>
                        <button onClick={nextPage} disabled={items.length >5}className='btn btn-secondary' >Next</button>
        </div>

    </div>
</div>


</div>
    
        {/* console.log(item.description[0].children[0].text )          */}
  
    </>
  )
}

export default Products