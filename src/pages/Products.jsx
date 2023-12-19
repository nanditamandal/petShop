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
  
</div>

<div className="flex flex-wrap gap-3 justify-center">
    {
        loading && <Loader />
    }
</div>

<div className='flex flex-wrap gap-3 justify-center mt-5'>

    {
        items.length !== 0?
        (
          items?.map(item => <Card key={item._id} element={item} />)
        ):
        ("data not Found")
    }
</div>
<div>
    <div className='my-4'>
        <div className='flex justify-between'>
           
            <button onClick={prevPage} disabled={page == 1} className='btn btn-primary'>Previous</button>
                        <button onClick={nextPage} disabled={items.length < 3}className='btn btn-secondary' >Next</button>
        </div>

    </div>
</div>


</div>
    
        {/* console.log(item.description[0].children[0].text )          */}
  
    </>
  )
}

export default Products