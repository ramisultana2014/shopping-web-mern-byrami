import styled from "styled-components";
import { useQueryClient } from "@tanstack/react-query";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import { HiPencil, HiTrash } from "react-icons/hi2";
import UploadProduct from "../../ui/UploadProduct";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteProduct } from "./useDeleteProduct";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../context/cartSlice";
import UpdateQuantity from "../../ui/UpdateQuantity";
const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  //height: 10rem;
  box-shadow: var(--shadow-md);
  align-items: center;
  //border: 2px solid red;
  position: relative;
`;
const ProductImg = styled.img`
  display: block;
  width: 30rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  transition: all 0.5s;
  //overflow: hidden;
  &:hover {
    transform: scale(1.1);
  }
`;
const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Out = styled.div`
  z-index: 100;
  background-color: var(--color-grey-0);
  /* background-color: red; */
  height: 100%;
  width: 100%;
  position: absolute;
  opacity: 0.5;
`;
const ButtonI = styled.button`
  background-color: var(--color-brand-200);
  display: block;
  //z-index: 999;
  border: none;
  padding: 1rem;
  border-radius: var(--border-radius-sm);
  ${(props) => (props.mar === "m-r" ? "margin-right:0.5rem;" : "")};
  transition: all 0.3s;
  margin-bottom: 2px;
  &:hover {
    background-color: ${(props) =>
      props.type === "red"
        ? "var(--color-red-700 )"
        : "var(--color-brand-100)"};
  }
`;
const DivAdmin = styled.div`
  position: absolute;
  top: 0;
  right: 1rem;
  z-index: 999;
`;
function ProductItem({ product }) {
  const queryClient = useQueryClient();
  const { deleteProduct, isLoading: isdeleteing } = useDeleteProduct();
  const dispatch = useDispatch();
  const user = queryClient.getQueryData(["user"]);
  //console.log(user.data.role);
  //console.log(product._id);
  const cart = useSelector((state) => state.cart.cart);
  const currenItem = cart?.find((el) => el.productId === product._id);
  const isSelected = currenItem?.orderQuantity > 0;
  function handleAddItm() {
    const item = {
      productId: product._id,
      price: product.price,
      title: product.title,
      image: product.image,
      orderQuantity: 1,
      totalPrice: 1 * product.price,
    };
    dispatch(addItem(item));
  }
  return (
    <DivContainer>
      {product.quantity <= 1 && <Out />}
      <ProductImg src={`img/${product.image}`} />
      <ProductDetails>
        {product.quantity <= 1 && <p>out of stock</p>}
        <p>title :{product.title}</p>
        <p>price :{product.price}$</p>
        <p>{product.description}</p>
        {isSelected ? (
          <UpdateQuantity product={product} />
        ) : (
          <ButtonI onClick={handleAddItm}>add to cart</ButtonI>
        )}
        {user?.data?.role === "admin" && (
          <DivAdmin>
            <Modal>
              <Menus.Menu>
                <Menus.Toggle id={product._id} />
                <Menus.List id={product._id}>
                  <Modal.Open nameToOpenWidow="update">
                    <ButtonI>
                      <HiPencil /> update product
                    </ButtonI>
                  </Modal.Open>
                  <Modal.Open nameToOpenWidow="delete">
                    {/* <Menus.Button icon={<HiTrash />}>
                      delete product
                    </Menus.Button> */}
                    <ButtonI type="red">
                      <HiTrash /> delete product
                    </ButtonI>
                  </Modal.Open>
                </Menus.List>
                <Modal.Window name="update">
                  <UploadProduct productToEdit={product} />
                </Modal.Window>
                <Modal.Window name="delete">
                  <ConfirmDelete
                    onConfirm={() => deleteProduct(product._id)}
                    resourceName={product.title}
                    isdeleteing={isdeleteing}
                  />
                </Modal.Window>
              </Menus.Menu>
            </Modal>
          </DivAdmin>
        )}
      </ProductDetails>
    </DivContainer>
  );
}

export default ProductItem;
// "data": {
//     "product": {
//         "_id": "661109b2f74bbf7efba28454",
//         "id": 1,
//         "title": "white bags",
//         "price": 200,
//         "image": "bags-1.jpg",
//         "description": "Your perfect bag for everyday use",
//         "quantity": 8,
//         "category": "bags",
//         "__v": 0
//     }
// {
//   productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
//   title: { type: String },
//   orderQuantity: { type: Number },
//   price: { type: Number },
//   totalPrice: { type: Number },
//   image: { type: String },
// },
