import { createContext, useEffect, useState } from "react";
import { client } from "../lib/sanity";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";


export const MyContext = createContext();

export const DataProvider =({children}) =>{

    const {loginWithPopup, isAuthenticated, user, logout }=useAuth0();
    
    

    const [name, setName]=useState("nandita");
    const [items, setItems] =useState([]);

    const [loading, setLoading] =useState();
    const [categories, setCategories] =useState();

    const [cartList, setCartList] =useState([]);
    
    

    const [loginUser, setLoginUser] =useState();
    const [page, setPage] = useState(1)
    const [isLastPage, setLastPage] = useState(false)

    const itemsPerPage = 3

    const nextPage = () => {
        setPage(page + 1)
    }

    const prevPage = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }



    const getAllItems=async ()=>{

        setLoading(true);
        const rangeSelection = (page - 1) * itemsPerPage

        const query=`*[_type == "pet"]{item, price, _id, image, description, category->{categoryName}, "imageUrl": image.asset->url}
         [${rangeSelection}...${rangeSelection + itemsPerPage}]`
        const allitems= await client.fetch(query);
        setItems(allitems);
        setLoading(false);

    }
    const getAllCategories=async ()=>{


        const query=`*[_type == "category"]`
        const allCategories= await client.fetch(query);

        setCategories(allCategories);
    }

    const userSearch=(e)=>{
        const searchData = e.target.value
        console.log(e.target.value);
        productSearch(searchData)


    }
    const productSearch = async (productUserSearch) => {
        setLoading(true)
        const query = `*[_type == "pet" && item match "${productUserSearch}*" ] {item, price, _id, image, description, category->{categoryName}, "imageUrl": image.asset->url}`;
        const searchProduct = await client.fetch(query)
        setItems(searchProduct);
        setLoading(false)

    }
    const selectedCategory=(e)=>{
        const searchData = e.target.value;
        console.log(e.target.value);
        categorySearch(searchData);
    }
    
      const categorySearch = async (searchedCategory) => {
        setLoading(true);
        const query = `*[_type == "pet" ] {item, price, _id, image, description, category->{categoryName}, "imageUrl": image.asset->url}`;
        // const query = `*[_type == "pet" && category->categoryName match "${searchedCategory}" ]`;
        const searchProduct = await client.fetch(query);

        const filterProduct = searchProduct.filter(
            (product) => product.category.categoryName === `${searchedCategory}`
          );
      
        console.log(filterProduct);
        setItems(filterProduct);
        setLoading(false)
    
        // const filteredGames = searchedGames.filter(
        //   (game) => game.gameCategory.categoryName === `${searchedCategory}`
        // );
    
        // setAllGames(filteredGames);
        // setLoading(false);
      };



    const addToCart = (element) =>{
        // cardList

        if(isAuthenticated)
        {
            const existData = cartList.find((item)=> item._id === element._id);

            if(existData){
                const modifyData= {...existData, quantity: existData.quantity+1, totalPrice: existData.totalPrice+existData.price };
                const otherProducts= cartList.filter((item)=>item._id !== element._id);
                // setCartList([...cartList, element]);
                setCartList([...otherProducts, modifyData]);
                console.log(cartList);
    
            }
            else{
                setCartList([...cartList, {...element, quantity:1, totalPrice: element.price}]);
                console.log(cartList);
    
            }
            
     

        toast('successfully added!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        // console.log(cartList);

        }else{loginWithPopup();} 
    }

    const deleteItem=(product)=>{
        // const selectItem = cardList.find((item)=> item.id ===product.id);
        const selectItem = cartList.filter((item)=> item._id !== product._id);
        setCartList([...selectItem]);
        console.log("delete:", cartList);



    }
    const checkOut=()=>{
        toast('order placed successfully !', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });

    }
    
    useEffect(()=>{
        getAllItems();
        getAllCategories();
    }, [page])


    return<MyContext.Provider value={{name, setName, items, setItems, loading, categories, addToCart, cartList, setCartList, userSearch , loginUser, setLoginUser, deleteItem, checkOut, selectedCategory, prevPage, nextPage, page }}>
        {children}
    </MyContext.Provider>

}