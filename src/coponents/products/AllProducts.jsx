import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";

const AllProducts = () => {
  const [productss, setProductss] = useState([]);

  const [categories, setCategories] = React.useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20);

  const dispatch = useDispatch();

  const addToCartHandler = async ({ id, price, title, image }) => {
    console.log(id, price, title, image);
    await dispatch(addToCart({ id, price, title, image, quantity: 1 }));
  };

  const handleChange = (event) => {
    setCategories(event.target.value);
  };

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products?limit=100"
        );
        if (!response.ok) {
          throw new Error("No Products Found");
        }
        const data = await response.json();
        setProductss(...productss, data.products);
      } catch (error) {
        console.log("error");
      }
    };
    fetchAllProducts();
  }, []);

  console.log(productss);

  const filteredProducts = categories
    ? productss.filter((product) => product.category === categories)
    : productss;

  console.log(filteredProducts);

  //   const indexOfLastProduct = currentPage * productsPerPage;
  //   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  //   const currentProducts = filteredProducts.slice(
  //     indexOfFirstProduct,
  //     indexOfLastProduct
  //   );

  //   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  //   const handlePageChange = (pageNumber) => {
  //     setCurrentPage(pageNumber);
  //   };

  return (
    <div>
      <div>
        <div className="dflex mt-6 w-[80%] md:w-[30%] m-auto">
          <Box sx={{ width: "100%" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Choose Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categories}
                label="Choose Category"
                onChange={handleChange}
              >
                {productss && productss.length > 0
                  ? productss.map((item) => (
                      <MenuItem value={item?.category}>
                        {item?.category}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
              {filteredProducts && filteredProducts.length > 0
                ? filteredProducts.map((product) => (
                    <a key={product?.id} className="group">
                      <div className="aspect-h-1 h-[300px] aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                        {product?.images && (
                          <img
                            src={product?.images[0]}
                            className="h-full w-full object-contain object-center group-hover:opacity-75"
                          />
                        )}
                      </div>
                      <div className="px-2 flex items-center justify-between">
                        <div>
                          <h3 className="mt-4 text-sm text-gray-700">
                            {product?.title}
                          </h3>
                          <p className="mt-1 text-lg font-medium text-gray-900">
                            {product?.price}
                          </p>
                        </div>
                        <Button
                          onClick={() =>
                            addToCartHandler({
                              id: product?.id,
                              price: product?.price,
                              title: product?.title,
                              image: product?.images[0],
                            })
                          }
                          variant="contained"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </a>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
