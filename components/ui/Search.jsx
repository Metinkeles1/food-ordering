import Image from "next/image";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import { AiFillCloseCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import axios from "axios";
import Input from "../form/Input";
import { useRouter } from "next/router";
import PacmanLoader from "react-spinners/PacmanLoader";

const Search = ({ setIsSearchModal }) => {
  const [foodProducts, setFoodProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noResult, setNoResult] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/products`
        );
        setFoodProducts(res.data);
        setFiltered(res.data.slice(0, 5));
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  const handleSearch = (e) => {
    const searchFilter = foodProducts
      .filter((product) =>
        product.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
      .slice(0, 5);
    setFiltered(searchFilter);
  };
  console.log(filtered);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen after:opacity-50 after:bg-white after:absolute after:top-0 after:left-0 grid place-content-center">
      <OutsideClickHandler onOutsideClick={() => setIsSearchModal(false)}>
        <div className='w-full h-full grid place-content-center'>
          <div className='relative z-50 md:w-[600px] w-[370px] bg-white border-2 p-10 rounded-3xl'>
            <Title addClass='text-[40px] text-center mb-2'>Search</Title>
            <Input placeholder='Search...' onChange={handleSearch} />
            {foodProducts.length > 0 ? (
              <ul className='mt-4'>
                {filtered.length > 0 ? (
                  filtered.map((product) => (
                    <li
                      key={product._id}
                      className='flex items-center justify-between p-1 px-2 cursor-pointer hover:bg-primary transition-all mt-2'
                      onClick={() => {
                        router.push(`/product/${product?._id}`);
                        setIsSearchModal(false);
                      }}
                    >
                      <div className='relative flex'>
                        <Image
                          src={product.img}
                          alt=''
                          width={48}
                          height={48}
                        />
                      </div>
                      <span className='fon-bold'>{product.title}</span>
                      <span className='font-bold'>${product.prices[0]}</span>
                    </li>
                  ))
                ) : (
                  <p className='text-center font-semibold mt-4'>
                    No Result Founds...
                  </p>
                )}
              </ul>
            ) : (
              <div className='flex justify-center mt-4'>
                <PacmanLoader color='#fca311' />
              </div>
            )}
            <button
              className='absolute top-4 right-4'
              onClick={() => setIsSearchModal(false)}
            >
              <AiFillCloseCircle
                size={25}
                className='hover:text-primary transition-all'
              />
            </button>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default Search;
