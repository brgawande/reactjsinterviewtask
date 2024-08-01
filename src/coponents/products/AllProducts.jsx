import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

const products = [
  {
    id: 1,
    name: "Earthen Bottle",
    href: "#",
    price: "$48",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 2,
    name: "Nomad Tumbler",
    href: "#",
    price: "$35",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
  },
  {
    id: 3,
    name: "Focus Paper Refill",
    href: "#",
    price: "$89",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 4,
    name: "Machined Mechanical Pencil",
    href: "#",
    price: "$35",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
];

const AllProducts = () => {
  const [productss, setProductss] = useState([]);

  const [categories, setCategories] = React.useState("");

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
                <MenuItem value={"beauty"}>Beauty</MenuItem>
                <MenuItem value={"home-decoration"}>Home-Decoration</MenuItem>
                <MenuItem value={"kitchen-accessories"}>
                  kitchen-accessories
                </MenuItem>
                <MenuItem value={"mens-shoes"}>Mens-shoes</MenuItem>
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
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                        <img
                          src={product?.images}
                          className="h-full w-full object-cover object-center group-hover:opacity-75"
                        />
                      </div>
                      <div className="px-2 flex items-center justify-between">
                        <div>
                          <h3 className="mt-4 text-sm text-gray-700">
                            {product?.title}
                          </h3>
                          <p className="mt-1 text-lg font-medium text-gray-900">
                            {Math.floor(product?.price * 10)}
                          </p>
                        </div>
                        <Button variant="contained">Add to Cart</Button>
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
